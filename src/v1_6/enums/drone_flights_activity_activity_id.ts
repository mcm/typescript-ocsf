/** DroneFlightsActivity activity_id values. */
export const DroneFlightsActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Remote ID information from an Unmanned System is being captured (collected). */
  CAPTURE: 1,
  /** Unmanned System activity is being recorded. */
  RECORD: 2,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DroneFlightsActivityActivityId =
  (typeof DroneFlightsActivityActivityId)[keyof typeof DroneFlightsActivityActivityId];

export const DroneFlightsActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Capture",
  2: "Record",
  99: "Other",
};
