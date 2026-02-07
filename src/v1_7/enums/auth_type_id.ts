/** Authentication Type ID values. */
export const AuthTypeId = {
  /** The authentication type is unknown. */
  UNKNOWN: 0,
  /** The authentication type is not mapped. See the <code>auth_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AuthTypeId = (typeof AuthTypeId)[keyof typeof AuthTypeId];

/** Label mapping for AuthTypeId values. */
export const AuthTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
