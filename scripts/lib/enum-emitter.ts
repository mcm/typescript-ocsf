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

  // Label mapping (used by sibling reconciliation)
  lines.push(`/** Label mapping for ${enumDef.name} values. */`);
  lines.push(`export const ${enumDef.name}Labels: Record<number, string> = {`);
  for (const val of enumDef.values) {
    lines.push(`  ${val.value}: ${JSON.stringify(val.caption)},`);
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

/**
 * Emit a per-event enum file for event-specific activity_id values.
 *
 * Event classes define their own activity_id enum values that override
 * the base event's UNKNOWN/OTHER pair. These are emitted as separate
 * files namespaced by event class name.
 *
 * Example: FileActivityActivityId, DnsActivityActivityId
 */
export function emitEventEnumFile(
  eventClassName: string,
  attrName: string,
  values: ParsedEnumValue[],
): string {
  const enumName = `${eventClassName}${toPascalCaseAttr(attrName)}`;
  const lines: string[] = [];

  lines.push(`/** ${eventClassName} ${attrName} values. */`);
  lines.push(`export const ${enumName} = {`);

  // Ensure UNKNOWN (0) and OTHER (99) exist
  const valueMap = new Map(values.map((v) => [v.value, v]));
  if (!valueMap.has(0)) {
    lines.push("  UNKNOWN: 0,");
  }

  for (const val of values) {
    const member = toEnumMember(val.caption);
    if (val.description) {
      lines.push(`  /** ${val.description} */`);
    }
    lines.push(`  ${member}: ${val.value},`);
  }

  if (!valueMap.has(99)) {
    lines.push("  OTHER: 99,");
  }

  lines.push("} as const;");
  lines.push("");
  lines.push(`export type ${enumName} = (typeof ${enumName})[keyof typeof ${enumName}];`);
  lines.push("");

  // Label mapping
  lines.push(`export const ${enumName}Labels: Record<number, string> = {`);
  if (!valueMap.has(0)) {
    lines.push('  0: "Unknown",');
  }
  for (const val of values) {
    lines.push(`  ${val.value}: ${JSON.stringify(val.caption)},`);
  }
  if (!valueMap.has(99)) {
    lines.push('  99: "Other",');
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

function toPascalCaseAttr(attrName: string): string {
  return attrName
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}
