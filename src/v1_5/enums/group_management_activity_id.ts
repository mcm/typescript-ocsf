/** GroupManagement activity_id values. */
export const GroupManagementActivityId = {
  UNKNOWN: 0,
  /** Assign privileges to a group. */
  ASSIGN_PRIVILEGES: 1,
  /** Revoke privileges from a group. */
  REVOKE_PRIVILEGES: 2,
  /** Add user to a group. */
  ADD_USER: 3,
  /** Remove user from a group. */
  REMOVE_USER: 4,
  /** A group was deleted. */
  DELETE: 5,
  /** A group was created. */
  CREATE: 6,
  OTHER: 99,
} as const;

export type GroupManagementActivityId =
  (typeof GroupManagementActivityId)[keyof typeof GroupManagementActivityId];

export const GroupManagementActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Assign Privileges",
  2: "Revoke Privileges",
  3: "Add User",
  4: "Remove User",
  5: "Delete",
  6: "Create",
  99: "Other",
};
