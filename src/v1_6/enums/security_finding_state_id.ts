/** SecurityFinding state_id values. */
export const SecurityFindingStateId = {
  /** The state is unknown. */
  UNKNOWN: 0,
  /** The finding is new and yet to be reviewed. */
  NEW: 1,
  /** The finding is under review. */
  IN_PROGRESS: 2,
  /** The finding was reviewed, considered as a false positive and is now suppressed. */
  SUPPRESSED: 3,
  /** The finding was reviewed and remediated and is now considered resolved. */
  RESOLVED: 4,
  /** The state is not mapped. See the <code>state</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type SecurityFindingStateId = (typeof SecurityFindingStateId)[keyof typeof SecurityFindingStateId];

export const SecurityFindingStateIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
  99: "Other",
};

export const SecurityFindingStateIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "New": 1,
  "In Progress": 2,
  "Suppressed": 3,
  "Resolved": 4,
  "Other": 99,
};
