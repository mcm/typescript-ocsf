import { toClassName, toFileName } from "./naming.js";
import { mapOcsfTypeToTs, mapOcsfTypeToZod } from "./type-map.js";
import type { ParsedAttribute, ParsedObject } from "./types.js";

/**
 * Emit a TypeScript file for a single OCSF object schema.
 *
 * Objects in circular reference cycles get:
 * 1. An explicit TypeScript interface (required by z.lazy())
 * 2. z.lazy() wrappers on all cross-references within the cycle
 * 3. Typed schema declaration: `const File: z.ZodType<FileType> = z.lazy(...)`
 *
 * Non-circular objects use simple z.object() with z.infer<> for types.
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

  // Import referenced objects
  // Always import both schema and type since all objects now have explicit interfaces
  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject
    const importClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
    const importTypeName =
      refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
    lines.push(`import { ${importClassName}, type ${importTypeName} } from './${fileName}.js';`);
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

  // Always emit explicit TypeScript interface to avoid TS7056 errors
  emitExplicitType(lines, obj, allObjects, className, typeName);
  lines.push("");

  if (obj.isInCycle || selfReferencing) {
    // Emit schema with z.lazy() for cycle members
    lines.push(`export const ${className}: z.ZodType<${typeName}> = z.lazy(() =>`);
    lines.push("  z.object({");
    emitFields(lines, obj, allObjects, true);
    lines.push("  }).passthrough(),");
    lines.push(") as any;");
  } else {
    // Simple schema
    lines.push(`export const ${className}: z.ZodType<${typeName}> = z.object({`);
    emitFields(lines, obj, allObjects, false);
    lines.push("}).passthrough() as any;");
  }

  lines.push("");
  return lines.join("\n");
}

/**
 * Emit an explicit TypeScript interface for objects in reference cycles.
 */
function emitExplicitType(
  lines: string[],
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
  className: string,
  typeName: string,
): void {
  lines.push(`export interface ${typeName} {`);

  for (const attr of obj.attributes) {
    const tsType = getTypeScriptType(attr, allObjects);
    const optional = attr.requirement !== "required" ? "?" : "";
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }
    lines.push(`  ${attr.name}${optional}: ${tsType};`);
  }

  // Allow extra properties (passthrough)
  lines.push("  [key: string]: unknown;");
  lines.push("}");
}

/**
 * Emit Zod field definitions into a z.object() shape.
 */
function emitFields(
  lines: string[],
  obj: ParsedObject,
  allObjects: Map<string, ParsedObject>,
  useLazy: boolean,
): void {
  for (const attr of obj.attributes) {
    if (attr.description) {
      lines.push(`    /** ${attr.description} */`);
    }

    let zodType = getZodType(attr, allObjects, useLazy, obj.name);

    // Apply optionality
    if (attr.requirement !== "required") {
      zodType += ".optional()";
    }

    lines.push(`    ${attr.name}: ${zodType},`);
  }
}

/**
 * Get the Zod type expression for an attribute.
 */
function getZodType(
  attr: ParsedAttribute,
  allObjects: Map<string, ParsedObject>,
  useLazy: boolean,
  currentObjName: string,
): string {
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
      if (useLazy || refObj.isInCycle || attr.objectType === currentObjName) {
        // Use z.lazy() for cycle members or self-references
        base = `z.lazy(() => ${refClassName})`;
      } else {
        base = refClassName;
      }
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
 * Get the TypeScript type string for an attribute (used in explicit interfaces).
 */
function getTypeScriptType(attr: ParsedAttribute, allObjects: Map<string, ParsedObject>): string {
  let base: string;

  if (attr.objectType) {
    const refObj = allObjects.get(attr.objectType);
    if (!refObj) {
      base = "Record<string, unknown>";
    } else {
      // Handle special case where Object is renamed to OcsfObject
      const refTypeName =
        refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
      base = refTypeName;
    }
  } else {
    base = mapOcsfTypeToTs(attr.ocsfType);
  }

  if (attr.isArray) {
    base = `${base}[]`;
  }

  if (attr.requirement !== "required") {
    base += " | undefined";
  }

  return base;
}
