/** ServiceQuery activity_id values. */
export const ServiceQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type ServiceQueryActivityId = (typeof ServiceQueryActivityId)[keyof typeof ServiceQueryActivityId];

export const ServiceQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
