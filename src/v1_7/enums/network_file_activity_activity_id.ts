/** NetworkFileActivity activity_id values. */
export const NetworkFileActivityActivityId = {
  UNKNOWN: 0,
  /** Upload a file. */
  UPLOAD: 1,
  /** Download a file. */
  DOWNLOAD: 2,
  /** Update a file. */
  UPDATE: 3,
  /** Delete a file. */
  DELETE: 4,
  /** Rename a file. */
  RENAME: 5,
  /** Copy a file. */
  COPY: 6,
  /** Move a file. */
  MOVE: 7,
  /** Restore a file. */
  RESTORE: 8,
  /** Preview a file. */
  PREVIEW: 9,
  /** Lock a file. */
  LOCK: 10,
  /** Unlock a file. */
  UNLOCK: 11,
  /** Share a file. */
  SHARE: 12,
  /** Unshare a file. */
  UNSHARE: 13,
  /** Open a file. */
  OPEN: 14,
  /** Mark a file or folder to sync with a computer. */
  SYNC: 15,
  /** Mark a file or folder to not sync with a computer. */
  UNSYNC: 16,
  OTHER: 99,
} as const;

export type NetworkFileActivityActivityId =
  (typeof NetworkFileActivityActivityId)[keyof typeof NetworkFileActivityActivityId];

export const NetworkFileActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Upload",
  2: "Download",
  3: "Update",
  4: "Delete",
  5: "Rename",
  6: "Copy",
  7: "Move",
  8: "Restore",
  9: "Preview",
  10: "Lock",
  11: "Unlock",
  12: "Share",
  13: "Unshare",
  14: "Open",
  15: "Sync",
  16: "Unsync",
  99: "Other",
};
