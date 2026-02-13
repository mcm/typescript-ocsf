import { z } from 'zod';

import { Policy } from './policy.js';

/**
 * The Authorization Result object provides details about the authorization outcome and associated policies related to activity.
 *
 * OCSF Object: Authorization Result
 */
export const Authorization = z.strictObject({
  /** Authorization Result/outcome, e.g. allowed, denied. */
  decision: z.string().optional(),
  /** Details about the Identity/Access management policies that are applicable. */
  policy: Policy.optional(),
});

export type AuthorizationType = z.infer<typeof Authorization>;
