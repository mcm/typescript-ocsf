/** SmbActivity activity_id values. */
export const SmbActivityActivityId = {
  UNKNOWN: 0,
  /** The event pertains to file superseded activity (overwritten if it exists and created if not). */
  FILE_SUPERSEDE: 1,
  /** The event pertains to file open activity (the file is opened if it exists and fails to open if it doesn't). */
  FILE_OPEN: 2,
  /** The event pertains to file creation activity (a file is created if it does not exist and fails if it does). */
  FILE_CREATE: 3,
  /** The event pertains to file open activity (the file is opened if it exists and is created if it doesn't). */
  FILE_OPEN_IF: 4,
  /** The event pertains to file overwrite activity (the file is opened in a truncated form if it exists and fails if it doesn't). */
  FILE_OVERWRITE: 5,
  /** The event pertains to file overwrite activity (the file is opened in a truncated form if it exists and created otherwise) */
  FILE_OVERWRITE_IF: 6,
  OTHER: 99,
} as const;

export type SmbActivityActivityId = (typeof SmbActivityActivityId)[keyof typeof SmbActivityActivityId];

export const SmbActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "File Supersede",
  2: "File Open",
  3: "File Create",
  4: "File Open If",
  5: "File Overwrite",
  6: "File Overwrite If",
  99: "Other",
};
