/** StartupItemQuery activity_id values. */
export const StartupItemQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type StartupItemQueryActivityId = (typeof StartupItemQueryActivityId)[keyof typeof StartupItemQueryActivityId];

export const StartupItemQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
