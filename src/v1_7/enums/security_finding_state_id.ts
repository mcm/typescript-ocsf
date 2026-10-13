/** SecurityFinding state_id values. */
export const SecurityFindingStateId = {
  /** The finding is new and yet to be reviewed. */
  NEW: 1,
  /** The finding is under review. */
  IN_PROGRESS: 2,
  /** The finding was reviewed, considered as a false positive and is now suppressed. */
  SUPPRESSED: 3,
  /** The finding was reviewed and remediated and is now considered resolved. */
  RESOLVED: 4,
} as const;

export type SecurityFindingStateId = (typeof SecurityFindingStateId)[keyof typeof SecurityFindingStateId];

export const SecurityFindingStateIdLabels: Record<number, string> = {
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
};

export const SecurityFindingStateIdByLabel: Record<string, number> = {
  "New": 1,
  "In Progress": 2,
  "Suppressed": 3,
  "Resolved": 4,
};
