import { z } from 'zod';

import type { PolicyType } from './policy.js';

/**
 * The Additional Restriction object describes supplementary access controls and guardrails that constrain or limit granted permissions beyond the primary policy. These restrictions are typically applied through hierarchical policy frameworks, organizational controls, or conditional access mechanisms. Examples include AWS Service Control Policies (SCPs), Resource Control Policies (RCPs), Azure Management Group policies, GCP Organization policies, conditional access policies, IP restrictions, time-based constraints, and MFA requirements.
 *
 * OCSF Object: Additional Restriction
 */
export interface AdditionalRestrictionType {
  /** Detailed information about the policy document that defines this restriction, including policy metadata, type, scope, and the specific rules or conditions that implement the access control. */
  policy: PolicyType;
  /** The current status of the policy restriction, normalized to the caption of the status_id enum value. */
  status?: string;
  /** The normalized status identifier indicating the applicability of this policy restriction. */
  status_id?: 0 | 1 | 2 | 3 | 99;
}

import { Policy } from './policy.js';

type AdditionalRestrictionShape = {
  policy: typeof Policy;
  status: z.ZodOptional<z.ZodString>;
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
};

const AdditionalRestrictionSchema: z.ZodObject<AdditionalRestrictionShape, z.core.$strict> = z.strictObject({
  /** Detailed information about the policy document that defines this restriction, including policy metadata, type, scope, and the specific rules or conditions that implement the access control. */
  policy: Policy,
  /** The current status of the policy restriction, normalized to the caption of the status_id enum value. */
  status: z.string().optional(),
  /** The normalized status identifier indicating the applicability of this policy restriction. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
});

export const AdditionalRestriction = AdditionalRestrictionSchema;

/** Value → label mappings for each enum field of AdditionalRestriction. */
export const AdditionalRestrictionLabels: Readonly<Record<"status_id", Readonly<Record<number, string>>>> = {
  status_id: {
    0: "Unknown",
    1: "Applicable",
    2: "Inapplicable",
    3: "Evaluation Error",
    99: "Other",
  },
};
