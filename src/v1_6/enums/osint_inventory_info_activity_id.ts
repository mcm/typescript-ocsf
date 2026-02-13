/** OsintInventoryInfo activity_id values. */
export const OsintInventoryInfoActivityId = {
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  OTHER: 99,
} as const;

export type OsintInventoryInfoActivityId = (typeof OsintInventoryInfoActivityId)[keyof typeof OsintInventoryInfoActivityId];

export const OsintInventoryInfoActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};
