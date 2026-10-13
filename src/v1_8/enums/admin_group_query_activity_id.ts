/** AdminGroupQuery activity_id values. */
export const AdminGroupQueryActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AdminGroupQueryActivityId = (typeof AdminGroupQueryActivityId)[keyof typeof AdminGroupQueryActivityId];

export const AdminGroupQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};

export const AdminGroupQueryActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Query": 1,
  "Other": 99,
};
