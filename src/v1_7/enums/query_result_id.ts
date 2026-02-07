/** Query Result ID values. */
export const QueryResultId = {
  /** The query result is unknown. */
  UNKNOWN: 0,
  /** The target was found. */
  EXISTS: 1,
  /** The target was partially found. */
  PARTIAL: 2,
  /** The target was not found. */
  DOES_NOT_EXIST: 3,
  /** The discovery attempt failed. */
  ERROR: 4,
  /** Discovery of the target was not supported. */
  UNSUPPORTED: 5,
  /** The query result is not mapped. See the <code>query_result</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type QueryResultId = (typeof QueryResultId)[keyof typeof QueryResultId];

/** Label mapping for QueryResultId values. */
export const QueryResultIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Exists",
  2: "Partial",
  3: "Does not exist",
  4: "Error",
  5: "Unsupported",
  99: "Other",
};
