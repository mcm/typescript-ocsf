import { z } from 'zod';

/**
 * The Rule object describes characteristics of a rule associated with a policy or an event.
 *
 * OCSF Object: Rule
 */
export const Rule = z.strictObject({
  /** The name of the rule that generated the event. */
  name: z.string().optional(),
  /** The unique identifier of the rule that generated the event. */
  uid: z.string().optional(),
  /** The rule category. */
  category: z.string().optional(),
  /** The description of the rule that generated the event. */
  desc: z.string().optional(),
  /** The rule type. */
  type: z.string().optional(),
  /** The rule version. For example: 1.1. */
  version: z.string().optional(),
});

export type RuleType = z.infer<typeof Rule>;
