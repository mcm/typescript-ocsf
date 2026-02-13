import { toClassName, toFileName } from "./naming.js";
import { mapOcsfTypeToTs, mapOcsfTypeToZod, mapOcsfTypeToZodTypeName } from "./type-map.js";
import type { ParsedAttribute, ParsedObject } from "./types.js";

/**
 * Emit a TypeScript file for a single OCSF object schema.
 *
 * Objects use direct Zod schema definitions with type inference:
 * - Non-recursive objects: plain z.object() with z.infer<typeof X>
 * - Recursive objects: z.object() with getter pattern for self-references
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

  // Import referenced objects (schema only, not type)
  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject
    const importClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
    lines.push(`import { ${importClassName} } from './${fileName}.js';`);
  }

  if (importedObjects.size > 0) lines.push("");

  // JSDoc
  lines.push("/**");
  if (obj.description) {
    lines.push(` * ${obj.description}`);
    lines.push(" *");
  }
  if (obj.caption) {
    lines.push(` * OCSF Object: ${obj.caption}`);
  }
  lines.push(" */");

  // Detect if object is recursive
  const isRecursive = obj.isInCycle || selfReferencing;

  if (isRecursive) {
    // Recursive: use getter pattern with :any to prevent TS7056
    lines.push(`export const ${className}: any = z.object({`);
    emitFieldsWithGetters(lines, obj, allObjects);
    lines.push("}).passthrough();");
  } else {
    // Non-recursive: plain object with :any to prevent TS7056 on complex schemas
    lines.push(`export const ${className}: any = z.object({`);
    emitSimpleFields(lines, obj, allObjects);
    lines.push("}).passthrough();");
  }

  lines.push("");

  // Type inference
  lines.push(`export type ${typeName} = z.infer<typeof ${className}>;`);

  lines.push("");
  return lines.join("\n");
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
      // Use getter pattern - direct references support .extend()
      let zodType = getZodTypeForGetter(attr, allObjects);
      if (attr.requirement !== "required") {
        zodType += ".optional()";
      }
      // Add :any return type for self-referencing and mutually-referencing getters
      // This breaks circular type inference without affecting runtime or z.infer types
      const isSelfReference = attr.objectType === obj.name;
      let isMutualReference = false;

      if (!isSelfReference && attr.objectType) {
        const refObj = allObjects.get(attr.objectType);
        if (refObj) {
          // Check if the referenced object has any attribute that references back to current object
          isMutualReference = refObj.attributes.some((refAttr) => refAttr.objectType === obj.name);
        }
      }

      if (isSelfReference || isMutualReference) {
        lines.push(`  get ${attr.name}(): any { return ${zodType}; },`);
      } else {
        lines.push(`  get ${attr.name}() { return ${zodType}; },`);
      }
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
      // Unknown: use z.record(z.unknown())
      base = "z.record(z.unknown())";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
      // Direct reference (no z.lazy)
      base = refClassName;
    }
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
      // Unknown: use z.record(z.unknown())
      base = "z.record(z.unknown())";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
      // Direct reference (no z.lazy) to support composition methods
      base = refClassName;
    }
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
