/** NetworkConnectionQuery activity_id values. */
export const NetworkConnectionQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type NetworkConnectionQueryActivityId = (typeof NetworkConnectionQueryActivityId)[keyof typeof NetworkConnectionQueryActivityId];

export const NetworkConnectionQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
