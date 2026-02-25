/** ProcessActivity activity_id values. */
export const ProcessActivityActivityId = {
  UNKNOWN: 0,
  LAUNCH: 1,
  TERMINATE: 2,
  OPEN: 3,
  INJECT: 4,
  SET_USER_ID: 5,
  OTHER: 99,
} as const;

export type ProcessActivityActivityId = (typeof ProcessActivityActivityId)[keyof typeof ProcessActivityActivityId];

export const ProcessActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Launch",
  2: "Terminate",
  3: "Open",
  4: "Inject",
  5: "Set User ID",
  99: "Other",
};

export const ProcessActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Launch": 1,
  "Terminate": 2,
  "Open": 3,
  "Inject": 4,
  "Set User ID": 5,
  "Other": 99,
};
