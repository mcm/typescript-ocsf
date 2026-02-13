import { z } from 'zod';

/**
 * The Reputation object describes the reputation/risk score of an entity (e.g. device, user, domain).
 *
 * OCSF Object: Reputation
 */
export const Reputation = z.strictObject({
  /** The reputation score as reported by the event source. */
  base_score: z.number(),
  /** The provider of the reputation information. */
  provider: z.string().optional(),
  /** The reputation score, normalized to the caption of the score_id value. In the case of 'Other', it is defined by the event source. */
  score: z.string().optional(),
  /** The normalized reputation score identifier. */
  score_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]),
});

export type ReputationType = z.infer<typeof Reputation>;
