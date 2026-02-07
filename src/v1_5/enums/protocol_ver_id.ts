/** Protocol Version ID values. */
export const ProtocolVerId = {
  /** The protocol version is unknown. */
  UNKNOWN: 0,
  /** The protocol version is not mapped. See the <code>protocol_ver</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ProtocolVerId = (typeof ProtocolVerId)[keyof typeof ProtocolVerId];

/** Label mapping for ProtocolVerId values. */
export const ProtocolVerIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
