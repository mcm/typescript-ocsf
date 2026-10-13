import { z } from 'zod';

import type { OccurrenceDetailsType } from './occurrence_details.js';
import type { RuleType } from './rule.js';

/**
 * The Discovery Details object describes results of a discovery task/job. Each result may be due to the violation of a <code>rule</code> associated with a <code>policy</code> and have multiple <code>occurrences</code>.
 *
 * OCSF Object: Discovery Details
 */
export interface DiscoveryDetailsType {
  /** The number of discovered entities of the specified type. */
  count?: number;
  /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
  occurrence_details?: OccurrenceDetailsType;
  /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
  occurrences?: OccurrenceDetailsType[];
  /** The rule associated with this discovery, usually part of the higher level policy from an enclosing class or object. */
  rule?: RuleType;
  /** The specific type of information that was discovered. e.g. name, phone_number, etc. */
  type?: string;
  /** Optionally, the specific value of discovered information. */
  value?: string;
}

import { OccurrenceDetails } from './occurrence_details.js';
import { Rule } from './rule.js';

type DiscoveryDetailsShape = {
  count: z.ZodOptional<z.ZodNumber>;
  occurrence_details: z.ZodOptional<typeof OccurrenceDetails>;
  occurrences: z.ZodOptional<z.ZodArray<typeof OccurrenceDetails>>;
  rule: z.ZodOptional<typeof Rule>;
  type: z.ZodOptional<z.ZodString>;
  value: z.ZodOptional<z.ZodString>;
};

const DiscoveryDetailsSchema: z.ZodObject<DiscoveryDetailsShape, z.core.$strict> = z.strictObject({
  /** The number of discovered entities of the specified type. */
  count: z.number().int().optional(),
  /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
  occurrence_details: OccurrenceDetails.optional(),
  /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
  occurrences: z.array(OccurrenceDetails).optional(),
  /** The rule associated with this discovery, usually part of the higher level policy from an enclosing class or object. */
  rule: Rule.optional(),
  /** The specific type of information that was discovered. e.g. name, phone_number, etc. */
  type: z.string().optional(),
  /** Optionally, the specific value of discovered information. */
  value: z.string().optional(),
});

export const DiscoveryDetails = DiscoveryDetailsSchema;

/** Value → label mappings for each enum field of DiscoveryDetails. */
export const DiscoveryDetailsLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
