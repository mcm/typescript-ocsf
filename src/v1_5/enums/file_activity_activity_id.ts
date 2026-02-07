/** FileActivity activity_id values. */
export const FileActivityActivityId = {
  UNKNOWN: 0,
  /** A request to create a new file on a file system. */
  CREATE: 1,
  /** A request to read data from a file on a file system. */
  READ: 2,
  /** A request to write data to a file on a file system. */
  UPDATE: 3,
  /** A request to delete a file on a file system. */
  DELETE: 4,
  /** A request to rename a file on a file system. */
  RENAME: 5,
  /** A request to set attributes for a file on a file system. */
  SET_ATTRIBUTES: 6,
  /** A request to set security for a file on a file system. */
  SET_SECURITY: 7,
  /** A request to get attributes for a file on a file system. */
  GET_ATTRIBUTES: 8,
  /** A request to get security for a file on a file system. */
  GET_SECURITY: 9,
  /** A request to encrypt a file on a file system. */
  ENCRYPT: 10,
  /** A request to decrypt a file on a file system. */
  DECRYPT: 11,
  /** A request to mount a file on a file system. */
  MOUNT: 12,
  /** A request to unmount a file from a file system. */
  UNMOUNT: 13,
  /** A request to create a file handle. */
  OPEN: 14,
  OTHER: 99,
} as const;

export type FileActivityActivityId =
  (typeof FileActivityActivityId)[keyof typeof FileActivityActivityId];

export const FileActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Update",
  4: "Delete",
  5: "Rename",
  6: "Set Attributes",
  7: "Set Security",
  8: "Get Attributes",
  9: "Get Security",
  10: "Encrypt",
  11: "Decrypt",
  12: "Mount",
  13: "Unmount",
  14: "Open",
  99: "Other",
};
