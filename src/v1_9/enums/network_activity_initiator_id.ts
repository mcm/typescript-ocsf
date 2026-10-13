/** NetworkActivity initiator_id values. */
export const NetworkActivityInitiatorId = {
  UNKNOWN: 0,
  /** The <code>src_endpoint</code> is the true initiator and the source/destination assignment is correct. */
  SOURCE_ENDPOINT: 1,
  /** The <code>dst_endpoint</code> is the true initiator and the source/destination assignment is reversed. */
  DESTINATION_ENDPOINT: 2,
  OTHER: 99,
} as const;

export type NetworkActivityInitiatorId = (typeof NetworkActivityInitiatorId)[keyof typeof NetworkActivityInitiatorId];

export const NetworkActivityInitiatorIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Source Endpoint",
  2: "Destination Endpoint",
  99: "Other",
};

export const NetworkActivityInitiatorIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Source Endpoint": 1,
  "Destination Endpoint": 2,
  "Other": 99,
};
