/** Role ID values. */
export const RoleId = {
  /** The role is unknown. */
  UNKNOWN: 0,
  /** The role is not mapped. See the role attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RoleId = (typeof RoleId)[keyof typeof RoleId];

/** Label mapping for RoleId values. */
export const RoleIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};

/** Reverse mapping from label to RoleId value. */
export const RoleIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Other": 99,
};
