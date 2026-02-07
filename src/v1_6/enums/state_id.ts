/** State ID values. */
export const StateId = {
  /** The state is unknown. */
  UNKNOWN: 0,
  /** The state is not mapped. See the <code>state</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type StateId = (typeof StateId)[keyof typeof StateId];

/** Label mapping for StateId values. */
export const StateIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
