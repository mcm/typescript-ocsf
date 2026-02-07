/** Type ID values. */
export const TypeId = {
  /** The type is unknown. */
  UNKNOWN: 0,
  /** The type is not mapped. See the <code>type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type TypeId = (typeof TypeId)[keyof typeof TypeId];

/** Label mapping for TypeId values. */
export const TypeIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
