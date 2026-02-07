/** Load Type ID values. */
export const LoadTypeId = {
  /** The load type is unknown. */
  UNKNOWN: 0,
  /** The load type is not mapped. See the <code>load_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type LoadTypeId = (typeof LoadTypeId)[keyof typeof LoadTypeId];

/** Label mapping for LoadTypeId values. */
export const LoadTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
