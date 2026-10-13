/** Format ID values. */
export const FormatId = {
  /** The format is unknown. */
  UNKNOWN: 0,
  /** The format is not mapped. See the <code>format</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type FormatId = (typeof FormatId)[keyof typeof FormatId];

/** Label mapping for FormatId values. */
export const FormatIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};

/** Reverse mapping from label to FormatId value. */
export const FormatIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Other": 99,
};
