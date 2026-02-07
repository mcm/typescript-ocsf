/** Response Code ID values. */
export const RcodeId = {
  /** The DNS response code is unknown. */
  UNKNOWN: 0,
  /** The DNS response code is not defined by the RFC. See the <code>rcode</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type RcodeId = (typeof RcodeId)[keyof typeof RcodeId];

/** Label mapping for RcodeId values. */
export const RcodeIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
