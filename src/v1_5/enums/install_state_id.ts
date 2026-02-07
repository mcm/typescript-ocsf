/** Install State ID values. */
export const InstallStateId = {
  /** The normalized install state is unknown. */
  UNKNOWN: 0,
  /** The item is installed. */
  INSTALLED: 1,
  /** The item is not installed. */
  NOT_INSTALLED: 2,
  /** The item is installed pending reboot operation. */
  INSTALLED_PENDING_REBOOT: 3,
  /** The install state is not mapped. See the <code>install_state</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type InstallStateId = (typeof InstallStateId)[keyof typeof InstallStateId];

/** Label mapping for InstallStateId values. */
export const InstallStateIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Installed",
  2: "Not Installed",
  3: "Installed Pending Reboot",
  99: "Other",
};
