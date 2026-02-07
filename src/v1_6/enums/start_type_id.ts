/** Start Type ID values. */
export const StartTypeId = {
  /** The start type is unknown. */
  UNKNOWN: 0,
  /** Service started automatically during system startup. */
  AUTO: 1,
  /** Device driver started by the system loader. */
  BOOT: 2,
  /** Started on demand. For example, by the Windows Service Control Manager when a process calls the <i>StartService</i> function. */
  ON_DEMAND: 3,
  /** The service is disabled, and cannot be started. */
  DISABLED: 4,
  /** Started on all user logins. */
  ALL_LOGINS: 5,
  /** Started on specific user logins. */
  SPECIFIC_USER_LOGIN: 6,
  /** Stared according to a schedule. */
  SCHEDULED: 7,
  /** Started when a system item, such as a file or registry key, changes. */
  SYSTEM_CHANGED: 8,
  /** The start type is not mapped. See the <code>start_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type StartTypeId = (typeof StartTypeId)[keyof typeof StartTypeId];

/** Label mapping for StartTypeId values. */
export const StartTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Auto",
  2: "Boot",
  3: "On Demand",
  4: "Disabled",
  5: "All Logins",
  6: "Specific User Login",
  7: "Scheduled",
  8: "System Changed",
  99: "Other",
};
