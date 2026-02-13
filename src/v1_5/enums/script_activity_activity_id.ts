/** ScriptActivity activity_id values. */
export const ScriptActivityActivityId = {
  UNKNOWN: 0,
  EXECUTE: 1,
  OTHER: 99,
} as const;

export type ScriptActivityActivityId = (typeof ScriptActivityActivityId)[keyof typeof ScriptActivityActivityId];

export const ScriptActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Execute",
  99: "Other",
};
