/** DatastoreActivity type_id values. */
export const DatastoreActivityTypeId = {
  /** The datastore resource type is unknown. */
  UNKNOWN: 0,
  DATABASE: 1,
  DATABUCKET: 2,
  TABLE: 3,
  /** The datastore resource type is not mapped. */
  OTHER: 99,
} as const;

export type DatastoreActivityTypeId = (typeof DatastoreActivityTypeId)[keyof typeof DatastoreActivityTypeId];

export const DatastoreActivityTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Database",
  2: "Databucket",
  3: "Table",
  99: "Other",
};

export const DatastoreActivityTypeIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Database": 1,
  "Databucket": 2,
  "Table": 3,
  "Other": 99,
};
