/** Risk Level ID values. */
export const RiskLevelId = {
  INFO: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
  /** The risk level is not mapped. See the <code>risk_level</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RiskLevelId = (typeof RiskLevelId)[keyof typeof RiskLevelId];

/** Label mapping for RiskLevelId values. */
export const RiskLevelIdLabels: Record<number, string> = {
  0: "Info",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  99: "Other",
};

/** Reverse mapping from label to RiskLevelId value. */
export const RiskLevelIdByLabel: Record<string, number> = {
  "Info": 0,
  "Low": 1,
  "Medium": 2,
  "High": 3,
  "Critical": 4,
  "Other": 99,
};
