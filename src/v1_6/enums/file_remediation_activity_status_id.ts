/** FileRemediationActivity status_id values. */
export const FileRemediationActivityStatusId = {
  /** The status is unknown. */
  UNKNOWN: 0,
  SUCCESS: 1,
  FAILURE: 2,
  /** The target of the remediation does not exist. */
  DOES_NOT_EXIST: 3,
  /** The remediation was partially completed. */
  PARTIAL: 4,
  /** The remediation was not supported. */
  UNSUPPORTED: 5,
  /** There was an error during the remediation process. */
  ERROR: 6,
  /** The status is not mapped. See the <code>status</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type FileRemediationActivityStatusId = (typeof FileRemediationActivityStatusId)[keyof typeof FileRemediationActivityStatusId];

export const FileRemediationActivityStatusIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Success",
  2: "Failure",
  3: "Does Not Exist",
  4: "Partial",
  5: "Unsupported",
  6: "Error",
  99: "Other",
};

export const FileRemediationActivityStatusIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Success": 1,
  "Failure": 2,
  "Does Not Exist": 3,
  "Partial": 4,
  "Unsupported": 5,
  "Error": 6,
  "Other": 99,
};
