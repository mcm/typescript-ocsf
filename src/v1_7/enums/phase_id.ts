/** Kill Chain Phase ID values. */
export const PhaseId = {
  /** The kill chain phase is unknown. */
  UNKNOWN: 0,
  /** The attackers pick a target and perform a detailed analysis, start collecting information (email addresses, conferences information, etc.) and evaluate the victim’s vulnerabilities to determine how to exploit them. */
  RECONNAISSANCE: 1,
  /** The attackers develop a malware weapon and aim to exploit the discovered vulnerabilities. */
  WEAPONIZATION: 2,
  /** The intruders will use various tactics, such as phishing, infected USB drives, etc. */
  DELIVERY: 3,
  /** The intruders start leveraging vulnerabilities to executed code on the victim’s system. */
  EXPLOITATION: 4,
  /** The intruders install malware on the victim’s system. */
  INSTALLATION: 5,
  /** Malware opens a command channel to enable the intruders to remotely manipulate the victim's system. */
  COMMAND_CONTROL: 6,
  /** With hands-on keyboard access, intruders accomplish the mission’s goal. */
  ACTIONS_ON_OBJECTIVES: 7,
  /** The kill chain phase is not mapped. See the <code>phase</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type PhaseId = (typeof PhaseId)[keyof typeof PhaseId];

/** Label mapping for PhaseId values. */
export const PhaseIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Reconnaissance",
  2: "Weaponization",
  3: "Delivery",
  4: "Exploitation",
  5: "Installation",
  6: "Command & Control",
  7: "Actions on Objectives",
  99: "Other",
};
