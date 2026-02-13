import { z } from 'zod';

/**
 * The Kill Chain Phase object represents a single phase of a cyber attack, including the initial reconnaissance and planning stages up to the final objective of the attacker. It provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. See <a target='_blank' href='https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html'>Cyber Kill Chain®</a>.
 *
 * OCSF Object: Kill Chain Phase
 */
export const KillChainPhase: any = z.object({
  /** The cyber kill chain phase. */
  phase: z.string().optional(),
  /** The cyber kill chain phase identifier. */
  phase_id: z.number().int(),
}).passthrough();

export type KillChainPhaseType = z.infer<typeof KillChainPhase>;
