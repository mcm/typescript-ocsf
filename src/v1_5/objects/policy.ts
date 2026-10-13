import { z } from 'zod';

import type { GroupType } from './group.js';

/**
 * The Policy object describes the policies that are applicable. <p>Policy attributes provide traceability to the operational state of the security product at the time that the event was captured, facilitating forensics, troubleshooting, and policy tuning/adjustments.</p>
 *
 * OCSF Object: Policy
 */
export interface PolicyType {
  /** The policy name. For example: IAM Policy. */
  name?: string;
  /** A unique identifier of the policy instance. */
  uid?: string;
  /** Additional data about the policy such as the underlying JSON policy itself or other details. */
  data?: Record<string, unknown>;
  /** The description of the policy. */
  desc?: string;
  /** The policy group. */
  group?: GroupType;
  /** A determination if the content of a policy was applied to a target or request, or not. */
  is_applied?: boolean;
  /** The policy version number. */
  version?: string;
}

import { Group } from './group.js';

type PolicyShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  desc: z.ZodOptional<z.ZodString>;
  group: z.ZodOptional<typeof Group>;
  is_applied: z.ZodOptional<z.ZodBoolean>;
  version: z.ZodOptional<z.ZodString>;
};

const PolicySchema: z.ZodObject<PolicyShape, z.core.$strict> = z.strictObject({
  /** The policy name. For example: IAM Policy. */
  name: z.string().optional(),
  /** A unique identifier of the policy instance. */
  uid: z.string().optional(),
  /** Additional data about the policy such as the underlying JSON policy itself or other details. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** The description of the policy. */
  desc: z.string().optional(),
  /** The policy group. */
  group: Group.optional(),
  /** A determination if the content of a policy was applied to a target or request, or not. */
  is_applied: z.boolean().optional(),
  /** The policy version number. */
  version: z.string().optional(),
});

export const Policy = PolicySchema;

/** Value → label mappings for each enum field of Policy. */
export const PolicyLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
