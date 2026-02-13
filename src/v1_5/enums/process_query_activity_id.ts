/** ProcessQuery activity_id values. */
export const ProcessQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type ProcessQueryActivityId = (typeof ProcessQueryActivityId)[keyof typeof ProcessQueryActivityId];

export const ProcessQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
