/** Confidentiality ID values. */
export const ConfidentialityId = {
  /** The confidentiality is unknown. */
  UNKNOWN: 0,
  NOT_CONFIDENTIAL: 1,
  CONFIDENTIAL: 2,
  SECRET: 3,
  TOP_SECRET: 4,
  PRIVATE: 5,
  RESTRICTED: 6,
  /** The confidentiality is not mapped. See the <code>confidentiality</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ConfidentialityId = (typeof ConfidentialityId)[keyof typeof ConfidentialityId];

/** Label mapping for ConfidentialityId values. */
export const ConfidentialityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Not Confidential",
  2: "Confidential",
  3: "Secret",
  4: "Top Secret",
  5: "Private",
  6: "Restricted",
  99: "Other",
};
