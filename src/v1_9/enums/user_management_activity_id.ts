/** UserManagement activity_id values. */
export const UserManagementActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Create a user. Populate the <code>user</code> object with details of the user. */
  CREATE: 1,
  /** Update the user. The updated user details should be populated in the <code>updated_user</code> attribute. */
  UPDATE: 2,
  /** Delete the user. */
  DELETE: 3,
  /** Enable the user. */
  ENABLE: 4,
  /** Disable the user. */
  DISABLE: 5,
  /** Lock out the user. */
  LOCK: 6,
  /** Unlock a previously locked out user. */
  UNLOCK: 7,
  /** An attempt to change the user's password. */
  PASSWORD_CHANGE: 8,
  /** An attempt to reset the user's password. */
  PASSWORD_RESET: 9,
  /** Attach one or more IAM Policies to the user. Use <code>policies</code> as policies to be attached. */
  ATTACH_POLICIES: 10,
  /** Detach one or more IAM Policies from the user. Use <code>policies</code> as policies to be detached. */
  DETACH_POLICIES: 11,
  /** Enable one or more authentication factors for the user. Use <code>auth_factors</code> as factors to be enabled. */
  ENABLE_MFA_FACTORS: 12,
  /** Disable one or more authentication factors for the user. Use <code>auth_factors</code> as factors to be disabled. */
  DISABLE_MFA_FACTORS: 13,
  /** Assign privileges to the user. Use <code>privileges</code> as privileges to be assigned. */
  ASSIGN_PRIVILEGES: 14,
  /** Remove privileges from the user. Use <code>privileges</code> as privileges to be removed. */
  REMOVE_PRIVILEGES: 15,
  /** Assign one or more roles to the user. Use <code>iam_roles</code> as roles to be assigned. */
  ASSIGN_ROLES: 16,
  /** Remove one or more roles from the user. Use <code>iam_roles</code> as roles to be removed. */
  REMOVE_ROLES: 17,
  /** Add credentials to a role. Use <code>programmatic_credentials</code> as credentials to be added. */
  ADD_PROGRAMMATIC_CREDENTIALS: 18,
  /** Remove credentials from a role. Use <code>programmatic_credentials</code> as credentials to be removed. */
  REMOVE_PROGRAMMATIC_CREDENTIALS: 19,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type UserManagementActivityId = (typeof UserManagementActivityId)[keyof typeof UserManagementActivityId];

export const UserManagementActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Delete",
  4: "Enable",
  5: "Disable",
  6: "Lock",
  7: "Unlock",
  8: "Password Change",
  9: "Password Reset",
  10: "Attach Policies",
  11: "Detach Policies",
  12: "Enable MFA Factors",
  13: "Disable MFA Factors",
  14: "Assign Privileges",
  15: "Remove Privileges",
  16: "Assign Roles",
  17: "Remove Roles",
  18: "Add Programmatic Credentials",
  19: "Remove Programmatic Credentials",
  99: "Other",
};

export const UserManagementActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Create": 1,
  "Update": 2,
  "Delete": 3,
  "Enable": 4,
  "Disable": 5,
  "Lock": 6,
  "Unlock": 7,
  "Password Change": 8,
  "Password Reset": 9,
  "Attach Policies": 10,
  "Detach Policies": 11,
  "Enable MFA Factors": 12,
  "Disable MFA Factors": 13,
  "Assign Privileges": 14,
  "Remove Privileges": 15,
  "Assign Roles": 16,
  "Remove Roles": 17,
  "Add Programmatic Credentials": 18,
  "Remove Programmatic Credentials": 19,
  "Other": 99,
};
