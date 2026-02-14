import { z } from 'zod';

/**
 * The MITRE D3FEND™ Tactic object describes the tactic ID and/or name that is associated to an attack.
 *
 * OCSF Object: MITRE D3FEND™ Tactic
 */
export interface D3fTacticType {
  /** The tactic name that is associated with the defensive technique. For example: Isolate. */
  name?: string;
  /** The unique identifier of the defensive tactic. */
  uid?: string;
  /** The versioned permalink of the defensive tactic. For example: https://d3fend.mitre.org/tactic/d3f:Isolate/. */
  src_url?: string;
}

const D3fTacticSchema = z.strictObject({
  /** The tactic name that is associated with the defensive technique. For example: Isolate. */
  name: z.string().optional(),
  /** The unique identifier of the defensive tactic. */
  uid: z.string().optional(),
  /** The versioned permalink of the defensive tactic. For example: https://d3fend.mitre.org/tactic/d3f:Isolate/. */
  src_url: z.string().optional(),
});

export const D3fTactic = D3fTacticSchema;
