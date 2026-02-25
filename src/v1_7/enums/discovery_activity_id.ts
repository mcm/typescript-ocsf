/** Discovery activity_id values. */
export const DiscoveryActivityId = {
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  OTHER: 99,
} as const;

export type DiscoveryActivityId = (typeof DiscoveryActivityId)[keyof typeof DiscoveryActivityId];

export const DiscoveryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};

export const DiscoveryActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Log": 1,
  "Collect": 2,
  "Other": 99,
};
