/** AuthorizeSession activity_id values. */
export const AuthorizeSessionActivityId = {
  UNKNOWN: 0,
  /** Assign special privileges to a new logon. */
  ASSIGN_PRIVILEGES: 1,
  /** Assign special groups to a new logon. */
  ASSIGN_GROUPS: 2,
  OTHER: 99,
} as const;

export type AuthorizeSessionActivityId = (typeof AuthorizeSessionActivityId)[keyof typeof AuthorizeSessionActivityId];

export const AuthorizeSessionActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Assign Privileges",
  2: "Assign Groups",
  99: "Other",
};
