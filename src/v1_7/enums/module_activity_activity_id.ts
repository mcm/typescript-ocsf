/** ModuleActivity activity_id values. */
export const ModuleActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** The target module was loaded. */
  LOAD: 1,
  /** The target module was unloaded. */
  UNLOAD: 2,
  /** A function exported from the target module was invoked. */
  INVOKE: 3,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ModuleActivityActivityId = (typeof ModuleActivityActivityId)[keyof typeof ModuleActivityActivityId];

export const ModuleActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Load",
  2: "Unload",
  3: "Invoke",
  99: "Other",
};

export const ModuleActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Load": 1,
  "Unload": 2,
  "Invoke": 3,
  "Other": 99,
};
