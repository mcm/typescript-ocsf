/** Encoding ID values. */
export const EncodingId = {
  /** The encoding method is unknown. */
  UNKNOWN: 0,
  /** The encoding method is not mapped. See the <code>encoding</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type EncodingId = (typeof EncodingId)[keyof typeof EncodingId];

/** Label mapping for EncodingId values. */
export const EncodingIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};

/** Reverse mapping from label to EncodingId value. */
export const EncodingIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Other": 99,
};
