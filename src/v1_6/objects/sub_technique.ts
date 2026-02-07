import { z } from "zod";

/**
 * The MITRE Sub-technique object describes the ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack.
 *
 * OCSF Object: MITRE Sub-technique
 */
export interface SubTechniqueType {
  /** The name of the attack sub-technique. For example: Scanning IP Blocks or User Execution: Unsafe ML Artifacts. */
  name?: string | undefined;
  /** The unique identifier of the attack sub-technique. For example: T1595.001 or AML.T0011.000. */
  uid?: string | undefined;
  /** The versioned permalink of the attack sub-technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/001/. */
  src_url?: string | undefined;
  [key: string]: unknown;
}

export const SubTechnique: z.ZodType<SubTechniqueType> = z
  .object({
    /** The name of the attack sub-technique. For example: Scanning IP Blocks or User Execution: Unsafe ML Artifacts. */
    name: z.string().optional(),
    /** The unique identifier of the attack sub-technique. For example: T1595.001 or AML.T0011.000. */
    uid: z.string().optional(),
    /** The versioned permalink of the attack sub-technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/001/. */
    src_url: z.string().optional(),
  })
  .passthrough() as any;
