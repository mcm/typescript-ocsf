/** Source ID values. */
export const SourceId = {
  /** The source is unknown. */
  UNKNOWN: 0,
  /** The source is not mapped. See the <code>source</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type SourceId = (typeof SourceId)[keyof typeof SourceId];

/** Label mapping for SourceId values. */
export const SourceIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};

/** Reverse mapping from label to SourceId value. */
export const SourceIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Other": 99,
};
