/** Initiator ID values. */
export const InitiatorId = {
  UNKNOWN: 0,
  OTHER: 99,
} as const;

export type InitiatorId = (typeof InitiatorId)[keyof typeof InitiatorId];

/** Label mapping for InitiatorId values. */
export const InitiatorIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};

/** Reverse mapping from label to InitiatorId value. */
export const InitiatorIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Other": 99,
};
