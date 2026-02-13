import { z } from 'zod';

import { D3fend } from './d3fend.js';

/**
 * The MITRE Mitigation object describes the ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack.
 *
 * OCSF Object: MITRE Mitigation
 */
export const Mitigation = z.strictObject({
  /** The Mitigation name that is associated with the attack technique. For example: Password Policies, or Code Signing. */
  name: z.string().optional(),
  /** The Mitigation ID that is associated with the attack technique. For example: M1027, or AML.M0013. */
  uid: z.string().optional(),
  /** The D3FEND countermeasures that are associated with the attack technique. For example: ATT&CK Technique T1003 is addressed by Mitigation M1027, and D3FEND Technique D3-OTP. */
  countermeasures: z.array(D3fend).optional(),
  /** The versioned permalink of the Mitigation. For example: https://attack.mitre.org/versions/v14/mitigations/M1027. */
  src_url: z.string().optional(),
});

export type MitigationType = z.infer<typeof Mitigation>;
