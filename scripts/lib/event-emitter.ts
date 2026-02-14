import { toClassName, toEnumMember, toFileName } from "./naming.js";
import { mapOcsfTypeToTs, mapOcsfTypeToZod } from "./type-map.js";
import type { ParsedAttribute, ParsedEvent, ParsedObject, ParsedSiblingPair } from "./types.js";

/**
 * Emit a TypeScript file for a single OCSF event class.
 *
 * Event schemas use explicit TypeScript interfaces with parser objects:
 * - Interface defined first with type references (e.g., MetadataType)
 * - Base schema without preprocessing
 * - Parser object with parse/safeParse/schema properties
 * - Preprocessing moved to parser methods
 *
 * Generated pattern:
 * ```typescript
 * export interface FileActivityType {
 *   metadata: MetadataType;
 *   // ...
 * }
 *
 * const FileActivitySchema: z.ZodType<FileActivityType> = z.strictObject({ ... });
 *
 * export const FileActivity = {
 *   parse: (data: unknown) => FileActivitySchema.parse(preprocess(data)),
 *   safeParse: (data: unknown) => { ... },
 *   schema: FileActivitySchema,
 * };
 * ```
 */
export function emitEventFile(
  event: ParsedEvent,
  allObjects: Map<string, ParsedObject>,
  versionSlug: string,
): string {
  const lines: string[] = [];

  // Imports
  lines.push("import { z } from 'zod';");
  lines.push("import { reconcileSiblings, type SiblingPair } from '../../sibling.js';");
  lines.push("import { prefillUids, type UidConfig } from '../../uid.js';");
  lines.push("");

  // Collect object imports needed for this event's attributes
  const importedObjects = new Set<string>();
  for (const attr of event.attributes) {
    if (attr.objectType) {
      const refObj = allObjects.get(attr.objectType);
      // Import ALL objects (including abstract ones) since they get generated
      if (refObj) {
        importedObjects.add(attr.objectType);
      }
    }
  }

  // Import referenced object TYPES (for interface definition)
  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject
    const refTypeName =
      refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
    lines.push(`import type { ${refTypeName} } from '../objects/${fileName}.js';`);
  }

  if (importedObjects.size > 0) lines.push("");

  // Generate TypeScript interface with type references
  lines.push("/**");
  if (event.description) {
    lines.push(` * ${event.description}`);
    lines.push(" *");
  }
  lines.push(` * OCSF Class UID: ${event.classUid}`);
  lines.push(` * Category: ${event.caption || event.category}`);
  lines.push(
    ` * @see https://schema.ocsf.io/${versionSlug.replace("v", "").replace("_", ".")}.0/classes/${event.name}`,
  );
  lines.push(" */");
  lines.push(`export interface ${event.className}Type {`);
  emitInterfaceFields(lines, event, allObjects);
  lines.push("}");
  lines.push("");

  // Import referenced object SCHEMAS (for schema definition)
  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject
    const importClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
    lines.push(`import { ${importClassName} } from '../objects/${fileName}.js';`);
  }

  if (importedObjects.size > 0) lines.push("");

  // Sibling pair constants
  if (event.siblingPairs.length > 0) {
    for (const pair of event.siblingPairs) {
      const constName = `${toConstName(pair.idField)}_LABELS`;
      lines.push(`const ${constName}: Record<number, string> = {`);
      for (const val of pair.enumValues) {
        lines.push(`  ${val.value}: ${JSON.stringify(val.caption)},`);
      }
      lines.push("};");
      lines.push("");
    }

    lines.push("const SIBLING_PAIRS: readonly SiblingPair[] = [");
    for (const pair of event.siblingPairs) {
      const constName = `${toConstName(pair.idField)}_LABELS`;
      lines.push(
        `  { idField: ${JSON.stringify(pair.idField)}, labelField: ${JSON.stringify(pair.labelField)}, labels: ${constName} },`,
      );
    }
    lines.push("];");
    lines.push("");
  }

  // UID config
  lines.push("const UID_CONFIG: UidConfig = {");
  lines.push(`  categoryUid: ${event.categoryUid},`);
  lines.push(`  classUid: ${event.classUid},`);
  lines.push("};");
  lines.push("");

  // Preprocessing function
  lines.push("function preprocess(data: unknown): unknown {");
  lines.push("  if (typeof data !== 'object' || data === null) return data;");
  lines.push("  let d = { ...data } as Record<string, unknown>;");
  if (event.siblingPairs.length > 0) {
    lines.push("  d = reconcileSiblings(d, SIBLING_PAIRS);");
  }
  lines.push("  d = prefillUids(d, UID_CONFIG);");
  lines.push("  return d;");
  lines.push("}");
  lines.push("");

  // Base schema (no preprocessing)
  const schemaName = `${event.className}Schema`;
  lines.push(`const ${schemaName}: z.ZodType<${event.className}Type> = z.strictObject({`);
  for (const attr of event.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    let zodType: string;
    if (attr.objectType) {
      const refObj = allObjects.get(attr.objectType);
      if (refObj && !refObj.name.startsWith("_")) {
        // Handle special case where Object is renamed to OcsfObject
        const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
        // Direct reference (no z.lazy wrapper)
        zodType = refClassName;
      } else {
        zodType = "z.record(z.string(), z.unknown())";
      }
    } else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith("_id")) {
      // Generate enum validation using union of literals
      const literals = attr.enumValues.map((v) => `z.literal(${v.value})`).join(", ");
      zodType = `z.union([${literals}])`;
    } else {
      zodType = mapOcsfTypeToZod(attr.ocsfType);
    }

    if (attr.isArray) {
      zodType = `z.array(${zodType})`;
    }

    if (attr.requirement !== "required") {
      zodType += ".optional()";
    }

    lines.push(`  ${attr.name}: ${zodType},`);
  }
  lines.push("});");
  lines.push("");

  // Parser object with parse/safeParse/schema
  lines.push(`export const ${event.className} = {`);
  lines.push(
    `  parse: (data: unknown): ${event.className}Type => ${schemaName}.parse(preprocess(data)),`,
  );
  lines.push("");
  lines.push(
    `  safeParse: (data: unknown): { success: true; data: ${event.className}Type } | { success: false; error: z.ZodError } => {`,
  );
  lines.push("    try {");
  lines.push("      const preprocessed = preprocess(data);");
  lines.push(`      return ${schemaName}.safeParse(preprocessed);`);
  lines.push("    } catch (error) {");
  lines.push("      // Preprocessing error - convert to Zod error format");
  lines.push("      return {");
  lines.push("        success: false,");
  lines.push("        error: new z.ZodError([{");
  lines.push(`          code: "custom",`);
  lines.push("          path: [],");
  lines.push(`          message: error instanceof Error ? error.message : "Preprocessing failed",`);
  lines.push("        }]),");
  lines.push("      };");
  lines.push("    }");
  lines.push("  },");
  lines.push("");
  lines.push(`  schema: ${schemaName},`);
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

/**
 * Emit TypeScript interface field definitions with type references.
 */
function emitInterfaceFields(
  lines: string[],
  event: ParsedEvent,
  allObjects: Map<string, ParsedObject>,
): void {
  for (const attr of event.attributes) {
    if (attr.description) {
      lines.push(`  /** ${attr.description} */`);
    }

    const tsType = getTsTypeForInterface(attr, allObjects);

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
): string {
  let base: string;

  if (attr.objectType) {
    // Object reference - use type reference
    const refObj = allObjects.get(attr.objectType);
    if (!refObj || refObj.name.startsWith("_")) {
      // Unknown or abstract: use Record<string, unknown>
      base = "Record<string, unknown>";
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

/** Convert an attribute name to a SCREAMING_SNAKE_CASE constant name. */
function toConstName(attrName: string): string {
  return attrName.toUpperCase();
}
