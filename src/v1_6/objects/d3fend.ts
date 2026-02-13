import { z } from 'zod';

import { D3fTactic } from './d3f_tactic.js';
import { D3fTechnique } from './d3f_technique.js';

/**
 * The MITRE D3FEND™ object describes the tactic & technique associated with a countermeasure.
 *
 * OCSF Object: MITRE D3FEND™
 */
export const D3fend: any = z.object({
  /** The Tactic object describes the tactic ID and/or name that is associated with a countermeasure. */
  d3f_tactic: D3fTactic.optional(),
  /** The Technique object describes the technique ID and/or name associated with a countermeasure. */
  d3f_technique: D3fTechnique.optional(),
  /** The D3FEND™ Matrix version. */
  version: z.string().optional(),
}).passthrough();

export type D3fendType = z.infer<typeof D3fend>;
