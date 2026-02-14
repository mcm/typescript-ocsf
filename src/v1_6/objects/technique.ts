import { z } from 'zod';

/**
 * The MITRE Technique object describes the ATT&CK® or ATLAS™ Technique ID and/or name associated to an attack.
 *
 * OCSF Object: MITRE Technique
 */
export interface TechniqueType {
  /** The name of the attack technique. For example: Active Scanning or AI Model Inference API Access. */
  name?: string;
  /** The unique identifier of the attack technique. For example: T1595 or AML.T0040. */
  uid?: string;
  /** The versioned permalink of the attack technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/. */
  src_url?: string;
}

const TechniqueSchema = z.strictObject({
  /** The name of the attack technique. For example: Active Scanning or AI Model Inference API Access. */
  name: z.string().optional(),
  /** The unique identifier of the attack technique. For example: T1595 or AML.T0040. */
  uid: z.string().optional(),
  /** The versioned permalink of the attack technique. For example: https://attack.mitre.org/versions/v14/techniques/T1595/. */
  src_url: z.string().optional(),
});

export const Technique = TechniqueSchema;
