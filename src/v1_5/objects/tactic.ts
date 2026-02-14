import { z } from 'zod';

/**
 * The MITRE Tactic object describes the ATT&CK® or ATLAS™ Tactic ID and/or name that is associated to an attack.
 *
 * OCSF Object: MITRE Tactic
 */
export interface TacticType {
  /** The Tactic name that is associated with the attack technique. For example: Reconnaissance or ML Model Access. */
  name?: string;
  /** The Tactic ID that is associated with the attack technique. For example: TA0043, or AML.TA0000. */
  uid?: string;
  /** The versioned permalink of the Tactic. For example: https://attack.mitre.org/versions/v14/tactics/TA0043/. */
  src_url?: string;
}

const TacticSchema = z.strictObject({
  /** The Tactic name that is associated with the attack technique. For example: Reconnaissance or ML Model Access. */
  name: z.string().optional(),
  /** The Tactic ID that is associated with the attack technique. For example: TA0043, or AML.TA0000. */
  uid: z.string().optional(),
  /** The versioned permalink of the Tactic. For example: https://attack.mitre.org/versions/v14/tactics/TA0043/. */
  src_url: z.string().optional(),
});

export const Tactic = TacticSchema;
