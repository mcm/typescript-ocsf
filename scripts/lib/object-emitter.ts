import { toClassName, toFileName } from "./naming.js";
import { mapOcsfTypeToTs, mapOcsfTypeToZod, mapOcsfTypeToZodTypeName } from "./type-map.js";
import type { ParsedAttribute, ParsedObject } from "./types.js";

/**
 * Emit a TypeScript file for a single OCSF object schema.
 *
 * Objects use explicit TypeScript interfaces with type references:
 * - Interface defined first with type references (e.g., MetadataType)
 * - Schema typed as z.ZodType<InterfaceType>
 * - Direct export of schema (no parser object for objects)
 *
 * All object schemas use .passthrough() to preserve unmapped fields.
 */
export function emitObjectFile(
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
  versionSlug: string,
): string {
  const lines: string[] = [];

  // Handle special case: "Object" shadows JavaScript's global Object
  const className = obj.className === "Object" ? "OcsfObject" : obj.className;
  const typeName = obj.className === "Object" ? "OcsfObjectType" : `${obj.className}Type`;
  const schemaName = `${className}Schema`;

  // Imports
  lines.push("import { z } from 'zod';");
  lines.push("");

  // Collect object imports needed for this object's attributes
  const importedObjects = new Set<string>();
  for (const attr of obj.attributes) {
    if (attr.objectType && attr.objectType !== obj.name) {
      const refObj = allObjects.get(attr.objectType);
      // Import ALL objects (including abstract ones) since they get generated
      if (refObj) {
        importedObjects.add(attr.objectType);
      }
    }
  }

  // Self-referencing check (e.g., file.parent_folder -> file)
  const selfReferencing = obj.attributes.some((a) => a.objectType === obj.name);

  // Import referenced object TYPES (for interface definition)
  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject
    const refTypeName =
      refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
    lines.push(`import type { ${refTypeName} } from './${fileName}.js';`);
  }

  if (importedObjects.size > 0) lines.push("");

  // Generate TypeScript interface with type references
  lines.push("/**");
  if (obj.description) {
    lines.push(` * ${obj.description}`);
    lines.push(" *");
  }
  if (obj.caption) {
    lines.push(` * OCSF Object: ${obj.caption}`);
  }
  lines.push(" */");
  lines.push(`export interface ${typeName} {`);
  emitInterfaceFields(lines, obj, allObjects);
  lines.push("}");
  lines.push("");

  // Import referenced object SCHEMAS (for schema definition)
  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject
    const importClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
    lines.push(`import { ${importClassName} } from './${fileName}.js';`);
  }

  if (importedObjects.size > 0) lines.push("");

  // Detect if object is recursive
  const isRecursive = obj.isInCycle || selfReferencing;

  // Generate Zod schema typed as z.ZodType<InterfaceType>
  if (isRecursive) {
    // Recursive: use getter pattern with strict validation
    lines.push(`const ${schemaName}: z.ZodType<${typeName}> = z.strictObject({`);
    emitFieldsWithGetters(lines, obj, allObjects);
    lines.push("});");
  } else {
    // Non-recursive: plain object with strict validation
    lines.push(`const ${schemaName}: z.ZodType<${typeName}> = z.strictObject({`);
    emitSimpleFields(lines, obj, allObjects);
    lines.push("});");
  }

  lines.push("");

  // Export schema directly (no parser for objects)
  lines.push(`export const ${className} = ${schemaName};`);

  lines.push("");
  return lines.join("\n");
}

/**
 * Emit TypeScript interface field definitions with type references.
 */
function emitInterfaceFields(
  lines: string[],
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
): void {
  for (const attr of obj.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    const tsType = getTsTypeForInterface(attr, allObjects, obj.name);

    // Apply optionality
    const optional = attr.requirement !== "required" ? "?" : "";

    lines.push(`  ${attr.name}${optional}: ${tsType};`);
  }
}

/**
 * Get the TypeScript type for an interface field.
 */
function getTsTypeForInterface(
  attr: ParsedAttribute,
  allObjects: Map<string, ParsedObject>,
  currentObjName: string,
): string {
  let base: string;

  if (attr.objectType) {
    // Object reference - use type reference
    const refObj = allObjects.get(attr.objectType);
    if (!refObj) {
      // Unknown: use Record<string, unknown>
      base = "Record<string, unknown>";
    } else if (attr.objectType === currentObjName) {
      // Self-reference - use the type name directly (will be defined in same file)
      const selfTypeName =
        refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
      base = selfTypeName;
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refTypeName =
        refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
      base = refTypeName;
    }
  } else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith("_id")) {
    // Generate enum validation using union of literals
    const literals = attr.enumValues.map((v) => v.value).join(" | ");
    base = literals;
  } else {
    // Primitive type
    base = mapOcsfTypeToTs(attr.ocsfType);
  }

  // Wrap in array if needed
  if (attr.isArray) {
    base = `${base}[]`;
  }

  return base;
}

