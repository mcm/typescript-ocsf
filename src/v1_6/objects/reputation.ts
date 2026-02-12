import { z } from 'zod';

/**
 * The Reputation object describes the reputation/risk score of an entity (e.g. device, user, domain).
 *
 * OCSF Object: Reputation
 */
export const Reputation = z.object({
  /** The reputation score as reported by the event source. */
  base_score: z.number(),
  /** The provider of the reputation information. */
  provider: z.string().optional(),
  /** The reputation score, normalized to the caption of the score_id value. In the case of 'Other', it is defined by the event source. */
  score: z.string().optional(),
  /** The normalized reputation score identifier. */
  score_id: z.number().int(),
}).passthrough() as any;

export type ReputationType = z.infer<typeof Reputation>;
