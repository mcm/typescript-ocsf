/** Authentication activity_id values. */
export const AuthenticationActivityId = {
  UNKNOWN: 0,
  /** A new logon session was requested. */
  LOGON: 1,
  /** A logon session was terminated and no longer exists. */
  LOGOFF: 2,
  /** A Kerberos authentication ticket (TGT) was requested. */
  AUTHENTICATION_TICKET: 3,
  /** A Kerberos service ticket was requested. */
  SERVICE_TICKET_REQUEST: 4,
  /** A Kerberos service ticket was renewed. */
  SERVICE_TICKET_RENEW: 5,
  /** A preauthentication stage was engaged. */
  PREAUTH: 6,
  /** A utility or service switched the user account. See the <code>account_switch_type_id</code> attribute for more details. */
  ACCOUNT_SWITCH: 7,
  OTHER: 99,
} as const;

export type AuthenticationActivityId = (typeof AuthenticationActivityId)[keyof typeof AuthenticationActivityId];

export const AuthenticationActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Logon",
  2: "Logoff",
  3: "Authentication Ticket",
  4: "Service Ticket Request",
  5: "Service Ticket Renew",
  6: "Preauth",
  7: "Account Switch",
  99: "Other",
};
