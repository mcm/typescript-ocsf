/** VRAM Mode ID values. */
export const VramModeId = {
  /** The VRAM mode is unknown or not reported. */
  UNKNOWN: 0,
  /** Video memory is allocated from system memory. */
  SHARED: 1,
  /** Video memory is physically separate from system memory. */
  DEDICATED: 2,
  /** A VRAM mode not covered by the defined values; the exact value is reported by the event source. */
  OTHER: 99,
} as const;

export type VramModeId = (typeof VramModeId)[keyof typeof VramModeId];

/** Label mapping for VramModeId values. */
export const VramModeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Shared",
  2: "Dedicated",
  99: "Other",
};

/** Reverse mapping from label to VramModeId value. */
export const VramModeIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Shared": 1,
  "Dedicated": 2,
  "Other": 99,
};
