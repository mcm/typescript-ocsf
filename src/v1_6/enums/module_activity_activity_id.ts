/** ModuleActivity activity_id values. */
export const ModuleActivityActivityId = {
  UNKNOWN: 0,
  LOAD: 1,
  UNLOAD: 2,
  OTHER: 99,
} as const;

export type ModuleActivityActivityId = (typeof ModuleActivityActivityId)[keyof typeof ModuleActivityActivityId];

export const ModuleActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Load",
  2: "Unload",
  99: "Other",
};

export const ModuleActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Load": 1,
  "Unload": 2,
  "Other": 99,
};
