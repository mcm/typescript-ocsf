/** EmailUrlActivity activity_id values. */
export const EmailUrlActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  SEND: 1,
  RECEIVE: 2,
  /** Email URL being scanned (example: security scanning). */
  SCAN: 3,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type EmailUrlActivityActivityId = (typeof EmailUrlActivityActivityId)[keyof typeof EmailUrlActivityActivityId];

export const EmailUrlActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Send",
  2: "Receive",
  3: "Scan",
  99: "Other",
};

export const EmailUrlActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Send": 1,
  "Receive": 2,
  "Scan": 3,
  "Other": 99,
};
