/** Tunnel Type ID values. */
export const TunnelTypeId = {
  /** The type of tunnel configuration is unknown. */
  UNKNOWN: 0,
  /** The tunnel configuration routes only specific traffic through the tunnel. */
  SPLIT_TUNNEL: 1,
  /** The tunnel configuration routes all traffic through the tunnel. */
  FULL_TUNNEL: 2,
  /** The type of tunnel configuration is not defined by the event source. */
  OTHER: 99,
} as const;

export type TunnelTypeId = (typeof TunnelTypeId)[keyof typeof TunnelTypeId];

/** Label mapping for TunnelTypeId values. */
export const TunnelTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Split Tunnel",
  2: "Full Tunnel",
  99: "Other",
};

/** Reverse mapping from label to TunnelTypeId value. */
export const TunnelTypeIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Split Tunnel": 1,
  "Full Tunnel": 2,
  "Other": 99,
};
