import { z } from 'zod';

/**
 * The Firewall Rule object represents a specific rule within a firewall policy or event. It contains information about a rule's configuration, properties, and associated actions that define how network traffic is handled by the firewall.
 *
 * OCSF Object: Firewall Rule
 */
export interface FirewallRuleType {
  /** The name of the rule that generated the event. */
  name?: string;
  /** The unique identifier of the rule that generated the event. */
  uid?: string;
  /** The rule category. */
  category?: string;
  /** The description of the rule that generated the event. */
  desc?: string;
  /** The rule type. */
  type?: string;
  /** The rule version. For example: 1.1. */
  version?: string;
  /** The rule trigger condition for the rule. For example: SQL_INJECTION. */
  condition?: string;
  /** The rule response time duration, usually used for challenge completion time. */
  duration?: number;
  /** The data in a request that rule matched. For example: '["10","and","1"]'. */
  match_details?: string[];
  /** The location of the matched data in the source which resulted in the triggered firewall rule. For example: HEADER. */
  match_location?: string;
  /** The rate limit for a rate-based rule. */
  rate_limit?: number;
  /** The sensitivity of the firewall rule in the matched event. For example: HIGH. */
  sensitivity?: string;
}

const FirewallRuleSchema: z.ZodType<FirewallRuleType> = z.strictObject({
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
  /** The rule trigger condition for the rule. For example: SQL_INJECTION. */
  condition: z.string().optional(),
  /** The rule response time duration, usually used for challenge completion time. */
  duration: z.number().int().optional(),
  /** The data in a request that rule matched. For example: '["10","and","1"]'. */
  match_details: z.array(z.string()).optional(),
  /** The location of the matched data in the source which resulted in the triggered firewall rule. For example: HEADER. */
  match_location: z.string().optional(),
  /** The rate limit for a rate-based rule. */
  rate_limit: z.number().int().optional(),
  /** The sensitivity of the firewall rule in the matched event. For example: HIGH. */
  sensitivity: z.string().optional(),
});

export const FirewallRule = FirewallRuleSchema;
