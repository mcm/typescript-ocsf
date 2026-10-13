/** DroneFlightsActivity status_id values. */
export const DroneFlightsActivityStatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  /** The operational status is not reported. */
  UNDECLARED: 1,
  /** The Unmanned Aerial System (UAS) is grounded. */
  GROUND: 2,
  /** The Unmanned Aerial System (UAS) is airborne. */
  AIRBORNE: 3,
  /** The Unmanned Aerial System (UAS) is reporting an emergency status. */
  EMERGENCY: 4,
  /** The Unmanned Aerial System (UAS) is reporting the Remote ID beacon or device is malfunctioning or has failed. */
  REMOTE_ID_SYSTEM_FAILURE: 5,
  /** An ASTM Reserved status is reported. */
  RESERVED: 6,
  /** The event status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DroneFlightsActivityStatusId = (typeof DroneFlightsActivityStatusId)[keyof typeof DroneFlightsActivityStatusId];

export const DroneFlightsActivityStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Undeclared",
  2: "Ground",
  3: "Airborne",
  4: "Emergency",
  5: "Remote ID System Failure",
  6: "Reserved",
  99: "Other",
};

export const DroneFlightsActivityStatusIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Undeclared": 1,
  "Ground": 2,
  "Airborne": 3,
  "Emergency": 4,
  "Remote ID System Failure": 5,
  "Reserved": 6,
  "Other": 99,
};
