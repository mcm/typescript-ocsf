import { z } from "zod";

/**
 * Configuration for a single sibling ID/label pair.
 */
export interface SiblingPair {
  /** The _id field name (e.g., 'activity_id'). */
  idField: string;
  /** The label field name (e.g., 'activity_name' or 'activity'). */
  labelField: string;
  /** Mapping from integer ID to canonical string label. */
  labels: Record<number, string>;
}

/**
 * Reconcile sibling ID/label pairs in event data.
 *
 * Implements the 7-scenario reconciliation matrix from the PRD:
 *
 * | _id           | label            | Result                                    |
 * |---------------|------------------|-------------------------------------------|
 * | Valid ID      | Matching label   | Both kept, label normalized to canonical  |
 * | Valid ID      | Mismatched label | Validation error raised                   |
 * | Valid ID (99) | Any label        | Custom label preserved as-is (OTHER)      |
 * | Valid ID      | Missing          | Label extrapolated from ID                |
 * | Missing       | Known label      | ID extrapolated from label                |
 * | Missing       | Unknown label    | ID set to 99 (OTHER), label preserved     |
 * | Invalid ID    | Any              | Validation error raised                   |
 *
 * @param data - The raw event data object
 * @param pairs - Array of sibling pair configurations
 * @returns The data with reconciled sibling fields
 * @throws Error if sibling values are inconsistent (caught by Zod as ZodError)
 */
export function reconcileSiblings(
  data: Record<string, unknown>,
  pairs: readonly SiblingPair[],
): Record<string, unknown> {
  const result = { ...data };

  for (const { idField, labelField, labels } of pairs) {
    const idVal = result[idField];
    const labelVal = result[labelField];
    const hasId = idVal !== undefined && idVal !== null;
    const hasLabel = labelVal !== undefined && labelVal !== null && labelVal !== "";

    if (hasId && hasLabel) {
      // Both present: validate consistency
      const id = Number(idVal);
      const expectedLabel = labels[id];

      if (id === 99) {
        // OTHER: preserve custom label as-is, keep ID
        result[idField] = 99;
      } else if (expectedLabel !== undefined) {
        // Known ID: verify label matches (case-insensitive)
        if (expectedLabel.toLowerCase() !== String(labelVal).toLowerCase()) {
          throw new Error(
            `${idField}=${id} (${expectedLabel}) does not match ${labelField}='${labelVal}'`,
          );
        }
        // Normalize to canonical casing
        result[labelField] = expectedLabel;
      }
      // If ID is not in labels and not 99, it is still kept as-is
      // (the Zod schema's own int() validation will catch truly invalid values)
    } else if (hasId) {
      // Only ID provided: extrapolate label
      const id = Number(idVal);
      const label = labels[id];
      if (label !== undefined) {
        result[labelField] = label;
      }
      // If ID has no known label (e.g., vendor extension), leave label absent
    } else if (hasLabel) {
      // Only label provided: reverse-lookup ID
      const labelStr = String(labelVal);
      const entry = Object.entries(labels).find(
        ([, lbl]) => lbl.toLowerCase() === labelStr.toLowerCase(),
      );

      if (entry) {
        result[idField] = Number(entry[0]);
        result[labelField] = entry[1]; // Canonical casing
      } else {
        // Unknown label -> map to OTHER (99)
        result[idField] = 99;
        // Preserve original label
      }
    }
    // Neither present: leave both absent
  }

  return result;
}
