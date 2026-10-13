/** ScheduledJobActivity activity_id values. */
export const ScheduledJobActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  ENABLE: 4,
  DISABLE: 5,
  START: 6,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ScheduledJobActivityActivityId = (typeof ScheduledJobActivityActivityId)[keyof typeof ScheduledJobActivityActivityId];

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

export const ScheduledJobActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Create": 1,
  "Update": 2,
  "Delete": 3,
  "Enable": 4,
  "Disable": 5,
  "Start": 6,
  "Other": 99,
};
