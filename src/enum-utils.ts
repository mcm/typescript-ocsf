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
 * Get the enum value for a label.
 *
 * @param byLabel - The enum's ByLabel object (e.g., SeverityIdByLabel)
 * @param label - The label string
 * @returns The numeric enum value, or undefined if not found
 *
 * @example
 * ```typescript
 * import { SeverityIdByLabel } from '@mcm/ocsf/v1_7/enums';
 * import { getEnumValue } from '@mcm/ocsf/enum-utils';
 *
 * const value = getEnumValue(SeverityIdByLabel, "Low");
 * // => 2
 * ```
 */
export function getEnumValue(byLabel: Record<string, number>, label: string): number | undefined {
  return byLabel[label];
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
 * Get the enum value for a label with a fallback.
 *
 * @param byLabel - The enum's ByLabel object (e.g., SeverityIdByLabel)
 * @param label - The label string
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
 * ```
 */
export function getEnumValueOr(
  byLabel: Record<string, number>,
  label: string,
  fallback = 0,
): number {
  return byLabel[label] ?? fallback;
}
