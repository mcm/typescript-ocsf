/** AirborneBroadcastActivity activity_id values. */
export const AirborneBroadcastActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** ADS-B information is being captured (collected). */
  CAPTURE: 1,
  /** ADS-B information is being recorded, for example by a standalone transceiver. */
  RECORD: 2,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type AirborneBroadcastActivityActivityId = (typeof AirborneBroadcastActivityActivityId)[keyof typeof AirborneBroadcastActivityActivityId];

export const AirborneBroadcastActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Capture",
  2: "Record",
  99: "Other",
};
