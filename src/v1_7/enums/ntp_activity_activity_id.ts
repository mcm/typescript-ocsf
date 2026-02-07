/** NtpActivity activity_id values. */
export const NtpActivityActivityId = {
  /** Not used in standard NTP implementations. */
  UNKNOWN: 0,
  /** Bidirectional time exchange between devices. */
  SYMMETRIC_ACTIVE_EXCHANGE: 1,
  /** Device responds as a server to peers in symmetric active mode. */
  SYMMETRIC_PASSIVE_RESPONSE: 2,
  /** NTP client, syncs with servers. */
  CLIENT_SYNCHRONIZATION: 3,
  /** Dedicated NTP time server, responds to clients. */
  SERVER_RESPONSE: 4,
  /** Broadcast time info to network devices. */
  BROADCAST: 5,
  /** Monitoring and control messaging. */
  CONTROL: 6,
  /** Reserved - Not defined in standard NTP specifications. */
  PRIVATE_USE_CASE: 7,
  /** The event activity is not mapped. */
  OTHER: 99,
} as const;

export type NtpActivityActivityId =
  (typeof NtpActivityActivityId)[keyof typeof NtpActivityActivityId];

export const NtpActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Symmetric Active Exchange",
  2: "Symmetric Passive Response",
  3: "Client Synchronization",
  4: "Server Response",
  5: "Broadcast",
  6: "Control",
  7: "Private Use Case",
  99: "Other",
};
