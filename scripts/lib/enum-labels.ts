import type { ParsedAttribute, ParsedEnumValue } from "./types.js";

/**
 * An enum-valued field on an object or event, with the values it accepts.
 */
export interface EnumField {
  /** The attribute name, e.g. "type_id". */
  name: string;
  /** The enum values for this attribute (after any per-class overrides). */
  values: ParsedEnumValue[];
}

/**
 * Collect every `_id` attribute that carries inline enum values.
 *
 * `overrides` replaces the values for specific attributes (e.g. Observable.type_id,
 * whose values are derived from the whole schema rather than the dictionary).
 */
export function collectEnumFields(
  attributes: ParsedAttribute[],
  overrides?: Map<string, ParsedEnumValue[]>,
): EnumField[] {
  const fields: EnumField[] = [];
  for (const attr of attributes) {
    if (!attr.name.endsWith("_id")) continue;
    const values = overrides?.get(attr.name) ?? attr.enumValues;
    if (!values || values.length === 0) continue;
    fields.push({ name: attr.name, values });
  }
  return fields;
}

/**
 * Emit a `<Owner>Labels` constant mapping each enum field to its value → label map.
 *
 * Generated pattern:
 *
 * ```typescript
 * /** Value → label mappings for each enum field of Device. *\/
 * export const DeviceLabels: Readonly<Record<"risk_level_id" | "type_id", Readonly<Record<number, string>>>> = {
 *   risk_level_id: { 0: "Info", 1: "Low", ... },
 *   type_id: { 0: "Unknown", 1: "Server", ... },
 * };
 * ```
 */
export function emitLabelsMap(
  lines: string[],
  constName: string,
  ownerName: string,
  fields: EnumField[],
): void {
  const keyType =
    fields.length > 0 ? fields.map((f) => JSON.stringify(f.name)).join(" | ") : "never";
  lines.push(`/** Value → label mappings for each enum field of ${ownerName}. */`);
  lines.push(
    `export const ${constName}: Readonly<Record<${keyType}, Readonly<Record<number, string>>>> = {`,
  );
  for (const field of fields) {
    lines.push(`  ${field.name}: {`);
    for (const val of field.values) {
      lines.push(`    ${val.value}: ${JSON.stringify(val.caption)},`);
    }
    lines.push("  },");
  }
  lines.push("};");
  lines.push("");
}

/** Whether two enum value lists are identical (same values with the same captions). */
export function sameEnumValues(a: ParsedEnumValue[], b: ParsedEnumValue[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v.value === b[i].value && v.caption === b[i].caption);
}
