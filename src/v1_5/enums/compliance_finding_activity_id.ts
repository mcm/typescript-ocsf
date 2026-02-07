/** ComplianceFinding activity_id values. */
export const ComplianceFindingActivityId = {
  UNKNOWN: 0,
  /** A finding was created. */
  CREATE: 1,
  /** A finding was updated. */
  UPDATE: 2,
  /** A finding was closed. */
  CLOSE: 3,
  OTHER: 99,
} as const;

export type ComplianceFindingActivityId =
  (typeof ComplianceFindingActivityId)[keyof typeof ComplianceFindingActivityId];

export const ComplianceFindingActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  99: "Other",
};
