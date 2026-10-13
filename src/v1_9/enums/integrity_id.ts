/** Integrity Level values. */
export const IntegrityId = {
  /** The integrity level is unknown. */
  UNKNOWN: 0,
  UNTRUSTED: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
  SYSTEM: 5,
  PROTECTED: 6,
  /** The integrity level is not mapped. See the <code>integrity</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type IntegrityId = (typeof IntegrityId)[keyof typeof IntegrityId];

/** Label mapping for IntegrityId values. */
export const IntegrityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Untrusted",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "System",
  6: "Protected",
  99: "Other",
};

/** Reverse mapping from label to IntegrityId value. */
export const IntegrityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Untrusted": 1,
  "Low": 2,
  "Medium": 3,
  "High": 4,
  "System": 5,
  "Protected": 6,
  "Other": 99,
};
