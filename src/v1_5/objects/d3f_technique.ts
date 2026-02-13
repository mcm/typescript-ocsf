import { z } from 'zod';

/**
 * The MITRE D3FEND™ Technique object describes the leaf defensive technique ID and/or name associated to a countermeasure.
 *
 * OCSF Object: MITRE D3FEND™ Technique
 */
export const D3fTechnique = z.object({
  /** The name of the defensive technique. For example: IO Port Restriction. */
  name: z.string().optional(),
  /** The unique identifier of the defensive technique. For example: D3-IOPR. */
  uid: z.string().optional(),
  /** The versioned permalink of the defensive technique. For example: https://d3fend.mitre.org/technique/d3f:IOPortRestriction/. */
  src_url: z.string().optional(),
}).passthrough();

export type D3fTechniqueType = z.infer<typeof D3fTechnique>;
