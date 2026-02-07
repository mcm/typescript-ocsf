/** DnsActivity activity_id values. */
export const DnsActivityActivityId = {
  UNKNOWN: 0,
  /** The DNS query request. */
  QUERY: 1,
  /** The DNS query response. */
  RESPONSE: 2,
  /** Bidirectional DNS request and response traffic. */
  TRAFFIC: 6,
  OTHER: 99,
} as const;

export type DnsActivityActivityId =
  (typeof DnsActivityActivityId)[keyof typeof DnsActivityActivityId];

export const DnsActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  2: "Response",
  6: "Traffic",
  99: "Other",
};
