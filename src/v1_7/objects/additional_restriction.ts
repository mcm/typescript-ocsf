import { z } from 'zod';

import { Policy } from './policy.js';

/**
 * The Additional Restriction object describes supplementary access controls and guardrails that constrain or limit granted permissions beyond the primary policy. These restrictions are typically applied through hierarchical policy frameworks, organizational controls, or conditional access mechanisms. Examples include AWS Service Control Policies (SCPs), Resource Control Policies (RCPs), Azure Management Group policies, GCP Organization policies, conditional access policies, IP restrictions, time-based constraints, and MFA requirements.
 *
 * OCSF Object: Additional Restriction
 */
export const AdditionalRestriction = z.strictObject({
  /** Detailed information about the policy document that defines this restriction, including policy metadata, type, scope, and the specific rules or conditions that implement the access control. */
  policy: Policy,
  /** The current status of the policy restriction, normalized to the caption of the status_id enum value. */
  status: z.string().optional(),
  /** The normalized status identifier indicating the applicability of this policy restriction. */
  status_id: z.number().int().optional(),
});

export type AdditionalRestrictionType = z.infer<typeof AdditionalRestriction>;
