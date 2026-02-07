/** Status ID values. */
export const StatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  SUCCESS: 1,
  FAILURE: 2,
  /** The event status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type StatusId = (typeof StatusId)[keyof typeof StatusId];

/** Label mapping for StatusId values. */
export const StatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Success",
  2: "Failure",
  99: "Other",
};
