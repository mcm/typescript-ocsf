/** IncidentFinding activity_id values. */
export const IncidentFindingActivityId = {
  UNKNOWN: 0,
  /** Reports the creation of an Incident. */
  CREATE: 1,
  /** Reports updates to an Incident. */
  UPDATE: 2,
  /** Reports closure of an Incident . */
  CLOSE: 3,
  OTHER: 99,
} as const;

export type IncidentFindingActivityId = (typeof IncidentFindingActivityId)[keyof typeof IncidentFindingActivityId];

export const IncidentFindingActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  99: "Other",
};

export const IncidentFindingActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Create": 1,
  "Update": 2,
  "Close": 3,
  "Other": 99,
};
