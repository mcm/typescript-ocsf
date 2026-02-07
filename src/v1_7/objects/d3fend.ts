import { z } from "zod";

import { D3fTactic, type D3fTacticType } from "./d3f_tactic.js";
import { D3fTechnique, type D3fTechniqueType } from "./d3f_technique.js";

/**
 * The MITRE D3FEND™ object describes the tactic & technique associated with a countermeasure.
 *
 * OCSF Object: MITRE D3FEND™
 */
export interface D3fendType {
  /** The Tactic object describes the tactic ID and/or name that is associated with a countermeasure. */
  d3f_tactic?: D3fTacticType | undefined;
  /** The Technique object describes the technique ID and/or name associated with a countermeasure. */
  d3f_technique?: D3fTechniqueType | undefined;
  /** The D3FEND™ Matrix version. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const D3fend: z.ZodType<D3fendType> = z
  .object({
    /** The Tactic object describes the tactic ID and/or name that is associated with a countermeasure. */
    d3f_tactic: D3fTactic.optional(),
    /** The Technique object describes the technique ID and/or name associated with a countermeasure. */
    d3f_technique: D3fTechnique.optional(),
    /** The D3FEND™ Matrix version. */
    version: z.string().optional(),
  })
  .passthrough() as any;
