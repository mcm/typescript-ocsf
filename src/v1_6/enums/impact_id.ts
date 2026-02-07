/** Impact ID values. */
export const ImpactId = {
  /** The normalized impact is unknown. */
  UNKNOWN: 0,
  /** The magnitude of harm is low. */
  LOW: 1,
  /** The magnitude of harm is moderate. */
  MEDIUM: 2,
  /** The magnitude of harm is high. */
  HIGH: 3,
  /** The magnitude of harm is high and the scope is widespread. */
  CRITICAL: 4,
  /** The impact is not mapped. See the <code>impact</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ImpactId = (typeof ImpactId)[keyof typeof ImpactId];

/** Label mapping for ImpactId values. */
export const ImpactIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  99: "Other",
};
