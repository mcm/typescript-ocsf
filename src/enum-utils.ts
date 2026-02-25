/**
 * Utility functions for working with OCSF enums.
 *
 * These helpers provide type-safe conversions between enum values and labels.
 */

/**
 * Get the label for an enum value.
 *
 * @param labels - The enum's Labels object (e.g., SeverityIdLabels)
 * @param value - The numeric enum value
 * @returns The label string, or undefined if not found
 *
 * @example
 * ```typescript
 * import { SeverityId, SeverityIdLabels } from '@mcm/ocsf/v1_7/enums';
 * import { getEnumLabel } from '@mcm/ocsf/enum-utils';
 *
 * const label = getEnumLabel(SeverityIdLabels, SeverityId.LOW);
 * // => "Low"
 * ```
 */
export function getEnumLabel(labels: Record<number, string>, value: number): string | undefined {
  return labels[value];
}

/**
 * Get the enum value for a label (case-insensitive).
 *
 * @param byLabel - The enum's ByLabel object (e.g., SeverityIdByLabel)
 * @param label - The label string (case-insensitive)
 * @returns The numeric enum value, or undefined if not found
 *
 * @example
 * ```typescript
 * import { SeverityIdByLabel } from '@mcm/ocsf/v1_7/enums';
 * import { getEnumValue } from '@mcm/ocsf/enum-utils';
 *
 * const value = getEnumValue(SeverityIdByLabel, "Low");
 * // => 2
 *
 * const value2 = getEnumValue(SeverityIdByLabel, "low");
 * // => 2 (case-insensitive)
 * ```
 */
export function getEnumValue(byLabel: Record<string, number>, label: string): number | undefined {
  // Try exact match first for performance
  if (label in byLabel) {
    return byLabel[label];
  }

  // Fall back to case-insensitive search
  const lowerLabel = label.toLowerCase();
  for (const [key, value] of Object.entries(byLabel)) {
    if (key.toLowerCase() === lowerLabel) {
      return value;
    }
  }

  return undefined;
}

/**
 * Get the label for an enum value with a fallback.
 *
 * @param labels - The enum's Labels object (e.g., SeverityIdLabels)
 * @param value - The numeric enum value
 * @param fallback - Fallback string if label not found (default: "Unknown")
 * @returns The label string, or fallback if not found
 *
 * @example
 * ```typescript
 * import { SeverityIdLabels } from '@mcm/ocsf/v1_7/enums';
 * import { getEnumLabelOr } from '@mcm/ocsf/enum-utils';
 *
 * const label = getEnumLabelOr(SeverityIdLabels, 999, "N/A");
 * // => "N/A"
 * ```
 */
export function getEnumLabelOr(
  labels: Record<number, string>,
  value: number,
  fallback = "Unknown",
): string {
  return labels[value] ?? fallback;
}

/**
 * Get the enum value for a label with a fallback (case-insensitive).
 *
 * @param byLabel - The enum's ByLabel object (e.g., SeverityIdByLabel)
 * @param label - The label string (case-insensitive)
 * @param fallback - Fallback value if label not found (default: 0)
 * @returns The numeric enum value, or fallback if not found
 *
 * @example
 * ```typescript
 * import { SeverityIdByLabel } from '@mcm/ocsf/v1_7/enums';
 * import { getEnumValueOr } from '@mcm/ocsf/enum-utils';
 *
 * const value = getEnumValueOr(SeverityIdByLabel, "InvalidLabel", -1);
 * // => -1
 *
 * const value2 = getEnumValueOr(SeverityIdByLabel, "critical");
 * // => 5 (case-insensitive)
 * ```
 */
export function getEnumValueOr(
  byLabel: Record<string, number>,
  label: string,
  fallback = 0,
): number {
  return getEnumValue(byLabel, label) ?? fallback;
}
