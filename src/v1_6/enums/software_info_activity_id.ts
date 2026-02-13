/** SoftwareInfo activity_id values. */
export const SoftwareInfoActivityId = {
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  OTHER: 99,
} as const;

export type SoftwareInfoActivityId = (typeof SoftwareInfoActivityId)[keyof typeof SoftwareInfoActivityId];

export const SoftwareInfoActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};
