/** Stratum ID values. */
export const StratumId = {
  /** Unspecified or invalid. */
  UNKNOWN: 0,
  /** The highest precision primary server (e.g atomic clock or GPS). */
  PRIMARY_SERVER: 1,
  /** A secondary level server (possible values: 2-15). */
  SECONDARY_SERVER: 2,
  UNSYNCHRONIZED: 16,
  /** Reserved stratum (possible values: 17-255). */
  RESERVED: 17,
  /** The stratum level is not mapped. See the <code>stratum</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type StratumId = (typeof StratumId)[keyof typeof StratumId];

/** Label mapping for StratumId values. */
export const StratumIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Primary Server",
  2: "Secondary Server",
  16: "Unsynchronized",
  17: "Reserved",
  99: "Other",
};
