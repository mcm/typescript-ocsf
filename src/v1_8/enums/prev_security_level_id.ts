/** Previous Security Level ID values. */
export const PrevSecurityLevelId = {
  UNKNOWN: 0,
  SECURE: 1,
  AT_RISK: 2,
  COMPROMISED: 3,
  /** The security level is not mapped. See the <code>prev_security_level</code> attribute, which contains data source specific values. */
  OTHER: 99,
} as const;

export type PrevSecurityLevelId = (typeof PrevSecurityLevelId)[keyof typeof PrevSecurityLevelId];

/** Label mapping for PrevSecurityLevelId values. */
export const PrevSecurityLevelIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Secure",
  2: "At Risk",
  3: "Compromised",
  99: "Other",
};

/** Reverse mapping from label to PrevSecurityLevelId value. */
export const PrevSecurityLevelIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Secure": 1,
  "At Risk": 2,
  "Compromised": 3,
  "Other": 99,
};
