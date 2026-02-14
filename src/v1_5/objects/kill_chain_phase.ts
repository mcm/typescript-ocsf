import { z } from 'zod';

/**
 * The Kill Chain Phase object represents a single phase of a cyber attack, including the initial reconnaissance and planning stages up to the final objective of the attacker. It provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. See <a target='_blank' href='https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html'>Cyber Kill Chain®</a>.
 *
 * OCSF Object: Kill Chain Phase
 */
export interface KillChainPhaseType {
  /** The cyber kill chain phase. */
  phase?: string;
  /** The cyber kill chain phase identifier. */
  phase_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
}

const KillChainPhaseSchema = z.strictObject({
  /** The cyber kill chain phase. */
  phase: z.string().optional(),
  /** The cyber kill chain phase identifier. */
  phase_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
});

export const KillChainPhase = KillChainPhaseSchema;
