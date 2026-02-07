/** MemoryActivity activity_id values. */
export const MemoryActivityActivityId = {
  UNKNOWN: 0,
  ALLOCATE_PAGE: 1,
  MODIFY_PAGE: 2,
  DELETE_PAGE: 3,
  BUFFER_OVERFLOW: 4,
  /** Data Execution Permission */
  DISABLE_DEP: 5,
  /** Data Execution Permission */
  ENABLE_DEP: 6,
  /** Read (Example: <code>ReadProcessMemory</code>) */
  READ: 7,
  /** Write (Example: <code>WriteProcessMemory</code>) */
  WRITE: 8,
  /** Map View (Example: <code>MapViewOfFile2</code>) */
  MAP_VIEW: 9,
  OTHER: 99,
} as const;

export type MemoryActivityActivityId =
  (typeof MemoryActivityActivityId)[keyof typeof MemoryActivityActivityId];

export const MemoryActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Allocate Page",
  2: "Modify Page",
  3: "Delete Page",
  4: "Buffer Overflow",
  5: "Disable DEP",
  6: "Enable DEP",
  7: "Read",
  8: "Write",
  9: "Map View",
  99: "Other",
};
