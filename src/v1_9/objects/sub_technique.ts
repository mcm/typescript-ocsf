import { z } from 'zod';

/**
 * The MITRE Sub-technique object describes the ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack.
 *
 * OCSF Object: MITRE Sub-technique
 */
export interface SubTechniqueType {
  /** The name of the attack sub-technique. For example: Scanning IP Blocks or User Execution: Unsafe ML Artifacts. */
  name?: string;
  /** The unique identifier of the attack sub-technique. For example: T1595.001 or AML.T0011.000. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The versioned permalink of the attack sub-technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/001/. */
  src_url?: string;
}

type SubTechniqueShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  src_url: z.ZodOptional<z.ZodString>;
};

const SubTechniqueSchema: z.ZodObject<SubTechniqueShape, z.core.$strict> = z.strictObject({
  /** The name of the attack sub-technique. For example: Scanning IP Blocks or User Execution: Unsafe ML Artifacts. */
  name: z.string().optional(),
  /** The unique identifier of the attack sub-technique. For example: T1595.001 or AML.T0011.000. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The versioned permalink of the attack sub-technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/001/. */
  src_url: z.string().optional(),
});

export const SubTechnique = SubTechniqueSchema;

/** Value → label mappings for each enum field of SubTechnique. */
export const SubTechniqueLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
