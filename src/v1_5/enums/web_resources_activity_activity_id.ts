/** WebResourcesActivity activity_id values. */
export const WebResourcesActivityActivityId = {
  UNKNOWN: 0,
  /** One or more web resources were created. */
  CREATE: 1,
  /** One or more web resources were read / viewed. */
  READ: 2,
  /** One or more web resources were updated. */
  UPDATE: 3,
  /** One or more web resources were deleted. */
  DELETE: 4,
  /** A search was performed on one or more web resources. */
  SEARCH: 5,
  /** One or more web resources were imported into an Application. */
  IMPORT: 6,
  /** One or more web resources were exported from an Application. */
  EXPORT: 7,
  /** One or more web resources were shared. */
  SHARE: 8,
  OTHER: 99,
} as const;

export type WebResourcesActivityActivityId =
  (typeof WebResourcesActivityActivityId)[keyof typeof WebResourcesActivityActivityId];

export const WebResourcesActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Update",
  4: "Delete",
  5: "Search",
  6: "Import",
  7: "Export",
  8: "Share",
  99: "Other",
};
