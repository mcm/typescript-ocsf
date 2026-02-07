/** Share Type ID values. */
export const ShareTypeId = {
  /** The share type is unknown. */
  UNKNOWN: 0,
  FILE: 1,
  PIPE: 2,
  PRINT: 3,
  /** The share type is not mapped. See the <code>share_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ShareTypeId = (typeof ShareTypeId)[keyof typeof ShareTypeId];

/** Label mapping for ShareTypeId values. */
export const ShareTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "File",
  2: "Pipe",
  3: "Print",
  99: "Other",
};
