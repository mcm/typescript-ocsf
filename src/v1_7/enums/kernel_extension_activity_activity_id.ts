/** KernelExtensionActivity activity_id values. */
export const KernelExtensionActivityActivityId = {
  UNKNOWN: 0,
  /** A driver/extension was loaded into the kernel */
  LOAD: 1,
  /** A driver/extension was unloaded (removed) from the kernel */
  UNLOAD: 2,
  OTHER: 99,
} as const;

export type KernelExtensionActivityActivityId = (typeof KernelExtensionActivityActivityId)[keyof typeof KernelExtensionActivityActivityId];

export const KernelExtensionActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Load",
  2: "Unload",
  99: "Other",
};
