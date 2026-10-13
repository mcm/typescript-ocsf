/** SshActivity observation_point_id values. */
export const SshActivityObservationPointId = {
  /** The observation point is unknown. */
  UNKNOWN: 0,
  /** The source network endpoint is the observation point. */
  SOURCE: 1,
  /** The destination network endpoint is the observation point. */
  DESTINATION: 2,
  /** Neither the source nor destination network endpoint is the observation point. */
  NEITHER: 3,
  /** Both the source and destination network endpoint are the observation point. This typically occurs in localhost or internal communications where the source and destination are the same endpoint, often resulting in a <code>connection_info.direction</code> of <code>Local</code>. */
  BOTH: 4,
  /** The observation point is not mapped. See the <code>observation_point</code> attribute for a data source specific value. */
  OTHER: 99,
} as const;

export type SshActivityObservationPointId = (typeof SshActivityObservationPointId)[keyof typeof SshActivityObservationPointId];

export const SshActivityObservationPointIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Source",
  2: "Destination",
  3: "Neither",
  4: "Both",
  99: "Other",
};

export const SshActivityObservationPointIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Source": 1,
  "Destination": 2,
  "Neither": 3,
  "Both": 4,
  "Other": 99,
};
