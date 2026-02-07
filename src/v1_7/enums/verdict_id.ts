/** Verdict ID values. */
export const VerdictId = {
  /** The type is unknown. */
  UNKNOWN: 0,
  /** The incident is a false positive. */
  FALSE_POSITIVE: 1,
  /** The incident is a true positive. */
  TRUE_POSITIVE: 2,
  /** The incident can be disregarded as it is unimportant, an error or accident. */
  DISREGARD: 3,
  /** The incident is suspicious. */
  SUSPICIOUS: 4,
  /** The incident is benign. */
  BENIGN: 5,
  /** The incident is a test. */
  TEST: 6,
  /** The incident has insufficient data to make a verdict. */
  INSUFFICIENT_DATA: 7,
  /** The incident is a security risk. */
  SECURITY_RISK: 8,
  /** The incident remediation or required actions are managed externally. */
  MANAGED_EXTERNALLY: 9,
  /** The incident is a duplicate. */
  DUPLICATE: 10,
  /** The type is not mapped. See the <code>type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type VerdictId = (typeof VerdictId)[keyof typeof VerdictId];

/** Label mapping for VerdictId values. */
export const VerdictIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "False Positive",
  2: "True Positive",
  3: "Disregard",
  4: "Suspicious",
  5: "Benign",
  6: "Test",
  7: "Insufficient Data",
  8: "Security Risk",
  9: "Managed Externally",
  10: "Duplicate",
  99: "Other",
};
