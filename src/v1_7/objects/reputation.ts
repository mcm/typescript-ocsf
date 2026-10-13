import { z } from 'zod';

/**
 * The Reputation object describes the reputation/risk score of an entity (e.g. device, user, domain).
 *
 * OCSF Object: Reputation
 */
export interface ReputationType {
  /** The reputation score as reported by the event source. */
  base_score: number;
  /** The provider of the reputation information. */
  provider?: string;
  /** The reputation score, normalized to the caption of the score_id value. In the case of 'Other', it is defined by the event source. */
  score?: string;
  /** The normalized reputation score identifier. */
  score_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
}

type ReputationShape = {
  base_score: z.ZodNumber;
  provider: z.ZodOptional<z.ZodString>;
  score: z.ZodOptional<z.ZodString>;
  score_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<99>]>;
};

const ReputationSchema: z.ZodObject<ReputationShape, z.core.$strict> = z.strictObject({
  /** The reputation score as reported by the event source. */
  base_score: z.number(),
  /** The provider of the reputation information. */
  provider: z.string().optional(),
  /** The reputation score, normalized to the caption of the score_id value. In the case of 'Other', it is defined by the event source. */
  score: z.string().optional(),
  /** The normalized reputation score identifier. */
  score_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]),
});

export const Reputation = ReputationSchema;

/** Value → label mappings for each enum field of Reputation. */
export const ReputationLabels: Readonly<Record<"score_id", Readonly<Record<number, string>>>> = {
  score_id: {
    0: "Unknown",
    1: "Very Safe",
    2: "Safe",
    3: "Probably Safe",
    4: "Leans Safe",
    5: "May not be Safe",
    6: "Exercise Caution",
    7: "Suspicious/Risky",
    8: "Possibly Malicious",
    9: "Probably Malicious",
    10: "Malicious",
    99: "Other",
  },
};
