/** Fix Coverage ID values. */
export const FixCoverageId = {
  /** The fix coverage is unknown. */
  UNKNOWN: 0,
  /** The fix coverage is not mapped. See the <code>fix_coverage</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type FixCoverageId = (typeof FixCoverageId)[keyof typeof FixCoverageId];

/** Label mapping for FixCoverageId values. */
export const FixCoverageIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
