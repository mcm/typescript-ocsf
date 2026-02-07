/** Priority ID values. */
export const PriorityId = {
  /** No priority is assigned. */
  UNKNOWN: 0,
  /** Application or personal procedure is unusable, where a workaround is available or a repair is possible. */
  LOW: 1,
  /** Non-critical function or procedure is unusable or hard to use causing operational disruptions with no direct impact on a service's availability. A workaround is available. */
  MEDIUM: 2,
  /** Critical functionality or network access is interrupted, degraded or unusable, having a severe impact on services availability. No acceptable alternative is possible. */
  HIGH: 3,
  /** Interruption making a critical functionality inaccessible or a complete network interruption causing a severe impact on services availability. There is no possible alternative. */
  CRITICAL: 4,
  /** The priority is not normalized. */
  OTHER: 99,
} as const;

export type PriorityId = (typeof PriorityId)[keyof typeof PriorityId];

/** Label mapping for PriorityId values. */
export const PriorityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  99: "Other",
};
