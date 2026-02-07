import { toFileName } from "./naming.js";
import type { ParsedSchema } from "./types.js";

/**
 * Emit the objects/index.ts barrel file.
 *
 * Exports all object schemas and their types.
 * Skips abstract objects (those starting with '_' in the schema).
 */
export function emitObjectsBarrel(schema: ParsedSchema): string {
  const lines: string[] = [];
  lines.push("// Auto-generated barrel file for OCSF objects");
  lines.push(`// OCSF version: ${schema.version}`);
  lines.push("");

  const sortedObjects = Array.from(schema.objects.values())
    .filter((obj) => !obj.name.startsWith("_"))
    .sort((a, b) => a.className.localeCompare(b.className));

  for (const obj of sortedObjects) {
    const fileName = toFileName(obj.className);
    // Handle special case where Object is renamed to OcsfObject to avoid shadowing
    if (obj.className === "Object") {
      lines.push(`export { OcsfObject } from "./${fileName}.js";`);
      lines.push(`export type { OcsfObjectType } from "./${fileName}.js";`);
    } else {
      lines.push(`export { ${obj.className} } from "./${fileName}.js";`);
      lines.push(`export type { ${obj.className}Type } from "./${fileName}.js";`);
    }
  }

  lines.push("");
  return lines.join("\n");
}

/**
 * Emit the events/index.ts barrel file.
 *
 * Exports all event schemas and their types.
 * Skips abstract/category-base events.
 */
export function emitEventsBarrel(schema: ParsedSchema): string {
  const lines: string[] = [];
  lines.push("// Auto-generated barrel file for OCSF events");
  lines.push(`// OCSF version: ${schema.version}`);
  lines.push("");

  const sortedEvents = Array.from(schema.events.values())
    .filter((evt) => evt.classUid > 0) // Skip base_event and category bases with uid=0
    .sort((a, b) => a.className.localeCompare(b.className));

  for (const evt of sortedEvents) {
    const fileName = toFileName(evt.className);
    lines.push(`export { ${evt.className} } from "./${fileName}.js";`);
    lines.push(`export type { ${evt.className}Type } from "./${fileName}.js";`);
  }

  lines.push("");
  return lines.join("\n");
}

/**
 * Emit the enums/index.ts barrel file.
 */
export function emitEnumsBarrel(schema: ParsedSchema): string {
  const lines: string[] = [];
  lines.push("// Auto-generated barrel file for OCSF enums");
  lines.push(`// OCSF version: ${schema.version}`);
  lines.push("");

  const sortedEnums = Array.from(schema.enums.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  for (const enumDef of sortedEnums) {
    const fileName = toFileName(enumDef.name);
    lines.push(`export { ${enumDef.name}, ${enumDef.name}Labels } from "./${fileName}.js";`);
    lines.push(`export type { ${enumDef.name} as ${enumDef.name}Type } from "./${fileName}.js";`);
  }

  lines.push("");
  return lines.join("\n");
}

/**
 * Emit the version-level index.ts barrel file.
 *
 * Re-exports all objects, events, and enums from their sub-barrels as namespaced exports.
 * This avoids naming conflicts when an object and event share the same name (e.g., Application, Finding).
 */
export function emitVersionBarrel(schema: ParsedSchema): string {
  const lines: string[] = [];
  lines.push(`// Auto-generated barrel file for OCSF ${schema.version}`);
  lines.push("//");
  lines.push("// Note: Import from specific namespaces to avoid name conflicts:");
  lines.push("//   import { FileActivity } from '@mcm/ocsf/v1_7/events';");
  lines.push("//   import { File } from '@mcm/ocsf/v1_7/objects';");
  lines.push("//   import { SeverityId } from '@mcm/ocsf/v1_7/enums';");
  lines.push("");
  lines.push('export * as objects from "./objects/index.js";');
  lines.push('export * as events from "./events/index.js";');
  lines.push('export * as enums from "./enums/index.js";');
  lines.push("");
  return lines.join("\n");
}

/**
 * Emit the top-level src/index.ts.
 *
 * Re-exports the latest version (v1_7).
 */
export function emitTopLevelIndex(latestSlug: string): string {
  return [
    "/**",
    " * @mcm/ocsf - Zod schemas for the Open Cybersecurity Schema Framework",
    " *",
    ` * This module re-exports the latest OCSF version (${latestSlug}).`,
    " *",
    " * For specific versions:",
    " *   import { FileActivity } from '@mcm/ocsf/v1_7/events';",
    " *   import { File, User } from '@mcm/ocsf/v1_7/objects';",
    " *   import { SeverityId } from '@mcm/ocsf/v1_7/enums';",
    " */",
    `export * from "./${latestSlug}/index.js";`,
    "",
  ].join("\n");
}
