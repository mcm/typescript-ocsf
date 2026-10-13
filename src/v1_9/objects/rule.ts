import { z } from 'zod';

/**
 * The Rule object describes characteristics of a rule associated with a policy or an event.
 *
 * OCSF Object: Rule
 */
export interface RuleType {
  /** The name of the rule that generated the event. */
  name?: string;
  /** The unique identifier of the rule that generated the event. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The rule category. */
  category?: string;
  /** The description of the rule that generated the event. */
  desc?: string;
  /** The rule type. */
  type?: string;
  /** The rule version. For example: 1.1. */
  version?: string;
}

type RuleShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  category: z.ZodOptional<z.ZodString>;
  desc: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  version: z.ZodOptional<z.ZodString>;
};

const RuleSchema: z.ZodObject<RuleShape, z.core.$strict> = z.strictObject({
  /** The name of the rule that generated the event. */
  name: z.string().optional(),
  /** The unique identifier of the rule that generated the event. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The rule category. */
  category: z.string().optional(),
  /** The description of the rule that generated the event. */
  desc: z.string().optional(),
  /** The rule type. */
  type: z.string().optional(),
  /** The rule version. For example: 1.1. */
  version: z.string().optional(),
});

export const Rule = RuleSchema;

/** Value → label mappings for each enum field of Rule. */
export const RuleLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
