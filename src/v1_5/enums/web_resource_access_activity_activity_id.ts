/** WebResourceAccessActivity activity_id values. */
export const WebResourceAccessActivityActivityId = {
  UNKNOWN: 0,
  /** The incoming request has permission to the web resource. */
  ACCESS_GRANT: 1,
  /** The incoming request does not have permission to the web resource. */
  ACCESS_DENY: 2,
  /** The incoming request's access has been revoked due to security policy enforcements. */
  ACCESS_REVOKE: 3,
  /** An error occurred during processing the request. */
  ACCESS_ERROR: 4,
  OTHER: 99,
} as const;

export type WebResourceAccessActivityActivityId = (typeof WebResourceAccessActivityActivityId)[keyof typeof WebResourceAccessActivityActivityId];

export const WebResourceAccessActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Access Grant",
  2: "Access Deny",
  3: "Access Revoke",
  4: "Access Error",
  99: "Other",
};
