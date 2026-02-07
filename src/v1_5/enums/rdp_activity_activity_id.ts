/** RdpActivity activity_id values. */
export const RdpActivityActivityId = {
  UNKNOWN: 0,
  /** The initial RDP request. */
  INITIAL_REQUEST: 1,
  /** The initial RDP response. */
  INITIAL_RESPONSE: 2,
  /** An RDP connection request. */
  CONNECT_REQUEST: 3,
  /** An RDP connection response. */
  CONNECT_RESPONSE: 4,
  /** The TLS handshake. */
  TLS_HANDSHAKE: 5,
  /** Network traffic report. */
  TRAFFIC: 6,
  OTHER: 99,
} as const;

export type RdpActivityActivityId =
  (typeof RdpActivityActivityId)[keyof typeof RdpActivityActivityId];

export const RdpActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Initial Request",
  2: "Initial Response",
  3: "Connect Request",
  4: "Connect Response",
  5: "TLS Handshake",
  6: "Traffic",
  99: "Other",
};
