/** FileQuery activity_id values. */
export const FileQueryActivityId = {
  UNKNOWN: 0,
  /** The discovered results are via a query request. */
  QUERY: 1,
  OTHER: 99,
} as const;

export type FileQueryActivityId = (typeof FileQueryActivityId)[keyof typeof FileQueryActivityId];

export const FileQueryActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  99: "Other",
};
