/** Auth Protocol ID values. */
export const AuthProtocolId = {
  /** The authentication protocol is unknown. */
  UNKNOWN: 0,
  NTLM: 1,
  KERBEROS: 2,
  DIGEST: 3,
  OPENID: 4,
  SAML: 5,
  OAUTH_2_0: 6,
  PAP: 7,
  CHAP: 8,
  EAP: 9,
  RADIUS: 10,
  BASIC_AUTHENTICATION: 11,
  LDAP: 12,
  /** The authentication protocol is not mapped. See the <code>auth_protocol</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AuthProtocolId = (typeof AuthProtocolId)[keyof typeof AuthProtocolId];

/** Label mapping for AuthProtocolId values. */
export const AuthProtocolIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "NTLM",
  2: "Kerberos",
  3: "Digest",
  4: "OpenID",
  5: "SAML",
  6: "OAUTH 2.0",
  7: "PAP",
  8: "CHAP",
  9: "EAP",
  10: "RADIUS",
  11: "Basic Authentication",
  12: "LDAP",
  99: "Other",
};
