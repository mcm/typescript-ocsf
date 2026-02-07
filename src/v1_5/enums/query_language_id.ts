/** Query Language ID values. */
export const QueryLanguageId = {
  /** The Query Language is unknown. */
  UNKNOWN: 0,
  /** The Query Language is not mapped. See the <code>query_language</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type QueryLanguageId = (typeof QueryLanguageId)[keyof typeof QueryLanguageId];

/** Label mapping for QueryLanguageId values. */
export const QueryLanguageIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
