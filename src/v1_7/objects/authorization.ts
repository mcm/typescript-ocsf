import { z } from "zod";

import { Policy, type PolicyType } from "./policy.js";

/**
 * The Authorization Result object provides details about the authorization outcome and associated policies related to activity.
 *
 * OCSF Object: Authorization Result
 */
export interface AuthorizationType {
  /** Authorization Result/outcome, e.g. allowed, denied. */
  decision?: string | undefined;
  /** Details about the Identity/Access management policies that are applicable. */
  policy?: PolicyType | undefined;
  [key: string]: unknown;
}

export const Authorization: z.ZodType<AuthorizationType> = z
  .object({
    /** Authorization Result/outcome, e.g. allowed, denied. */
    decision: z.string().optional(),
    /** Details about the Identity/Access management policies that are applicable. */
    policy: Policy.optional(),
  })
  .passthrough() as any;
