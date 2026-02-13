/** FolderQuery activity_id values. */
export const FolderQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type FolderQueryActivityId = (typeof FolderQueryActivityId)[keyof typeof FolderQueryActivityId];

export const FolderQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
