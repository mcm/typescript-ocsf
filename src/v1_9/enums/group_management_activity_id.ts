/** GroupManagement activity_id values. */
export const GroupManagementActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Assign privileges to the group. Use <code>privileges</code> as privileges to be assigned. */
  ASSIGN_PRIVILEGES: 1,
  /** Revoke privileges from the group. Use <code>privileges</code> as privileges to be revoked. */
  REVOKE_PRIVILEGES: 2,
  /** Add a user or users to the group. Use <code>users</code> for the users to be added. */
  ADD_USER: 3,
  /** Remove a user or users from the group. Use <code>users</code> for the users to be removed. */
  REMOVE_USER: 4,
  /** Delete the group. */
  DELETE: 5,
  /** Create a group. Populate the <code>group</code> object with details of the group to be created. */
  CREATE: 6,
  /** Add a subgroup to the group. Use <code>sub_group</code> as the subgroup to be added. */
  ADD_SUBGROUP: 7,
  /** Remove a subgroup from the group. Use <code>sub_group</code> as the subgroup to be removed. */
  REMOVE_SUBGROUP: 8,
  /** Update the group. The updated group details should be populated in the <code>updated_group</code> attribute. */
  UPDATE: 9,
  /** Attach one or more IAM Policies to the group. Use <code>policies</code> as policies to be attached. */
  ATTACH_POLICIES: 10,
  /** Detach one or more IAM Policies from the group. Use <code>policies</code> as policies to be detached. */
  DETACH_POLICIES: 11,
  /** Assign one or more roles to the group. Use <code>iam_roles</code> for the specific roles to be assigned. */
  ASSIGN_ROLES: 12,
  /** Remove one or more roles from the group. Use <code>iam_roles</code> for the specific roles to be removed. */
  REMOVE_ROLES: 13,
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
  7: "Add Subgroup",
  8: "Remove Subgroup",
  9: "Update",
  10: "Attach Policies",
  11: "Detach Policies",
  12: "Assign Roles",
  13: "Remove Roles",
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
  "Add Subgroup": 7,
  "Remove Subgroup": 8,
  "Update": 9,
  "Attach Policies": 10,
  "Detach Policies": 11,
  "Assign Roles": 12,
  "Remove Roles": 13,
  "Other": 99,
};
