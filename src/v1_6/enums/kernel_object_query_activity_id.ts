/** KernelObjectQuery activity_id values. */
export const KernelObjectQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type KernelObjectQueryActivityId = (typeof KernelObjectQueryActivityId)[keyof typeof KernelObjectQueryActivityId];

export const KernelObjectQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
