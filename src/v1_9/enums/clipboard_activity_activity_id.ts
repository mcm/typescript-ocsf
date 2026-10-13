/** ClipboardActivity activity_id values. */
export const ClipboardActivityActivityId = {
  /** The event activity is unknown. */
  UNKNOWN: 0,
  /** A clipboard was read from. In user-interface terms, this is a 'paste' operation. If present, <code>source_process</code> is the process which performed the <code>Write</code> activity or, in other words, the process from which the data was copied. */
  READ: 1,
  /** A clipboard was written to. In user-interface terms, this is a 'copy' or 'cut' operation. */
  WRITE: 2,
  /** A clipboard was cleared. */
  CLEAR: 3,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type ClipboardActivityActivityId = (typeof ClipboardActivityActivityId)[keyof typeof ClipboardActivityActivityId];

export const ClipboardActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Read",
  2: "Write",
  3: "Clear",
  99: "Other",
};

export const ClipboardActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Read": 1,
  "Write": 2,
  "Clear": 3,
  "Other": 99,
};
