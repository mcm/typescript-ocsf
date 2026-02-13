/** EvidenceInfo activity_id values. */
export const EvidenceInfoActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type EvidenceInfoActivityId = (typeof EvidenceInfoActivityId)[keyof typeof EvidenceInfoActivityId];

export const EvidenceInfoActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
