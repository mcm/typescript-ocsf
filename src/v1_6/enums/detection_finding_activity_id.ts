/** DetectionFinding activity_id values. */
export const DetectionFindingActivityId = {
  UNKNOWN: 0,
  /** A finding was created. */
  CREATE: 1,
  /** A finding was updated. */
  UPDATE: 2,
  /** A finding was closed. */
  CLOSE: 3,
  OTHER: 99,
} as const;

export type DetectionFindingActivityId =
  (typeof DetectionFindingActivityId)[keyof typeof DetectionFindingActivityId];

export const DetectionFindingActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  99: "Other",
};
