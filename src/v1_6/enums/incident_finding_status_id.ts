/** IncidentFinding status_id values. */
export const IncidentFindingStatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  /** The service desk has received the incident but has not assigned it to an agent. */
  NEW: 1,
  /** The incident has been assigned to an agent but has not been resolved. The agent is actively working with the user to diagnose and resolve the incident. */
  IN_PROGRESS: 2,
  /** The incident requires some information or response from the user or from a third party. */
  ON_HOLD: 3,
  /** The service desk has confirmed that the incident is resolved. */
  RESOLVED: 4,
  /** The incident is resolved and no further action is necessary. */
  CLOSED: 5,
  /** The status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type IncidentFindingStatusId = (typeof IncidentFindingStatusId)[keyof typeof IncidentFindingStatusId];

export const IncidentFindingStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "New",
  2: "In Progress",
  3: "On Hold",
  4: "Resolved",
  5: "Closed",
  99: "Other",
};

export const IncidentFindingStatusIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "New": 1,
  "In Progress": 2,
  "On Hold": 3,
  "Resolved": 4,
  "Closed": 5,
  "Other": 99,
};
