/** EntityManagement activity_id values. */
export const EntityManagementActivityId = {
  UNKNOWN: 0,
  /** Create a new managed entity. */
  CREATE: 1,
  /** Read an existing managed entity. */
  READ: 2,
  /** Update an existing managed entity. */
  UPDATE: 3,
  /** Delete a managed entity. */
  DELETE: 4,
  /** Move or rename an existing managed entity. */
  MOVE: 5,
  /** Enroll an existing managed entity. */
  ENROLL: 6,
  /** Unenroll an existing managed entity. */
  UNENROLL: 7,
  /** Enable an existing managed entity. Note: This is typically regarded as a semi-permanent, editor visible, syncable change. */
  ENABLE: 8,
  /** Disable an existing managed entity. Note: This is typically regarded as a semi-permanent, editor visible, syncable change. */
  DISABLE: 9,
  /** Activate an existing managed entity. Note: This is a typically regarded as a transient change, a change of state of the engine. */
  ACTIVATE: 10,
  /** Deactivate an existing managed entity. Note: This is a typically regarded as a transient change, a change of state of the engine. */
  DEACTIVATE: 11,
  /** Suspend an existing managed entity. */
  SUSPEND: 12,
  /** Resume (unsuspend) an existing managed entity. */
  RESUME: 13,
  OTHER: 99,
} as const;

export type EntityManagementActivityId = (typeof EntityManagementActivityId)[keyof typeof EntityManagementActivityId];

export const EntityManagementActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Update",
  4: "Delete",
  5: "Move",
  6: "Enroll",
  7: "Unenroll",
  8: "Enable",
  9: "Disable",
  10: "Activate",
  11: "Deactivate",
  12: "Suspend",
  13: "Resume",
  99: "Other",
};
