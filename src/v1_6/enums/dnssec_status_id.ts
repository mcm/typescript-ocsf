/** DNSSEC Status ID values. */
export const DnssecStatusId = {
  /** The disposition is unknown. */
  UNKNOWN: 0,
  /** The related domain enables the signing of DNS records using DNSSEC. */
  SIGNED: 1,
  /** The related domain does not enable the signing of DNS records using DNSSEC. */
  UNSIGNED: 2,
  /** The DNSSEC status is not mapped. See the <code>dnssec_status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DnssecStatusId = (typeof DnssecStatusId)[keyof typeof DnssecStatusId];

/** Label mapping for DnssecStatusId values. */
export const DnssecStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Signed",
  2: "Unsigned",
  99: "Other",
};
