/** Network Scope ID values. */
export const NetworkScopeId = {
  /** Unknown whether this endpoint resides within the customer’s network. */
  UNKNOWN: 0,
  /** The endpoint resides inside the customer’s network. */
  INTERNAL: 1,
  /** The endpoint is on the Internet or otherwise external to the customer’s network. */
  EXTERNAL: 2,
  /** The network scope is not mapped. See the <code>network_scope</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type NetworkScopeId = (typeof NetworkScopeId)[keyof typeof NetworkScopeId];

/** Label mapping for NetworkScopeId values. */
export const NetworkScopeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Internal",
  2: "External",
  99: "Other",
};
