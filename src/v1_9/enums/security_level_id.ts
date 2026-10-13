/** Security Level ID values. */
export const SecurityLevelId = {
  UNKNOWN: 0,
  SECURE: 1,
  AT_RISK: 2,
  COMPROMISED: 3,
  /** The security level is not mapped. See the <code>security_level</code> attribute, which contains data source specific values. */
  OTHER: 99,
} as const;

export type SecurityLevelId = (typeof SecurityLevelId)[keyof typeof SecurityLevelId];

/** Label mapping for SecurityLevelId values. */
export const SecurityLevelIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Secure",
  2: "At Risk",
  3: "Compromised",
  99: "Other",
};

/** Reverse mapping from label to SecurityLevelId value. */
export const SecurityLevelIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Secure": 1,
  "At Risk": 2,
  "Compromised": 3,
  "Other": 99,
};
