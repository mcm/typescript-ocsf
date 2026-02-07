/** EmailFileActivity activity_id values. */
export const EmailFileActivityActivityId = {
  UNKNOWN: 0,
  SEND: 1,
  RECEIVE: 2,
  /** Email file being scanned (example: security scanning). */
  SCAN: 3,
  OTHER: 99,
} as const;

export type EmailFileActivityActivityId =
  (typeof EmailFileActivityActivityId)[keyof typeof EmailFileActivityActivityId];

export const EmailFileActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Send",
  2: "Receive",
  3: "Scan",
  99: "Other",
};
