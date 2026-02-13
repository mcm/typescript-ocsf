/** JobQuery activity_id values. */
export const JobQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type JobQueryActivityId = (typeof JobQueryActivityId)[keyof typeof JobQueryActivityId];

export const JobQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
