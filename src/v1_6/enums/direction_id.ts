/** Direction ID values. */
export const DirectionId = {
  /** The connection direction is unknown. */
  UNKNOWN: 0,
  /** Inbound network connection. The connection was originated from the Internet or outside network, destined for services on the inside network. */
  INBOUND: 1,
  /** Outbound network connection. The connection was originated from inside the network, destined for services on the Internet or outside network. */
  OUTBOUND: 2,
  /** Lateral network connection. The connection was originated from inside the network, destined for services on the inside network. */
  LATERAL: 3,
  /** The direction is not mapped. See the <code>direction</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DirectionId = (typeof DirectionId)[keyof typeof DirectionId];

/** Label mapping for DirectionId values. */
export const DirectionIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Inbound",
  2: "Outbound",
  3: "Lateral",
  99: "Other",
};
