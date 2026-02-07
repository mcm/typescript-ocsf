/** Run State ID values. */
export const RunStateId = {
  /** The run state is unknown. */
  UNKNOWN: 0,
  /** The run state is not mapped. See the <code>run_state</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RunStateId = (typeof RunStateId)[keyof typeof RunStateId];

/** Label mapping for RunStateId values. */
export const RunStateIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
