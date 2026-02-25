/** ApplicationError activity_id values. */
export const ApplicationErrorActivityId = {
  UNKNOWN: 0,
  /** The application has experienced an error. */
  GENERAL_ERROR: 1,
  /** The application has experienced an error translating (mapping) a raw event to OCSF. Including the original raw event in the raw_data field is highly recommended. */
  TRANSLATION_ERROR: 2,
  OTHER: 99,
} as const;

export type ApplicationErrorActivityId = (typeof ApplicationErrorActivityId)[keyof typeof ApplicationErrorActivityId];

export const ApplicationErrorActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "General Error",
  2: "Translation Error",
  99: "Other",
};

export const ApplicationErrorActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "General Error": 1,
  "Translation Error": 2,
  "Other": 99,
};
