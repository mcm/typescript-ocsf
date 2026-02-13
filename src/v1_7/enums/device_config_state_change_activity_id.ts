/** DeviceConfigStateChange activity_id values. */
export const DeviceConfigStateChangeActivityId = {
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  OTHER: 99,
} as const;

export type DeviceConfigStateChangeActivityId = (typeof DeviceConfigStateChangeActivityId)[keyof typeof DeviceConfigStateChangeActivityId];

export const DeviceConfigStateChangeActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};
