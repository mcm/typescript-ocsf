/** Severity ID values. */
export const SeverityId = {
  /** The event/finding severity is unknown. */
  UNKNOWN: 0,
  /** Informational message. No action required. */
  INFORMATIONAL: 1,
  /** The user decides if action is needed. */
  LOW: 2,
  /** Action is required but the situation is not serious at this time. */
  MEDIUM: 3,
  /** Action is required immediately. */
  HIGH: 4,
  /** Action is required immediately and the scope is broad. */
  CRITICAL: 5,
  /** An error occurred but it is too late to take remedial action. */
  FATAL: 6,
  /** The event/finding severity is not mapped. See the <code>severity</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type SeverityId = (typeof SeverityId)[keyof typeof SeverityId];

/** Label mapping for SeverityId values. */
export const SeverityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Informational",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Critical",
  6: "Fatal",
  99: "Other",
};
