/** ProcessRemediationActivity activity_id values. */
export const ProcessRemediationActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** Creates logical or physical barriers in a system which reduces opportunities for adversaries to create further accesses. */
  ISOLATE: 1,
  /** Removes an adversary or malicious resource from a device or computer network. */
  EVICT: 2,
  /** Returns the system to a better state. */
  RESTORE: 3,
  /** Increases the opportunity cost of computer network exploitation. */
  HARDEN: 4,
  /** Identify adversary access to or unauthorized activity on computer networks. */
  DETECT: 5,
  /** Advertise, entice, and allow potential attackers access to an observed or controlled environment. */
  DECEIVE: 6,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ProcessRemediationActivityActivityId = (typeof ProcessRemediationActivityActivityId)[keyof typeof ProcessRemediationActivityActivityId];

export const ProcessRemediationActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Isolate",
  2: "Evict",
  3: "Restore",
  4: "Harden",
  5: "Detect",
  6: "Deceive",
  99: "Other",
};

export const ProcessRemediationActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Isolate": 1,
  "Evict": 2,
  "Restore": 3,
  "Harden": 4,
  "Detect": 5,
  "Deceive": 6,
  "Other": 99,
};
