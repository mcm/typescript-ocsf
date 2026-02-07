/** AccountChange activity_id values. */
export const AccountChangeActivityId = {
  UNKNOWN: 0,
  /** A user/role was created. */
  CREATE: 1,
  /** A user/role was enabled. */
  ENABLE: 2,
  /** An attempt was made to change an account's password. */
  PASSWORD_CHANGE: 3,
  /** An attempt was made to reset an account's password. */
  PASSWORD_RESET: 4,
  /** A user/role was disabled. */
  DISABLE: 5,
  /** A user/role was deleted. */
  DELETE: 6,
  /** An IAM Policy was attached to a user/role. */
  ATTACH_POLICY: 7,
  /** An IAM Policy was detached from a user/role. */
  DETACH_POLICY: 8,
  /** A user account was locked out. */
  LOCK: 9,
  /** An authentication factor was enabled for an account. */
  MFA_FACTOR_ENABLE: 10,
  /** An authentication factor was disabled for an account. */
  MFA_FACTOR_DISABLE: 11,
  /** A user account was unlocked. */
  UNLOCK: 12,
  OTHER: 99,
} as const;

export type AccountChangeActivityId =
  (typeof AccountChangeActivityId)[keyof typeof AccountChangeActivityId];

export const AccountChangeActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Enable",
  3: "Password Change",
  4: "Password Reset",
  5: "Disable",
  6: "Delete",
  7: "Attach Policy",
  8: "Detach Policy",
  9: "Lock",
  10: "MFA Factor Enable",
  11: "MFA Factor Disable",
  12: "Unlock",
  99: "Other",
};
