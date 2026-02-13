/** UserInventory activity_id values. */
export const UserInventoryActivityId = {
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  OTHER: 99,
} as const;

export type UserInventoryActivityId = (typeof UserInventoryActivityId)[keyof typeof UserInventoryActivityId];

export const UserInventoryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};
