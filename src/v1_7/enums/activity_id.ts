/** Activity ID values. */
export const ActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ActivityId = (typeof ActivityId)[keyof typeof ActivityId];

/** Label mapping for ActivityId values. */
export const ActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
