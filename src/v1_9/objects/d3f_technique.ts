import { z } from 'zod';

/**
 * The Defensive Technique object describes the leaf defensive technique ID and/or name associated to a countermeasure.
 *
 * OCSF Object: Defensive Technique
 */
export interface D3fTechniqueType {
  /** The name of the defensive technique. For example: IO Port Restriction. */
  name?: string;
  /** The unique identifier of the defensive technique. For example: D3-IOPR. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The versioned permalink of the defensive technique. For example: https://d3fend.mitre.org/technique/d3f:IOPortRestriction/ */
  src_url?: string;
}

type D3fTechniqueShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  src_url: z.ZodOptional<z.ZodString>;
};

const D3fTechniqueSchema: z.ZodObject<D3fTechniqueShape, z.core.$strict> = z.strictObject({
  /** The name of the defensive technique. For example: IO Port Restriction. */
  name: z.string().optional(),
  /** The unique identifier of the defensive technique. For example: D3-IOPR. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The versioned permalink of the defensive technique. For example: https://d3fend.mitre.org/technique/d3f:IOPortRestriction/ */
  src_url: z.string().optional(),
});

export const D3fTechnique = D3fTechniqueSchema;

/** Value → label mappings for each enum field of D3fTechnique. */
export const D3fTechniqueLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
