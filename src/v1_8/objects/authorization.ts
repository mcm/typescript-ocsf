import { z } from 'zod';

import type { PolicyType } from './policy.js';

/**
 * The Authorization Result object provides details about the authorization outcome and associated policies related to activity.
 *
 * OCSF Object: Authorization Result
 */
export interface AuthorizationType {
  /** Authorization Result/outcome, e.g. allowed, denied. */
  decision?: string;
  /** Details about the Identity/Access management policies that are applicable. */
  policy?: PolicyType;
}

import { Policy } from './policy.js';

type AuthorizationShape = {
  decision: z.ZodOptional<z.ZodString>;
  policy: z.ZodOptional<typeof Policy>;
};

const AuthorizationSchema: z.ZodObject<AuthorizationShape, z.core.$strict> = z.strictObject({
  /** Authorization Result/outcome, e.g. allowed, denied. */
  decision: z.string().optional(),
  /** Details about the Identity/Access management policies that are applicable. */
  policy: Policy.optional(),
});

export const Authorization = AuthorizationSchema;

/** Value → label mappings for each enum field of Authorization. */
export const AuthorizationLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
