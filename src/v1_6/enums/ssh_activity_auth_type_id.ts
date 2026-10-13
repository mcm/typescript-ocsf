/** SshActivity auth_type_id values. */
export const SshActivityAuthTypeId = {
  UNKNOWN: 0,
  /** Authentication using digital certificates. */
  CERTIFICATE_BASED: 1,
  /** GSSAPI for centralized authentication. */
  GSSAPI: 2,
  /** Authentication based on the client host's identity. */
  HOST_BASED: 3,
  /** Multi-step, interactive authentication. */
  KEYBOARD_INTERACTIVE: 4,
  /** Password Authentication. */
  PASSWORD: 5,
  /** Paired public key authentication. */
  PUBLIC_KEY: 6,
  OTHER: 99,
} as const;

export type SshActivityAuthTypeId = (typeof SshActivityAuthTypeId)[keyof typeof SshActivityAuthTypeId];

export const SshActivityAuthTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Certificate Based",
  2: "GSSAPI",
  3: "Host Based",
  4: "Keyboard Interactive",
  5: "Password",
  6: "Public Key",
  99: "Other",
};

export const SshActivityAuthTypeIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Certificate Based": 1,
  "GSSAPI": 2,
  "Host Based": 3,
  "Keyboard Interactive": 4,
  "Password": 5,
  "Public Key": 6,
  "Other": 99,
};
