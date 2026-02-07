/** Relationship ID values. */
export const RelationshipId = {
  /** The relationship is unknown. */
  UNKNOWN: 0,
  /** The component is a dependency of another component. Can be used to define both direct and transitive dependencies. */
  DEPENDS_ON: 1,
  /** The relationship is not mapped. See the <code>relationship</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RelationshipId = (typeof RelationshipId)[keyof typeof RelationshipId];

/** Label mapping for RelationshipId values. */
export const RelationshipIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Depends On",
  99: "Other",
};
