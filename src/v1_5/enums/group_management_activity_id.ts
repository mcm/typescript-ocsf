/** GroupManagement activity_id values. */
export const GroupManagementActivityId = {
  /** The event activity is unknown. */
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
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type GroupManagementActivityId = (typeof GroupManagementActivityId)[keyof typeof GroupManagementActivityId];

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

export const GroupManagementActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Assign Privileges": 1,
  "Revoke Privileges": 2,
  "Add User": 3,
  "Remove User": 4,
  "Delete": 5,
  "Create": 6,
  "Other": 99,
};
