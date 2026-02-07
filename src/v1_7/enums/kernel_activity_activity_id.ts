/** KernelActivity activity_id values. */
export const KernelActivityActivityId = {
  UNKNOWN: 0,
  CREATE: 1,
  READ: 2,
  DELETE: 3,
  INVOKE: 4,
  OTHER: 99,
} as const;

export type KernelActivityActivityId =
  (typeof KernelActivityActivityId)[keyof typeof KernelActivityActivityId];

export const KernelActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Delete",
  4: "Invoke",
  99: "Other",
};
