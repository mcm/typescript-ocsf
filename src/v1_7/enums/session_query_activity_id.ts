/** SessionQuery activity_id values. */
export const SessionQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type SessionQueryActivityId = (typeof SessionQueryActivityId)[keyof typeof SessionQueryActivityId];

export const SessionQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
