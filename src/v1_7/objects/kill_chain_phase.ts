import { z } from "zod";

/**
 * The Kill Chain Phase object represents a single phase of a cyber attack, including the initial reconnaissance and planning stages up to the final objective of the attacker. It provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. See <a target='_blank' href='https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html'>Cyber Kill Chain®</a>.
 *
 * OCSF Object: Kill Chain Phase
 */
export interface KillChainPhaseType {
  /** The cyber kill chain phase. */
  phase?: string | undefined;
  /** The cyber kill chain phase identifier. */
  phase_id: number;
  [key: string]: unknown;
}

export const KillChainPhase: z.ZodType<KillChainPhaseType> = z
  .object({
    /** The cyber kill chain phase. */
    phase: z.string().optional(),
    /** The cyber kill chain phase identifier. */
    phase_id: z.number().int(),
  })
  .passthrough() as any;
