/** UserAccess activity_id values. */
export const UserAccessActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Assign privileges to a user. */
  ASSIGN_PRIVILEGES: 1,
  /** Revoke privileges from a user. */
  REVOKE_PRIVILEGES: 2,
  /** Assign a role to a user. */
  ASSIGN_ROLE: 3,
  /** Remove a role from a user. */
  REMOVE_ROLE: 4,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type UserAccessActivityId = (typeof UserAccessActivityId)[keyof typeof UserAccessActivityId];

export const UserAccessActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Assign Privileges",
  2: "Revoke Privileges",
  3: "Assign Role",
  4: "Remove Role",
  99: "Other",
};

export const UserAccessActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Assign Privileges": 1,
  "Revoke Privileges": 2,
  "Assign Role": 3,
  "Remove Role": 4,
  "Other": 99,
};
