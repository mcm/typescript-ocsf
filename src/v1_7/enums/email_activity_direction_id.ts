/** EmailActivity direction_id values. */
export const EmailActivityDirectionId = {
  /** The email direction is unknown. */
  UNKNOWN: 0,
  /** Email Inbound, from the Internet or outside network destined for an entity inside network. */
  INBOUND: 1,
  /** Email Outbound, from inside the network destined for an entity outside network. */
  OUTBOUND: 2,
  /** Email Internal, from inside the network destined for an entity inside network. */
  INTERNAL: 3,
  /** Local network connection (<code>localhost</code>). The connection is intra-device, originating from and destined for services running on the same device. */
  LOCAL: 4,
  OTHER: 99,
} as const;

export type EmailActivityDirectionId = (typeof EmailActivityDirectionId)[keyof typeof EmailActivityDirectionId];

export const EmailActivityDirectionIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Inbound",
  2: "Outbound",
  3: "Internal",
  4: "Local",
  99: "Other",
};

export const EmailActivityDirectionIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Inbound": 1,
  "Outbound": 2,
  "Internal": 3,
  "Local": 4,
  "Other": 99,
};
