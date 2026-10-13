/** OsintInventoryInfo status_id values. */
export const OsintInventoryInfoStatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  /** The activity completed successfully. */
  SUCCESS: 1,
  /** The activity failed. */
  FAILURE: 2,
  /** The status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type OsintInventoryInfoStatusId = (typeof OsintInventoryInfoStatusId)[keyof typeof OsintInventoryInfoStatusId];

export const OsintInventoryInfoStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Success",
  2: "Failure",
  99: "Other",
};

export const OsintInventoryInfoStatusIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Success": 1,
  "Failure": 2,
  "Other": 99,
};
