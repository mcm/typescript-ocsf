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
 * export type FileActivityType = z.infer<typeof FileActivity>;
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

  // Import referenced objects (schema only, not type)
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

  // Schema with preprocess
  // Add :any annotation to prevent TS7056 errors on complex nested schemas
  lines.push(`export const ${event.className}: any = z.preprocess(`);
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
        // Direct reference (no z.lazy wrapper)
        zodType = refClassName;
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
  lines.push(");");
  lines.push("");

  // Type inference
  lines.push(`export type ${event.className}Type = z.infer<typeof ${event.className}>;`);
  lines.push("");

  return lines.join("\n");
}

/** Convert an attribute name to a SCREAMING_SNAKE_CASE constant name. */
function toConstName(attrName: string): string {
  return attrName.toUpperCase();
}
