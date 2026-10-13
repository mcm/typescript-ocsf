/** Action ID values. */
export const ActionId = {
  /** The action was unknown. */
  UNKNOWN: 0,
  /** The activity was allowed. */
  ALLOWED: 1,
  /** The attempted activity was denied. */
  DENIED: 2,
  /** The action was not mapped. See the <code>action</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ActionId = (typeof ActionId)[keyof typeof ActionId];

/** Label mapping for ActionId values. */
export const ActionIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Allowed",
  2: "Denied",
  99: "Other",
};

/** Reverse mapping from label to ActionId value. */
export const ActionIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Allowed": 1,
  "Denied": 2,
  "Other": 99,
};
