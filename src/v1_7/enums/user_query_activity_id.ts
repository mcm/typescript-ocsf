/** UserQuery activity_id values. */
export const UserQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type UserQueryActivityId = (typeof UserQueryActivityId)[keyof typeof UserQueryActivityId];

export const UserQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
