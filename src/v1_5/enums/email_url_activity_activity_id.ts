/** EmailUrlActivity activity_id values. */
export const EmailUrlActivityActivityId = {
  UNKNOWN: 0,
  SEND: 1,
  RECEIVE: 2,
  /** Email URL being scanned (example: security scanning). */
  SCAN: 3,
  OTHER: 99,
} as const;

export type EmailUrlActivityActivityId =
  (typeof EmailUrlActivityActivityId)[keyof typeof EmailUrlActivityActivityId];

export const EmailUrlActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Send",
  2: "Receive",
  3: "Scan",
  99: "Other",
};
