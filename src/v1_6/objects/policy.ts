import { z } from "zod";

import { Group, type GroupType } from "./group.js";

/**
 * The Policy object describes the policies that are applicable. <p>Policy attributes provide traceability to the operational state of the security product at the time that the event was captured, facilitating forensics, troubleshooting, and policy tuning/adjustments.</p>
 *
 * OCSF Object: Policy
 */
export interface PolicyType {
  /** The policy name. For example: AdministratorAccess Policy. */
  name?: string | undefined;
  /** A unique identifier of the policy instance. */
  uid?: string | undefined;
  /** Additional data about the policy such as the underlying JSON policy itself or other details. */
  data?: Record<string, unknown> | undefined;
  /** The description of the policy. */
  desc?: string | undefined;
  /** The policy group. */
  group?: GroupType | undefined;
  /** A determination if the content of a policy was applied to a target or request, or not. */
  is_applied?: boolean | undefined;
  /** The policy type. For example: Identity Policy, Resource Policy, Service Control Policy, etc./code>. */
  type?: string | undefined;
  /** The policy version number. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Policy: z.ZodType<PolicyType> = z
  .object({
    /** The policy name. For example: AdministratorAccess Policy. */
    name: z.string().optional(),
    /** A unique identifier of the policy instance. */
    uid: z.string().optional(),
    /** Additional data about the policy such as the underlying JSON policy itself or other details. */
    data: z.record(z.unknown()).optional(),
    /** The description of the policy. */
    desc: z.string().optional(),
    /** The policy group. */
    group: Group.optional(),
    /** A determination if the content of a policy was applied to a target or request, or not. */
    is_applied: z.boolean().optional(),
    /** The policy type. For example: Identity Policy, Resource Policy, Service Control Policy, etc./code>. */
    type: z.string().optional(),
    /** The policy version number. */
    version: z.string().optional(),
  })
  .passthrough() as any;
