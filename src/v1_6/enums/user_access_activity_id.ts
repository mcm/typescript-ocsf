/** UserAccess activity_id values. */
export const UserAccessActivityId = {
  UNKNOWN: 0,
  /** Assign privileges to a user. */
  ASSIGN_PRIVILEGES: 1,
  /** Revoke privileges from a user. */
  REVOKE_PRIVILEGES: 2,
  OTHER: 99,
} as const;

export type UserAccessActivityId = (typeof UserAccessActivityId)[keyof typeof UserAccessActivityId];

export const UserAccessActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Assign Privileges",
  2: "Revoke Privileges",
  99: "Other",
};
