/** DatastoreActivity activity_id values. */
export const DatastoreActivityActivityId = {
  UNKNOWN: 0,
  /** The 'Read' activity involves accessing specific data record details. */
  READ: 1,
  /** The 'Update' activity pertains to modifying specific data record details. */
  UPDATE: 2,
  /** The 'Connect' activity involves establishing a connection to the datastore. */
  CONNECT: 3,
  /** The 'Query' activity involves retrieving a filtered subset of data based on specific criteria. */
  QUERY: 4,
  /** The 'Write' activity involves writing specific data record details. */
  WRITE: 5,
  /** The 'Create' activity involves generating new data record details. */
  CREATE: 6,
  /** The 'Delete' activity involves removing specific data record details. */
  DELETE: 7,
  /** The 'List' activity provides an overview of existing data records. */
  LIST: 8,
  /** The 'Encrypt' activity involves securing data by encrypting a specific data record. */
  ENCRYPT: 9,
  /** The 'Decrypt' activity involves converting encrypted data back to its original format. */
  DECRYPT: 10,
  OTHER: 99,
} as const;

export type DatastoreActivityActivityId =
  (typeof DatastoreActivityActivityId)[keyof typeof DatastoreActivityActivityId];

export const DatastoreActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Read",
  2: "Update",
  3: "Connect",
  4: "Query",
  5: "Write",
  6: "Create",
  7: "Delete",
  8: "List",
  9: "Encrypt",
  10: "Decrypt",
  99: "Other",
};
