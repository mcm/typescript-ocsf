/** DeviceConfigStateChange state_id values. */
export const DeviceConfigStateChangeStateId = {
  /** The Config Change state is unknown. */
  UNKNOWN: 0,
  /** Config State Changed to Disabled. */
  DISABLED: 1,
  /** Config State Changed to Enabled. */
  ENABLED: 2,
  /** The Config Change is not mapped. See the <code>state</code> attribute, which contains data source specific values. */
  OTHER: 99,
} as const;

export type DeviceConfigStateChangeStateId = (typeof DeviceConfigStateChangeStateId)[keyof typeof DeviceConfigStateChangeStateId];

export const DeviceConfigStateChangeStateIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Disabled",
  2: "Enabled",
  99: "Other",
};

export const DeviceConfigStateChangeStateIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Disabled": 1,
  "Enabled": 2,
  "Other": 99,
};
