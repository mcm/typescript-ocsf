/** ScheduledJobActivity activity_id values. */
export const ScheduledJobActivityActivityId = {
  UNKNOWN: 0,
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  ENABLE: 4,
  DISABLE: 5,
  START: 6,
  OTHER: 99,
} as const;

export type ScheduledJobActivityActivityId =
  (typeof ScheduledJobActivityActivityId)[keyof typeof ScheduledJobActivityActivityId];

export const ScheduledJobActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Delete",
  4: "Enable",
  5: "Disable",
  6: "Start",
  99: "Other",
};
