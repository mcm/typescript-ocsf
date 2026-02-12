/** ScanActivity activity_id values. */
export const ScanActivityActivityId = {
  UNKNOWN: 0,
  /** The scan was started. */
  STARTED: 1,
  /** The scan was completed. */
  COMPLETED: 2,
  /** The scan was cancelled. */
  CANCELLED: 3,
  /** The allocated scan time was insufficient to complete the requested scan. */
  DURATION_VIOLATION: 4,
  /** The scan was paused, either by the user or by program constraints (e.g. scans that are suspended during certain time intervals), and not resumed within the allotted time. */
  PAUSE_VIOLATION: 5,
  /** The scan could not be completed due to an internal error. */
  ERROR: 6,
  /** The scan was paused. */
  PAUSED: 7,
  /** The scan was resumed from the pause point. */
  RESUMED: 8,
  /** The scan restarted from the beginning of the file enumeration. */
  RESTARTED: 9,
  /** The user delayed the scan. */
  DELAYED: 10,
  OTHER: 99,
} as const;

export type ScanActivityActivityId = (typeof ScanActivityActivityId)[keyof typeof ScanActivityActivityId];

export const ScanActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Started",
  2: "Completed",
  3: "Cancelled",
  4: "Duration Violation",
  5: "Pause Violation",
  6: "Error",
  7: "Paused",
  8: "Resumed",
  9: "Restarted",
  10: "Delayed",
  99: "Other",
};
