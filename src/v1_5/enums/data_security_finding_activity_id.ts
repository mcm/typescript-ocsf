/** DataSecurityFinding activity_id values. */
export const DataSecurityFindingActivityId = {
  UNKNOWN: 0,
  /** A new Data Security finding is created. */
  CREATE: 1,
  /** An existing Data Security finding is updated with more information. */
  UPDATE: 2,
  /** An existing Data Security finding is closed, this can be due to any resolution (e.g., True Positive, False Positive, etc.). */
  CLOSE: 3,
  /** An existing Data Security finding is suppressed due to inaccurate detection techniques or a known true negative. */
  SUPPRESSED: 4,
  OTHER: 99,
} as const;

export type DataSecurityFindingActivityId = (typeof DataSecurityFindingActivityId)[keyof typeof DataSecurityFindingActivityId];

export const DataSecurityFindingActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  4: "Suppressed",
  99: "Other",
};
