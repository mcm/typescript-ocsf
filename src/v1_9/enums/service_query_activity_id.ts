/** ServiceQuery activity_id values. */
export const ServiceQueryActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ServiceQueryActivityId = (typeof ServiceQueryActivityId)[keyof typeof ServiceQueryActivityId];

export const ServiceQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};

export const ServiceQueryActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Query": 1,
  "Other": 99,
};
