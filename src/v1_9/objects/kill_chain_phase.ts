import { z } from 'zod';

/**
 * The Kill Chain Phase object represents a single phase of a cyber attack, including the initial reconnaissance and planning stages up to the final objective of the attacker. It provides a detailed description of each phase and its associated activities within the broader context of a cyber attack.
 *
 * OCSF Object: Kill Chain Phase
 */
export interface KillChainPhaseType {
  /** The cyber kill chain phase. */
  phase?: string;
  /** The cyber kill chain phase identifier. */
  phase_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
}

type KillChainPhaseShape = {
  phase: z.ZodOptional<z.ZodString>;
  phase_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<99>]>;
};

const KillChainPhaseSchema: z.ZodObject<KillChainPhaseShape, z.core.$strict> = z.strictObject({
  /** The cyber kill chain phase. */
  phase: z.string().optional(),
  /** The cyber kill chain phase identifier. */
  phase_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
});

export const KillChainPhase = KillChainPhaseSchema;

/** Value → label mappings for each enum field of KillChainPhase. */
export const KillChainPhaseLabels: Readonly<Record<"phase_id", Readonly<Record<number, string>>>> = {
  phase_id: {
    0: "Unknown",
    1: "Reconnaissance",
    2: "Weaponization",
    3: "Delivery",
    4: "Exploitation",
    5: "Installation",
    6: "Command & Control",
    7: "Actions on Objectives",
    99: "Other",
  },
};
