/** PatchState activity_id values. */
export const PatchStateActivityId = {
  UNKNOWN: 0,
  /** The discovered information is via a log. */
  LOG: 1,
  /** The discovered information is via a collection process. */
  COLLECT: 2,
  OTHER: 99,
} as const;

export type PatchStateActivityId = (typeof PatchStateActivityId)[keyof typeof PatchStateActivityId];

export const PatchStateActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Log",
  2: "Collect",
  99: "Other",
};
