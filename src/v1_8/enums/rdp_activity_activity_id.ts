/** RdpActivity activity_id values. */
export const RdpActivityActivityId = {
  /** The event activity is unknown. */
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
  /** An RDP connection disconnect. */
  DISCONNECT: 7,
  /** An RDP connection reconnect. */
  RECONNECT: 8,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RdpActivityActivityId = (typeof RdpActivityActivityId)[keyof typeof RdpActivityActivityId];

export const RdpActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Initial Request",
  2: "Initial Response",
  3: "Connect Request",
  4: "Connect Response",
  5: "TLS Handshake",
  6: "Traffic",
  7: "Disconnect",
  8: "Reconnect",
  99: "Other",
};

export const RdpActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Initial Request": 1,
  "Initial Response": 2,
  "Connect Request": 3,
  "Connect Response": 4,
  "TLS Handshake": 5,
  "Traffic": 6,
  "Disconnect": 7,
  "Reconnect": 8,
  "Other": 99,
};
