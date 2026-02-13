import { z } from 'zod';

/**
 * The MITRE Technique object describes the ATT&CK® or ATLAS™ Technique ID and/or name associated to an attack.
 *
 * OCSF Object: MITRE Technique
 */
export const Technique: any = z.object({
  /** The name of the attack technique. For example: Active Scanning or AI Model Inference API Access. */
  name: z.string().optional(),
  /** The unique identifier of the attack technique. For example: T1595 or AML.T0040. */
  uid: z.string().optional(),
  /** The versioned permalink of the attack technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/. */
  src_url: z.string().optional(),
}).passthrough();

export type TechniqueType = z.infer<typeof Technique>;
