/** DiscoveryResult activity_id values. */
export const DiscoveryResultActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type DiscoveryResultActivityId = (typeof DiscoveryResultActivityId)[keyof typeof DiscoveryResultActivityId];

export const DiscoveryResultActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
