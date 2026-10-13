import { toEnumMember } from "./naming.js";
import type { ParsedEnum, ParsedEnumValue } from "./types.js";

/**
 * Emit a TypeScript file for a single enum definition.
 *
 * Generated pattern:
 *
 * ```typescript
 * /** Severity level identifiers. *\/
 * export const SeverityId = {
 *   UNKNOWN: 0,
 *   INFORMATIONAL: 1,
 *   LOW: 2,
 *   MEDIUM: 3,
 *   HIGH: 4,
 *   CRITICAL: 5,
 *   FATAL: 6,
 *   OTHER: 99,
 * } as const;
 *
 * export type SeverityId = (typeof SeverityId)[keyof typeof SeverityId];
 *
 * /** Label mapping for SeverityId values. *\/
 * export const SeverityIdLabels: Record<number, string> = {
 *   0: 'Unknown',
 *   1: 'Informational',
 *   ...
 * };
 *
 * /** Reverse mapping from label to SeverityId value. *\/
 * export const SeverityIdByLabel: Record<string, number> = {
 *   'Unknown': 0,
 *   'Informational': 1,
 *   ...
 * };
 * ```
 */
export function emitEnumFile(enumDef: ParsedEnum): string {
  const lines: string[] = [];

  // JSDoc
  lines.push(`/** ${enumDef.caption || enumDef.name} values. */`);

  // Const object
  lines.push(`export const ${enumDef.name} = {`);
  for (const val of enumDef.values) {
    const member = toEnumMember(val.caption);
    if (val.description) {
      lines.push(`  /** ${val.description} */`);
    }
    lines.push(`  ${member}: ${val.value},`);
  }
  lines.push("} as const;");
  lines.push("");

  // Type alias
  lines.push(
    `export type ${enumDef.name} = (typeof ${enumDef.name})[keyof typeof ${enumDef.name}];`,
  );
  lines.push("");

  // Label mapping (value → label)
  lines.push(`/** Label mapping for ${enumDef.name} values. */`);
  lines.push(`export const ${enumDef.name}Labels: Record<number, string> = {`);
  for (const val of enumDef.values) {
    lines.push(`  ${val.value}: ${JSON.stringify(val.caption)},`);
  }
  lines.push("};");
  lines.push("");

  // Reverse mapping (label → value)
  lines.push(`/** Reverse mapping from label to ${enumDef.name} value. */`);
  lines.push(`export const ${enumDef.name}ByLabel: Record<string, number> = {`);
  for (const val of enumDef.values) {
    lines.push(`  ${JSON.stringify(val.caption)}: ${val.value},`);
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

/**
 * Emit a per-event enum file for an event class's own enum values.
 *
 * Event classes define their own activity_id enum values that override
 * the base event's UNKNOWN/OTHER pair, and some override other shared
 * enums (e.g. IncidentFinding.status_id). These are emitted as separate
 * files namespaced by event class name.
 *
 * Example: FileActivityActivityId, IncidentFindingStatusId
 *
 * When `padUnknownOther` is set, UNKNOWN (0) and OTHER (99) are added if the
 * values don't already define them (used for activity_id).
 */
export function emitEventEnumFile(
  enumName: string,
  eventClassName: string,
  attrName: string,
  values: ParsedEnumValue[],
  padUnknownOther = false,
): string {
  const lines: string[] = [];

  lines.push(`/** ${eventClassName} ${attrName} values. */`);
  lines.push(`export const ${enumName} = {`);

  const valueMap = new Map(values.map((v) => [v.value, v]));
  const padUnknown = padUnknownOther && !valueMap.has(0);
  const padOther = padUnknownOther && !valueMap.has(99);

  if (padUnknown) {
    lines.push("  UNKNOWN: 0,");
  }

  for (const val of values) {
    const member = toEnumMember(val.caption);
    if (val.description) {
      lines.push(`  /** ${val.description} */`);
    }
    lines.push(`  ${member}: ${val.value},`);
  }

  if (padOther) {
    lines.push("  OTHER: 99,");
  }

  lines.push("} as const;");
  lines.push("");
  lines.push(`export type ${enumName} = (typeof ${enumName})[keyof typeof ${enumName}];`);
  lines.push("");

  // Label mapping (value → label)
  lines.push(`export const ${enumName}Labels: Record<number, string> = {`);
  if (padUnknown) {
    lines.push('  0: "Unknown",');
  }
  for (const val of values) {
    lines.push(`  ${val.value}: ${JSON.stringify(val.caption)},`);
  }
  if (padOther) {
    lines.push('  99: "Other",');
  }
  lines.push("};");
  lines.push("");

  // Reverse mapping (label → value)
  lines.push(`export const ${enumName}ByLabel: Record<string, number> = {`);
  if (padUnknown) {
    lines.push('  "Unknown": 0,');
  }
  for (const val of values) {
    lines.push(`  ${JSON.stringify(val.caption)}: ${val.value},`);
  }
  if (padOther) {
    lines.push('  "Other": 99,');
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}
