/** EventLogActvity activity_id values. */
export const EventLogActvityActivityId = {
  UNKNOWN: 0,
  /** Clear the event log database, file, or cache. */
  CLEAR: 1,
  /** Delete the event log database, file, or cache. */
  DELETE: 2,
  /** Export the event log database, file, or cache. */
  EXPORT: 3,
  /** Archive the event log database, file, or cache. */
  ARCHIVE: 4,
  /** Rotate the event log database, file, or cache. */
  ROTATE: 5,
  /** Start the event logging service. */
  START: 6,
  /** Stop the event logging service. */
  STOP: 7,
  /** Restart the event logging service. */
  RESTART: 8,
  /** Enable the event logging service. */
  ENABLE: 9,
  /** Disable the event logging service. */
  DISABLE: 10,
  OTHER: 99,
} as const;

export type EventLogActvityActivityId =
  (typeof EventLogActvityActivityId)[keyof typeof EventLogActvityActivityId];

export const EventLogActvityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Clear",
  2: "Delete",
  3: "Export",
  4: "Archive",
  5: "Rotate",
  6: "Start",
  7: "Stop",
  8: "Restart",
  9: "Enable",
  10: "Disable",
  99: "Other",
};
