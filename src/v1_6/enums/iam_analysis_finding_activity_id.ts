/** IamAnalysisFinding activity_id values. */
export const IamAnalysisFindingActivityId = {
  UNKNOWN: 0,
  /** A finding was created. */
  CREATE: 1,
  /** A finding was updated. */
  UPDATE: 2,
  /** A finding was closed. */
  CLOSE: 3,
  OTHER: 99,
} as const;

export type IamAnalysisFindingActivityId = (typeof IamAnalysisFindingActivityId)[keyof typeof IamAnalysisFindingActivityId];

export const IamAnalysisFindingActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  99: "Other",
};

export const IamAnalysisFindingActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Create": 1,
  "Update": 2,
  "Close": 3,
  "Other": 99,
};
