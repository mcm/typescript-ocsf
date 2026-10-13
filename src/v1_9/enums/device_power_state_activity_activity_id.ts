/** DevicePowerStateActivity activity_id values. */
export const DevicePowerStateActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** A power-on activity was reported for the system. */
  POWER_ON: 1,
  /** A power-off activity was reported for the system, including graceful shutdowns and hard power-off events. For graceful or software-initiated shutdowns, the <code>actor</code> may be specified when known. */
  POWER_OFF: 2,
  /** A sleep activity was reported for the system. */
  SLEEP: 3,
  /** A hibernate activity was reported for the system. */
  HIBERNATE: 4,
  /** A reboot activity was reported for the system. */
  REBOOT: 5,
  /** A wake activity was reported for the system. */
  WAKE: 6,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DevicePowerStateActivityActivityId = (typeof DevicePowerStateActivityActivityId)[keyof typeof DevicePowerStateActivityActivityId];

export const DevicePowerStateActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Power On",
  2: "Power Off",
  3: "Sleep",
  4: "Hibernate",
  5: "Reboot",
  6: "Wake",
  99: "Other",
};

export const DevicePowerStateActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Power On": 1,
  "Power Off": 2,
  "Sleep": 3,
  "Hibernate": 4,
  "Reboot": 5,
  "Wake": 6,
  "Other": 99,
};
