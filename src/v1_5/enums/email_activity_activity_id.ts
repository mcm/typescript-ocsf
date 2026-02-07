/** EmailActivity activity_id values. */
export const EmailActivityActivityId = {
  UNKNOWN: 0,
  SEND: 1,
  RECEIVE: 2,
  /** Email being scanned (example: security scanning) */
  SCAN: 3,
  /** Follow an email message as it travels through an organization. The <code>message_trace_uid</code> should be populated when selected. */
  TRACE: 4,
  OTHER: 99,
} as const;

export type EmailActivityActivityId =
  (typeof EmailActivityActivityId)[keyof typeof EmailActivityActivityId];

export const EmailActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Send",
  2: "Receive",
  3: "Scan",
  4: "Trace",
  99: "Other",
};
