/** KernelActivity activity_id values. */
export const KernelActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  CREATE: 1,
  READ: 2,
  DELETE: 3,
  INVOKE: 4,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type KernelActivityActivityId = (typeof KernelActivityActivityId)[keyof typeof KernelActivityActivityId];

export const KernelActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Delete",
  4: "Invoke",
  99: "Other",
};

export const KernelActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Create": 1,
  "Read": 2,
  "Delete": 3,
  "Invoke": 4,
  "Other": 99,
};
