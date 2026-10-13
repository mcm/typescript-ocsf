import { collectEnumFields, emitLabelsMap } from "./enum-labels.js";
import { toClassName, toFileName } from "./naming.js";
import {
  enumUnionZodTypeName,
  mapOcsfTypeToTs,
  mapOcsfTypeToZod,
  mapOcsfTypeToZodTypeName,
  wrapZodTypeName,
} from "./type-map.js";
import type { ParsedAttribute, ParsedEnum, ParsedObject } from "./types.js";

/**
 * Emit a TypeScript file for a single OCSF object schema.
 *
 * Objects use explicit TypeScript interfaces with type references:
 * - Interface defined first with type references (e.g., MetadataType)
 * - Schema typed as z.ZodType<InterfaceType>
 * - Direct export of schema (no parser object for objects)
 *
 * All object schemas use strict validation. Arbitrary fields should
 * go in the 'unmapped' field (OCSF type 'object').
 */
export function emitObjectFile(
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
  versionSlug: string,
  observableTypeIdEnum?: ParsedEnum,
): string {
  const lines: string[] = [];

  // Handle special case: "Object" shadows JavaScript's global Object
  const className = obj.className === "Object" ? "OcsfObject" : obj.className;
  const typeName = obj.className === "Object" ? "OcsfObjectType" : `${obj.className}Type`;
  const schemaName = `${className}Schema`;

  // Special case: Observable needs ObservableTypeId enum
  const isObservable = obj.className === "Observable";

  // Imports
  lines.push("import { z } from 'zod';");
  if (isObservable) {
    lines.push(
      "import { ObservableTypeId, ObservableTypeIdLabels } from '../enums/observable_type_id.js';",
    );
  }
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
  emitInterfaceFields(lines, obj, allObjects, isObservable, observableTypeIdEnum);
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

  // Explicit Zod shape type. Annotating the schema with it keeps declaration
  // output small: nested schemas are referenced by name instead of inlined.
  const shapeName = `${className}Shape`;
  lines.push(`type ${shapeName} = {`);
  for (const attr of obj.attributes) {
    const zodTypeName = getZodTypeName(
      attr,
      obj,
      allObjects,
      isRecursive,
      isObservable && attr.name === "type_id" ? observableTypeIdEnum : undefined,
    );
    lines.push(`  ${attr.name}: ${zodTypeName};`);
  }
  lines.push("};");
  lines.push("");

  const schemaType = `z.ZodObject<${shapeName}, z.core.$strict>`;
  if (isRecursive) {
    // Recursive: use getter pattern with strict validation
    lines.push(`const ${schemaName}: ${schemaType} = z.strictObject({`);
    emitFieldsWithGetters(lines, obj, allObjects, isObservable, observableTypeIdEnum);
    lines.push("});");
  } else {
    // Non-recursive: plain object with strict validation
    lines.push(`const ${schemaName}: ${schemaType} = z.strictObject({`);
    emitSimpleFields(lines, obj, allObjects, isObservable, observableTypeIdEnum);
    lines.push("});");
  }

  lines.push("");

  // Export schema directly (no parser for objects)
  lines.push(`export const ${className} = ${schemaName};`);
  lines.push("");

  // Value → label maps for every enum field on this object
  const overrides =
    isObservable && observableTypeIdEnum
      ? new Map([["type_id", observableTypeIdEnum.values]])
      : undefined;
  emitLabelsMap(
    lines,
    `${className}Labels`,
    className,
    collectEnumFields(obj.attributes, overrides),
  );

  return lines.join("\n");
}

/**
 * Emit TypeScript interface field definitions with type references.
 */
function emitInterfaceFields(
  lines: string[],
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
  isObservable = false,
  observableTypeIdEnum?: ParsedEnum,
): void {
  for (const attr of obj.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    const tsType = getTsTypeForInterface(
      attr,
      allObjects,
      obj.name,
      isObservable && attr.name === "type_id" ? observableTypeIdEnum : undefined,
    );

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
  observableTypeIdEnum?: ParsedEnum,
): string {
  let base: string;

  // Special case: Observable.type_id uses the derived ObservableTypeId enum
  if (observableTypeIdEnum) {
    const literals = observableTypeIdEnum.values.map((v) => v.value).join(" | ");
    base = literals;
  } else if (attr.objectType) {
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
  isObservable = false,
  observableTypeIdEnum?: ParsedEnum,
): void {
  for (const attr of obj.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    let zodType = getZodTypeSimple(
      attr,
      allObjects,
      isObservable && attr.name === "type_id" ? observableTypeIdEnum : undefined,
    );

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
  isObservable = false,
  observableTypeIdEnum?: ParsedEnum,
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
      let zodType = getZodTypeSimple(
        attr,
        allObjects,
        isObservable && attr.name === "type_id" ? observableTypeIdEnum : undefined,
      );
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
function getZodTypeSimple(
  attr: ParsedAttribute,
  allObjects: Map<string, ParsedObject>,
  observableTypeIdEnum?: ParsedEnum,
): string {
  let base: string;

  // Special case: Observable.type_id uses the derived ObservableTypeId enum
  if (observableTypeIdEnum) {
    const literals = observableTypeIdEnum.values.map((v) => `z.literal(${v.value})`).join(", ");
    base = `z.union([${literals}])`;
  } else if (attr.objectType) {
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
 * Get the Zod type name for a field, mirroring the expression emitted by
 * emitSimpleFields / emitFieldsWithGetters.
 */
function getZodTypeName(
  attr: ParsedAttribute,
  currentObj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
  isRecursive: boolean,
  observableTypeIdEnum?: ParsedEnum,
): string {
  const optional = attr.requirement !== "required";
  let base: string;

  if (observableTypeIdEnum) {
    base = enumUnionZodTypeName(observableTypeIdEnum.values.map((v) => v.value));
  } else if (attr.objectType) {
    const refObj = allObjects.get(attr.objectType);
    if (!refObj) {
      base = "z.ZodRecord<z.ZodString, z.ZodUnknown>";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
      base = `typeof ${refClassName}`;
    }
    if (refObj && isRecursive && shouldUseGetter(attr, currentObj, allObjects)) {
      // Getter fields: z.lazy(() => Ref | z.array(Ref)), then optional. Typed via the
      // referenced interface, since `typeof Ref` is circular here and infers as unknown.
      const refTypeName =
        refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
      return wrapZodTypeName(
        `z.ZodLazy<${wrapZodTypeName(`z.ZodType<${refTypeName}>`, attr.isArray, false)}>`,
        false,
        optional,
      );
    }
  } else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith("_id")) {
    base = enumUnionZodTypeName(attr.enumValues.map((v) => v.value));
  } else {
    base = mapOcsfTypeToZodTypeName(attr.ocsfType);
  }

  return wrapZodTypeName(base, attr.isArray, optional);
}
