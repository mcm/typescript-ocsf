/** Finding status_id values. */
export const FindingStatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  /** The Finding is new and yet to be reviewed. */
  NEW: 1,
  /** The Finding is under review. */
  IN_PROGRESS: 2,
  /** The Finding was reviewed, determined to be benign or a false positive and is now suppressed. */
  SUPPRESSED: 3,
  /** The Finding was reviewed, remediated and is now considered resolved. */
  RESOLVED: 4,
  /** The Finding was archived. */
  ARCHIVED: 5,
  /** The Finding was deleted. For example, it might have been created in error. */
  DELETED: 6,
  /** The status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type FindingStatusId = (typeof FindingStatusId)[keyof typeof FindingStatusId];

export const FindingStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
  5: "Archived",
  6: "Deleted",
  99: "Other",
};

export const FindingStatusIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "New": 1,
  "In Progress": 2,
  "Suppressed": 3,
  "Resolved": 4,
  "Archived": 5,
  "Deleted": 6,
  "Other": 99,
};
