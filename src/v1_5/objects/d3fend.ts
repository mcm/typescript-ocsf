import { z } from 'zod';

import type { D3fTacticType } from './d3f_tactic.js';
import type { D3fTechniqueType } from './d3f_technique.js';

/**
 * The MITRE D3FEND™ object describes the tactic & technique associated with a countermeasure.
 *
 * OCSF Object: MITRE D3FEND™
 */
export interface D3fendType {
  /** The Tactic object describes the tactic ID and/or name that is associated with a countermeasure. */
  d3f_tactic?: D3fTacticType;
  /** The Technique object describes the technique ID and/or name associated with a countermeasure. */
  d3f_technique?: D3fTechniqueType;
  /** The D3FEND™ Matrix version. */
  version?: string;
}

import { D3fTactic } from './d3f_tactic.js';
import { D3fTechnique } from './d3f_technique.js';

const D3fendSchema: z.ZodType<D3fendType> = z.strictObject({
  /** The Tactic object describes the tactic ID and/or name that is associated with a countermeasure. */
  d3f_tactic: D3fTactic.optional(),
  /** The Technique object describes the technique ID and/or name associated with a countermeasure. */
  d3f_technique: D3fTechnique.optional(),
  /** The D3FEND™ Matrix version. */
  version: z.string().optional(),
});

export const D3fend = D3fendSchema;
