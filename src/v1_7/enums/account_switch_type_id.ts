/** Account Switch Type ID values. */
export const AccountSwitchTypeId = {
  /** The account switch type is unknown. */
  UNKNOWN: 0,
  /** A utility like <code>sudo</code>, <code>su</code>, or equivalent was used to perform actions in the context of another user. */
  SUBSTITUTE_USER: 1,
  /** An API like <code>ImpersonateLoggedOnUser()</code> or equivalent was used to perform actions in the context of another user. */
  IMPERSONATE: 2,
  /** The account switch type is not mapped. See the <code>account_switch_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AccountSwitchTypeId = (typeof AccountSwitchTypeId)[keyof typeof AccountSwitchTypeId];

/** Label mapping for AccountSwitchTypeId values. */
export const AccountSwitchTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Substitute User",
  2: "Impersonate",
  99: "Other",
};
