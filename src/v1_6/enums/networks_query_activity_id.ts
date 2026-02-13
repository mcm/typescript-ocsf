/** NetworksQuery activity_id values. */
export const NetworksQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type NetworksQueryActivityId = (typeof NetworksQueryActivityId)[keyof typeof NetworksQueryActivityId];

export const NetworksQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
