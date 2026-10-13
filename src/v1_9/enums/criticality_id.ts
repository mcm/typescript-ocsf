/** Criticality Level ID values. */
export const CriticalityId = {
  /** The criticality level is unknown. */
  UNKNOWN: 0,
  /** Minimal operational or security importance. */
  LOW: 1,
  /** Affects localized functions or specific business processes. */
  MEDIUM: 2,
  /** Critical to core operations. Compromise leads to significant, but recoverable disruptions. */
  HIGH: 3,
  /** Mission critical, essential to business survival. Compromise could result in catastrophic consequences. */
  VERY_HIGH: 4,
  /** The criticality level is not mapped. See the <code>criticality</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type CriticalityId = (typeof CriticalityId)[keyof typeof CriticalityId];

/** Label mapping for CriticalityId values. */
export const CriticalityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Very High",
  99: "Other",
};

/** Reverse mapping from label to CriticalityId value. */
export const CriticalityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Low": 1,
  "Medium": 2,
  "High": 3,
  "Very High": 4,
  "Other": 99,
};
