/** TunnelActivity activity_id values. */
export const TunnelActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Open a tunnel. */
  OPEN: 1,
  /** Close a tunnel. */
  CLOSE: 2,
  /** Renew a tunnel. */
  RENEW: 3,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type TunnelActivityActivityId =
  (typeof TunnelActivityActivityId)[keyof typeof TunnelActivityActivityId];

export const TunnelActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Open",
  2: "Close",
  3: "Renew",
  99: "Other",
};
