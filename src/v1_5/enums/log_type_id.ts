/** Log Type ID values. */
export const LogTypeId = {
  /** The log type is unknown. */
  UNKNOWN: 0,
  /** The log type is an Operating System log. */
  OS: 1,
  /** The log type is an Application log. */
  APPLICATION: 2,
  /** The log type is not mapped. See the <code>log_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type LogTypeId = (typeof LogTypeId)[keyof typeof LogTypeId];

/** Label mapping for LogTypeId values. */
export const LogTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "OS",
  2: "Application",
  99: "Other",
};
