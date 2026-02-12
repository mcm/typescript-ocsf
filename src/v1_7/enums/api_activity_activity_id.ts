/** ApiActivity activity_id values. */
export const ApiActivityActivityId = {
  UNKNOWN: 0,
  /** The API call in the event pertains to a 'create' activity. */
  CREATE: 1,
  /** The API call in the event pertains to a 'read' activity. */
  READ: 2,
  /** The API call in the event pertains to a 'update' activity. */
  UPDATE: 3,
  /** The API call in the event pertains to a 'delete' activity. */
  DELETE: 4,
  OTHER: 99,
} as const;

export type ApiActivityActivityId = (typeof ApiActivityActivityId)[keyof typeof ApiActivityActivityId];

export const ApiActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Update",
  4: "Delete",
  99: "Other",
};
