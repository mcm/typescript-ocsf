/** Observation Point ID values. */
export const ObservationPointId = {
  UNKNOWN: 0,
  OTHER: 99,
} as const;

export type ObservationPointId = (typeof ObservationPointId)[keyof typeof ObservationPointId];

/** Label mapping for ObservationPointId values. */
export const ObservationPointIdLabels: Record<number, string> = {
  0: "Unknown",
  99: "Other",
};
