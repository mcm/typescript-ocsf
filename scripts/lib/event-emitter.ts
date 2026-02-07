import { toClassName, toEnumMember, toFileName } from "./naming.js";
import { mapOcsfTypeToTs, mapOcsfTypeToZod } from "./type-map.js";
import type { ParsedAttribute, ParsedEvent, ParsedObject, ParsedSiblingPair } from "./types.js";

/**
 * Emit a TypeScript file for a single OCSF event class.
 *
 * Event schemas wrap their z.object() in z.preprocess() to run
 * sibling reconciliation and UID pre-filling before Zod validates
 * the field types.
 *
 * Generated pattern:
 * ```typescript
 * export const FileActivity = z.preprocess(
 *   (data) => {
 *     if (typeof data !== 'object' || data === null) return data;
 *     let d = { ...data } as Record<string, unknown>;
 *     d = reconcileSiblings(d, SIBLING_PAIRS);
 *     d = prefillUids(d, UID_CONFIG);
 *     return d;
 *   },
 *   z.object({ ... }).passthrough(),
 * );
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

  // Import referenced objects
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

  for (const refName of importedObjects) {
    const refObj = allObjects.get(refName);
    if (!refObj) continue;
    const fileName = toFileName(refObj.className);
    // Handle special case where Object is renamed to OcsfObject to avoid shadowing
    const importClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
    const importTypeName =
      refObj.className === "Object" ? "OcsfObjectType" : `${refObj.className}Type`;
    lines.push(
      `import { ${importClassName}, type ${importTypeName} } from '../objects/${fileName}.js';`,
    );
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

  // JSDoc
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

  // Emit explicit TypeScript interface to avoid TS7056 errors
  emitExplicitType(lines, event, allObjects);
  lines.push("");

  // Schema with preprocess
  lines.push(`export const ${event.className}: z.ZodType<${event.className}Type> = z.preprocess(`);
  lines.push("  (data) => {");
  lines.push("    if (typeof data !== 'object' || data === null) return data;");
  lines.push("    let d = { ...data } as Record<string, unknown>;");
  if (event.siblingPairs.length > 0) {
    lines.push("    d = reconcileSiblings(d, SIBLING_PAIRS);");
  }
  lines.push("    d = prefillUids(d, UID_CONFIG);");
  lines.push("    return d;");
  lines.push("  },");

  // Inner z.object()
  lines.push("  z.object({");
  for (const attr of event.attributes) {
    if (attr.description) {
      lines.push(`    /** ${attr.description} */`);
    }

    let zodType: string;
    if (attr.objectType) {
      const refObj = allObjects.get(attr.objectType);
      if (refObj && !refObj.name.startsWith("_")) {
        // Handle special case where Object is renamed to OcsfObject
        const refClassName = refObj.className === "Object" ? "OcsfObject" : refObj.className;
        zodType = `z.lazy(() => ${refClassName})`;
      } else {
        zodType = "z.record(z.unknown())";
      }
    } else {
      zodType = mapOcsfTypeToZod(attr.ocsfType);
    }

    if (attr.isArray) {
      zodType = `z.array(${zodType})`;
    }

    if (attr.requirement !== "required") {
      zodType += ".optional()";
    }

    lines.push(`    ${attr.name}: ${zodType},`);
  }
  lines.push("  }).passthrough(),");
  lines.push(") as any;");
  lines.push("");

  return lines.join("\n");
}

/** Convert an attribute name to a SCREAMING_SNAKE_CASE constant name. */
function toConstName(attrName: string): string {
  return attrName.toUpperCase();
}

/**
 * Emit an explicit TypeScript interface for the event type.
 * This prevents TS7056 errors caused by complex type inference from z.preprocess().
 */
function emitExplicitType(
  lines: string[],
  event: ParsedEvent,
  allObjects: Map<string, ParsedObject>,
): void {
  lines.push(`export interface ${event.className}Type {`);

  for (const attr of event.attributes) {
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
