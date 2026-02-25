/** FtpActivity activity_id values. */
export const FtpActivityActivityId = {
  UNKNOWN: 0,
  /** File upload to the FTP or SFTP site. */
  PUT: 1,
  /** File download from the FTP or SFTP site. */
  GET: 2,
  /** Poll directory for specific file(s) or folder(s) at the FTP or SFTP site location. */
  POLL: 3,
  /** Delete file(s) from the FTP or SFTP site. */
  DELETE: 4,
  /** Rename the file(s) in the FTP or SFTP site. */
  RENAME: 5,
  /** List files in a specified directory. */
  LIST: 6,
  OTHER: 99,
} as const;

export type FtpActivityActivityId = (typeof FtpActivityActivityId)[keyof typeof FtpActivityActivityId];

export const FtpActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Put",
  2: "Get",
  3: "Poll",
  4: "Delete",
  5: "Rename",
  6: "List",
  99: "Other",
};

export const FtpActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Put": 1,
  "Get": 2,
  "Poll": 3,
  "Delete": 4,
  "Rename": 5,
  "List": 6,
  "Other": 99,
};
