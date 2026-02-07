/** Disposition ID values. */
export const DispositionId = {
  /** The disposition is unknown. */
  UNKNOWN: 0,
  /** Granted access or allowed the action to the protected resource. */
  ALLOWED: 1,
  /** Denied access or blocked the action to the protected resource. */
  BLOCKED: 2,
  /** A suspicious file or other content was moved to a benign location. */
  QUARANTINED: 3,
  /** A session was isolated on the network or within a browser. */
  ISOLATED: 4,
  /** A file or other content was deleted. */
  DELETED: 5,
  /** The request was detected as a threat and resulted in the connection being dropped. */
  DROPPED: 6,
  /** A custom action was executed such as running of a command script. Use the <code>message</code> attribute of the base class for details. */
  CUSTOM_ACTION: 7,
  /** A request or submission was approved. For example, when a form was properly filled out and submitted. This is distinct from <code>1</code> 'Allowed'. */
  APPROVED: 8,
  /** A quarantined file or other content was restored to its original location. */
  RESTORED: 9,
  /** A suspicious or risky entity was deemed to no longer be suspicious (re-scored). */
  EXONERATED: 10,
  /** A corrupt file or configuration was corrected. */
  CORRECTED: 11,
  /** A corrupt file or configuration was partially corrected. */
  PARTIALLY_CORRECTED: 12,
  /** A corrupt file or configuration was not corrected. */
  UNCORRECTED: 13,
  /** An operation was delayed, for example if a restart was required to finish the operation. */
  DELAYED: 14,
  /** Suspicious activity or a policy violation was detected without further action. */
  DETECTED: 15,
  /** The outcome of an operation had no action taken. */
  NO_ACTION: 16,
  /** The operation or action was logged without further action. */
  LOGGED: 17,
  /** A file or other entity was marked with extended attributes. */
  TAGGED: 18,
  /** The request or activity was detected as a threat and resulted in a notification but request was not blocked. */
  ALERT: 19,
  /** Counted the request or activity but did not determine whether to allow it or block it. */
  COUNT: 20,
  /** The request was detected as a threat and resulted in the connection being reset. */
  RESET: 21,
  /** Required the end user to solve a CAPTCHA puzzle to prove that a human being is sending the request. */
  CAPTCHA: 22,
  /** Ran a silent challenge that required the client session to verify that it's a browser, and not a bot. */
  CHALLENGE: 23,
  /** The requestor's access has been revoked due to security policy enforcements. Note: use the <code>Host</code> profile if the <code>User</code> or <code>Actor</code> requestor is not present in the event class. */
  ACCESS_REVOKED: 24,
  /** A request or submission was rejected.  For example, when a form was improperly filled out and submitted. This is distinct from <code>2</code> 'Blocked'. */
  REJECTED: 25,
  /** An attempt to access a resource was denied due to an authorization check that failed. This is a more specific disposition than <code>2</code> 'Blocked' and can be complemented with the <code>authorizations</code> attribute for more detail. */
  UNAUTHORIZED: 26,
  /** An error occurred during the processing of the activity or request. Use the <code>message</code> attribute of the base class for details. */
  ERROR: 27,
  /** The disposition is not mapped. See the <code>disposition</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DispositionId = (typeof DispositionId)[keyof typeof DispositionId];

/** Label mapping for DispositionId values. */
export const DispositionIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Allowed",
  2: "Blocked",
  3: "Quarantined",
  4: "Isolated",
  5: "Deleted",
  6: "Dropped",
  7: "Custom Action",
  8: "Approved",
  9: "Restored",
  10: "Exonerated",
  11: "Corrected",
  12: "Partially Corrected",
  13: "Uncorrected",
  14: "Delayed",
  15: "Detected",
  16: "No Action",
  17: "Logged",
  18: "Tagged",
  19: "Alert",
  20: "Count",
  21: "Reset",
  22: "Captcha",
  23: "Challenge",
  24: "Access Revoked",
  25: "Rejected",
  26: "Unauthorized",
  27: "Error",
  99: "Other",
};
