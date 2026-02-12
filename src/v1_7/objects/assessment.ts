import { z } from 'zod';

import { Policy } from './policy.js';

/**
 * The Assessment object describes a point-in-time assessment, check, or evaluation of a specific configuration or signal against an asset, entity, person, or otherwise. For example, this can encapsulate <code>os_signals</code> from CrowdStrike Falcon Zero Trust Assessments, or account for <code>Datastore</code> configurations from Cyera, or capture details of Microsoft Intune configuration policies.
 *
 * OCSF Object: Assessment
 */
export const Assessment = z.object({
  /** The name of the configuration or signal being assessed. For example: Kernel Mode Code Integrity (KMCI) or publicAccessibilityState. */
  name: z.string().optional(),
  /** The unique identifier of the configuration or signal being assessed. For example: the signal_id. */
  uid: z.string().optional(),
  /** The category that the assessment is part of. For example: Prevention or Windows 10. */
  category: z.string().optional(),
  /** The description of the assessment criteria, or a description of the specific configuration or signal the assessment is targeting. */
  desc: z.string().optional(),
  /** Determines whether the assessment against the specific configuration or signal meets the assessments criteria. For example, if the assessment checks if a Datastore is encrypted or not, having encryption would be evaluated as true. */
  meets_criteria: z.boolean(),
  /** The details of any policy associated with an assessment. */
  policy: Policy.optional(),
}).passthrough() as any;

export type AssessmentType = z.infer<typeof Assessment>;
