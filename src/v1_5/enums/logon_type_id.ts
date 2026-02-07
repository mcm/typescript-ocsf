/** Logon Type ID values. */
export const LogonTypeId = {
  /** The logon type is unknown. */
  UNKNOWN: 0,
  /** Used only by the System account, for example at system startup. */
  SYSTEM: 1,
  /** A local logon to device console. */
  INTERACTIVE: 2,
  /** A user or device logged onto this device from the network. */
  NETWORK: 3,
  /** A batch server logon, where processes may be executing on behalf of a user without their direct intervention. */
  BATCH: 4,
  /** A logon by a service or daemon that was started by the OS. */
  OS_SERVICE: 5,
  /** A user unlocked the device. */
  UNLOCK: 7,
  /** A user logged on to this device from the network. The user's password in the authentication package was not hashed. */
  NETWORK_CLEARTEXT: 8,
  /** A caller cloned its current token and specified new credentials for outbound connections. The new logon session has the same local identity, but uses different credentials for other network connections. */
  NEW_CREDENTIALS: 9,
  /** A remote logon using Terminal Services or remote desktop application. */
  REMOTE_INTERACTIVE: 10,
  /** A user logged on to this device with network credentials that were stored locally on the device and the domain controller was not contacted to verify the credentials. */
  CACHED_INTERACTIVE: 11,
  /** Same as Remote Interactive. This is used for internal auditing. */
  CACHED_REMOTE_INTERACTIVE: 12,
  /** Workstation logon. */
  CACHED_UNLOCK: 13,
  /** The logon type is not mapped. See the <code>logon_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type LogonTypeId = (typeof LogonTypeId)[keyof typeof LogonTypeId];

/** Label mapping for LogonTypeId values. */
export const LogonTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "System",
  2: "Interactive",
  3: "Network",
  4: "Batch",
  5: "OS Service",
  7: "Unlock",
  8: "Network Cleartext",
  9: "New Credentials",
  10: "Remote Interactive",
  11: "Cached Interactive",
  12: "Cached Remote Interactive",
  13: "Cached Unlock",
  99: "Other",
};
