/** Algorithm ID values. */
export const AlgorithmId = {
  /** The algorithm is unknown. */
  UNKNOWN: 0,
  /** The algorithm is not mapped. See the <code>algorithm</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AlgorithmId = (typeof AlgorithmId)[keyof typeof AlgorithmId];

/** Label mapping for AlgorithmId values. */
export const AlgorithmIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
