/** ModuleQuery activity_id values. */
export const ModuleQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type ModuleQueryActivityId = (typeof ModuleQueryActivityId)[keyof typeof ModuleQueryActivityId];

export const ModuleQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
