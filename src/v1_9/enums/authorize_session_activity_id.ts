/** AuthorizeSession activity_id values. */
export const AuthorizeSessionActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Assign special privileges to a new logon. */
  ASSIGN_PRIVILEGES: 1,
  /** Assign special groups to a new logon. */
  ASSIGN_GROUPS: 2,
  /** Assign special roles to a new logon. */
  ASSIGN_ROLES: 3,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AuthorizeSessionActivityId = (typeof AuthorizeSessionActivityId)[keyof typeof AuthorizeSessionActivityId];

export const AuthorizeSessionActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Assign Privileges",
  2: "Assign Groups",
  3: "Assign Roles",
  99: "Other",
};

export const AuthorizeSessionActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Assign Privileges": 1,
  "Assign Groups": 2,
  "Assign Roles": 3,
  "Other": 99,
};
