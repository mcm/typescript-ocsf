/** UserInventory activity_id values. */
export const UserInventoryActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type UserInventoryActivityId = (typeof UserInventoryActivityId)[keyof typeof UserInventoryActivityId];

export const UserInventoryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};

export const UserInventoryActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Log": 1,
  "Collect": 2,
  "Other": 99,
};
