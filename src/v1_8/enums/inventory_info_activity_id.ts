/** InventoryInfo activity_id values. */
export const InventoryInfoActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type InventoryInfoActivityId = (typeof InventoryInfoActivityId)[keyof typeof InventoryInfoActivityId];

export const InventoryInfoActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};

export const InventoryInfoActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Log": 1,
  "Collect": 2,
  "Other": 99,
};
