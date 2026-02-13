/** AdminGroupQuery activity_id values. */
export const AdminGroupQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type AdminGroupQueryActivityId = (typeof AdminGroupQueryActivityId)[keyof typeof AdminGroupQueryActivityId];

export const AdminGroupQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
