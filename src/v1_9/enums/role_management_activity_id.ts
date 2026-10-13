/** RoleManagement activity_id values. */
export const RoleManagementActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Create a role. Use <code>iam_role</code> as the role to be created. */
  CREATE: 1,
  /** Update a role. The updated role details should be populated in the <code>updated_role</code> attribute. */
  UPDATE: 2,
  /** Delete a role. Use <code>iam_role</code> as the role to be deleted. */
  DELETE: 3,
  /** Assign privileges to a role. Use <code>privileges</code> to be assigned to <code>iam_role</code>. */
  ASSIGN_PRIVILEGES: 4,
  /** Remove privileges from a role. Use <code>privileges</code> to be removed from <code>iam_role</code>. */
  REMOVE_PRIVILEGES: 5,
  /** Assign resources to a role. Use <code>resources</code> to be assigned to <code>iam_role</code>. */
  ASSIGN_RESOURCES: 6,
  /** Remove resources from a role. Use <code>resources</code> to be removed from <code>iam_role</code>. */
  REMOVE_RESOURCES: 7,
  /** Attach one or more policies to a role. Use <code>policies</code> to be attached to <code>iam_role</code>. */
  ATTACH_POLICIES: 8,
  /** Detach one or more policies from a role. Use <code>policies</code> to be detached from <code>iam_role</code>. */
  DETACH_POLICIES: 9,
  /** Add credentials to a role. Use <code>programmatic_credentials</code> to be added to <code>iam_role</code>. */
  ADD_PROGRAMMATIC_CREDENTIALS: 10,
  /** Remove credentials from a role. Use <code>programmatic_credentials</code> to be removed from <code>iam_role</code>. */
  REMOVE_PROGRAMMATIC_CREDENTIALS: 11,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RoleManagementActivityId = (typeof RoleManagementActivityId)[keyof typeof RoleManagementActivityId];

export const RoleManagementActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Delete",
  4: "Assign Privileges",
  5: "Remove Privileges",
  6: "Assign Resources",
  7: "Remove Resources",
  8: "Attach Policies",
  9: "Detach Policies",
  10: "Add Programmatic Credentials",
  11: "Remove Programmatic Credentials",
  99: "Other",
};

export const RoleManagementActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Create": 1,
  "Update": 2,
  "Delete": 3,
  "Assign Privileges": 4,
  "Remove Privileges": 5,
  "Assign Resources": 6,
  "Remove Resources": 7,
  "Attach Policies": 8,
  "Detach Policies": 9,
  "Add Programmatic Credentials": 10,
  "Remove Programmatic Credentials": 11,
  "Other": 99,
};
