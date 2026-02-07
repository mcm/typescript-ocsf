/** Reputation Score ID values. */
export const ScoreId = {
  /** The reputation score is unknown. */
  UNKNOWN: 0,
  /** Long history of good behavior. */
  VERY_SAFE: 1,
  /** Consistently good behavior. */
  SAFE: 2,
  /** Reasonable history of good behavior. */
  PROBABLY_SAFE: 3,
  /** Starting to establish a history of normal behavior. */
  LEANS_SAFE: 4,
  /** No established history of normal behavior. */
  MAY_NOT_BE_SAFE: 5,
  /** Starting to establish a history of suspicious or risky behavior. */
  EXERCISE_CAUTION: 6,
  /** A site with a history of suspicious or risky behavior. (spam, scam, potentially unwanted software, potentially malicious). */
  SUSPICIOUS_RISKY: 7,
  /** Strong possibility of maliciousness. */
  POSSIBLY_MALICIOUS: 8,
  /** Indicators of maliciousness. */
  PROBABLY_MALICIOUS: 9,
  /** Proven evidence of maliciousness. */
  MALICIOUS: 10,
  /** The reputation score is not mapped. See the <code>rep_score</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ScoreId = (typeof ScoreId)[keyof typeof ScoreId];

/** Label mapping for ScoreId values. */
export const ScoreIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Very Safe",
  2: "Safe",
  3: "Probably Safe",
  4: "Leans Safe",
  5: "May not be Safe",
  6: "Exercise Caution",
  7: "Suspicious/Risky",
  8: "Possibly Malicious",
  9: "Probably Malicious",
  10: "Malicious",
  99: "Other",
};
