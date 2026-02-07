/** Injection Type ID values. */
export const InjectionTypeId = {
  /** The injection type is unknown. */
  UNKNOWN: 0,
  REMOTE_THREAD: 1,
  LOAD_LIBRARY: 2,
  QUEUE_APC: 3,
  /** The injection type is not mapped. See the <code>injection_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type InjectionTypeId = (typeof InjectionTypeId)[keyof typeof InjectionTypeId];

/** Label mapping for InjectionTypeId values. */
export const InjectionTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Remote Thread",
  2: "Load Library",
  3: "Queue APC",
  99: "Other",
};
