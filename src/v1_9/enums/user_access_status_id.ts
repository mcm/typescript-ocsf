/** UserAccess status_id values. */
export const UserAccessStatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  /** The activity completed successfully. */
  SUCCESS: 1,
  /** The activity failed. */
  FAILURE: 2,
  /** The status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type UserAccessStatusId = (typeof UserAccessStatusId)[keyof typeof UserAccessStatusId];

export const UserAccessStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Success",
  2: "Failure",
  99: "Other",
};

export const UserAccessStatusIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Success": 1,
  "Failure": 2,
  "Other": 99,
};