/**
 * Emit simple field definitions for non-recursive objects.
 */
function emitSimpleFields(
  lines: string[],
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
): void {
  for (const attr of obj.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    let zodType = getZodTypeSimple(attr, allObjects);

    // Apply optionality
    if (attr.requirement !== "required") {
      zodType += ".optional()";
    }

    lines.push(`  ${attr.name}: ${zodType},`);
  }
}

/**
 * Emit field definitions with getters for recursive objects.
 */
function emitFieldsWithGetters(
  lines: string[],
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
): void {
  for (const attr of obj.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    const useGetter = shouldUseGetter(attr, obj, allObjects);

    if (useGetter) {
      // For Zod 4: wrap in z.lazy() to defer execution and avoid circular import issues
      const baseType = getZodTypeForGetter(attr, allObjects);
      const lazyType = `z.lazy(() => ${baseType})`;
      const finalType = attr.requirement !== "required" ? `${lazyType}.optional()` : lazyType;
      lines.push(`  get ${attr.name}() { return ${finalType}; },`);
    } else {
      // Regular field
      let zodType = getZodTypeSimple(attr, allObjects);
      if (attr.requirement !== "required") {
        zodType += ".optional()";
      }
      lines.push(`  ${attr.name}: ${zodType},`);
    }
  }
}

/**
 * Determine if a field should use getter pattern.
 * Use getter when:
 * - Field references itself (self-reference)
 * - OR both current object and referenced object are in cycle
 */
function shouldUseGetter(
  attr: ParsedAttribute,
  currentObj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
): boolean {
  if (!attr.objectType) return false;

  // Self-reference
  if (attr.objectType === currentObj.name) return true;

  // Both in cycle
  const refObj = allObjects.get(attr.objectType);
  if (refObj && currentObj.isInCycle && refObj.isInCycle) {
    return true;
  }

  return false;
}

/**
 * Get the Zod type expression for a simple (non-getter) field.
 */
function getZodTypeSimple(attr: ParsedAttribute, allObjects: Map<string, ParsedObject>): string {
  let base: string;

  if (attr.objectType) {
    // Object reference
    const refObj = allObjects.get(attr.objectType);
    if (!refObj) {
      // Unknown: use z.record(z.string(), z.unknown())
      base = "z.record(z.string(), z.unknown())";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
      // Direct reference (no z.lazy)
      base = refClassName;
    }
  } else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith("_id")) {
    // Generate enum validation using union of literals
    const literals = attr.enumValues.map((v) => `z.literal(${v.value})`).join(", ");
    base = `z.union([${literals}])`;
  } else {
    // Primitive type
    base = mapOcsfTypeToZod(attr.ocsfType);
  }

  // Wrap in array if needed
  if (attr.isArray) {
    base = `z.array(${base})`;
  }

  return base;
}

/**
 * Get the Zod type expression for a getter field.
 * Direct references (no z.lazy) to support .extend() on returned schemas.
 */
function getZodTypeForGetter(attr: ParsedAttribute, allObjects: Map<string, ParsedObject>): string {
  let base: string;

  if (attr.objectType) {
    // Object reference
    const refObj = allObjects.get(attr.objectType);
    if (!refObj) {
      // Unknown: use z.record(z.string(), z.unknown())
      base = "z.record(z.string(), z.unknown())";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
      // Direct reference (no z.lazy) to support composition methods
      base = refClassName;
    }
  } else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith("_id")) {
    // Generate enum validation using union of literals
    const literals = attr.enumValues.map((v) => `z.literal(${v.value})`).join(", ");
    base = `z.union([${literals}])`;
  } else {
    // Primitive type
    base = mapOcsfTypeToZod(attr.ocsfType);
  }

  // Wrap in array if needed
  if (attr.isArray) {
    base = `z.array(${base})`;
  }

  return base;
}

/**
 * Get the explicit return type annotation for a getter.
 * Computes the proper Zod type to break circular type references in recursive schemas.
 */
function getZodReturnType(attr: ParsedAttribute, allObjects: Map<string, ParsedObject>): string {
  let base: string;

  if (attr.objectType) {
    // Object reference
    const refObj = allObjects.get(attr.objectType);
    if (!refObj) {
      // Unknown: use z.ZodRecord<z.ZodString, z.ZodUnknown>
      base = "z.ZodRecord<z.ZodString, z.ZodUnknown>";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
      // Use typeof to reference the schema type
      base = `typeof ${refClassName}`;
    }
  } else {
    // Primitive type - map to Zod type name
    base = mapOcsfTypeToZodTypeName(attr.ocsfType);
  }

  // Wrap in array if needed
  if (attr.isArray) {
    base = `z.ZodArray<${base}>`;
  }

  // Wrap in optional if needed
  if (attr.requirement !== "required") {
    base = `z.ZodOptional<${base}>`;
  }

  return base;
}
