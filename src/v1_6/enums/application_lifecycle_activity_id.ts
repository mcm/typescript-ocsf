/** ApplicationLifecycle activity_id values. */
export const ApplicationLifecycleActivityId = {
  UNKNOWN: 0,
  /** Install the application. */
  INSTALL: 1,
  /** Remove the application. */
  REMOVE: 2,
  /** Start the application. */
  START: 3,
  /** Stop the application. */
  STOP: 4,
  /** Restart the application. */
  RESTART: 5,
  /** Enable the application. */
  ENABLE: 6,
  /** Disable the application. */
  DISABLE: 7,
  /** Update the application. */
  UPDATE: 8,
  OTHER: 99,
} as const;

export type ApplicationLifecycleActivityId = (typeof ApplicationLifecycleActivityId)[keyof typeof ApplicationLifecycleActivityId];

export const ApplicationLifecycleActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Install",
  2: "Remove",
  3: "Start",
  4: "Stop",
  5: "Restart",
  6: "Enable",
  7: "Disable",
  8: "Update",
  99: "Other",
};

export const ApplicationLifecycleActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Install": 1,
  "Remove": 2,
  "Start": 3,
  "Stop": 4,
  "Restart": 5,
  "Enable": 6,
  "Disable": 7,
  "Update": 8,
  "Other": 99,
};
