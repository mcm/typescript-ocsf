/** RemediationActivity activity_id values. */
export const RemediationActivityActivityId = {
  UNKNOWN: 0,
  /** Creates logical or physical barriers in a system which reduces opportunities for adversaries to create further accesses. Defined by D3FEND™ <a target='_blank' href='https://d3fend.mitre.org/tactic/d3f:Isolate/'>d3f:Isolate</a>. */
  ISOLATE: 1,
  /** Removes an adversary or malicious resource from a device or computer network. Defined by D3FEND™ <a target='_blank' href='https://d3fend.mitre.org/tactic/d3f:Evict/'>d3f:Evict</a>. */
  EVICT: 2,
  /** Returns the system to a better state. Defined by D3FEND™ <a target='_blank' href='https://d3fend.mitre.org/tactic/d3f:Restore/'>d3f:Restore</a>. */
  RESTORE: 3,
  /** Increases the opportunity cost of computer network exploitation. Defined by D3FEND™ <a target='_blank' href='https://d3fend.mitre.org/tactic/d3f:Harden/'>d3f:Harden</a>. */
  HARDEN: 4,
  /** Further identify adversary access to or unauthorized activity on computer networks. Defined by D3FEND™ <a target='_blank' href='https://d3fend.mitre.org/tactic/d3f:Detect/'>d3f:Detect</a>. */
  DETECT: 5,
  OTHER: 99,
} as const;

export type RemediationActivityActivityId = (typeof RemediationActivityActivityId)[keyof typeof RemediationActivityActivityId];

export const RemediationActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Isolate",
  2: "Evict",
  3: "Restore",
  4: "Harden",
  5: "Detect",
  99: "Other",
};
