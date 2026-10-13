/** Confidence ID values. */
export const ConfidenceId = {
  /** The normalized confidence is unknown. */
  UNKNOWN: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  /** The confidence is not mapped to the defined enum values. See the <code>confidence</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ConfidenceId = (typeof ConfidenceId)[keyof typeof ConfidenceId];

/** Label mapping for ConfidenceId values. */
export const ConfidenceIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  99: "Other",
};

/** Reverse mapping from label to ConfidenceId value. */
export const ConfidenceIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Low": 1,
  "Medium": 2,
  "High": 3,
  "Other": 99,
};
