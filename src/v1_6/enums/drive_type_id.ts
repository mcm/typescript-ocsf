/** Drive Type ID values. */
export const DriveTypeId = {
  /** The drive type is unknown. */
  UNKNOWN: 0,
  /** The drive has removable media; for example, a floppy drive, thumb drive, or flash card reader. */
  REMOVABLE: 1,
  /** The drive has fixed media; for example, a hard disk drive or flash drive. */
  FIXED: 2,
  /** The drive is a remote (network) drive. */
  REMOTE: 3,
  /** The drive is a CD-ROM drive. */
  CD_ROM: 4,
  /** The drive is a RAM disk. */
  RAM_DISK: 5,
  /** The drive type is not mapped. See the <code>drive_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DriveTypeId = (typeof DriveTypeId)[keyof typeof DriveTypeId];

/** Label mapping for DriveTypeId values. */
export const DriveTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Removable",
  2: "Fixed",
  3: "Remote",
  4: "CD-ROM",
  5: "RAM Disk",
  99: "Other",
};
