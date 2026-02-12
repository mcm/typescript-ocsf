/** SecurityFinding activity_id values. */
export const SecurityFindingActivityId = {
  UNKNOWN: 0,
  /** A security finding was created. */
  CREATE: 1,
  /** A security finding was updated. */
  UPDATE: 2,
  /** A security finding was closed. */
  CLOSE: 3,
  OTHER: 99,
} as const;

export type SecurityFindingActivityId = (typeof SecurityFindingActivityId)[keyof typeof SecurityFindingActivityId];

export const SecurityFindingActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  99: "Other",
};
