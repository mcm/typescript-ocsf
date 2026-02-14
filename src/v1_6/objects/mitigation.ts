import { z } from 'zod';

import type { D3fendType } from './d3fend.js';

/**
 * The MITRE Mitigation object describes the ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack.
 *
 * OCSF Object: MITRE Mitigation
 */
export interface MitigationType {
  /** The Mitigation name that is associated with the attack technique. For example: Password Policies, or Code Signing. */
  name?: string;
  /** The Mitigation ID that is associated with the attack technique. For example: M1027, or AML.M0013. */
  uid?: string;
  /** The D3FEND countermeasures that are associated with the attack technique. For example: ATT&CK Technique T1003 is addressed by Mitigation M1027, and D3FEND Technique D3-OTP. */
  countermeasures?: D3fendType[];
  /** The versioned permalink of the Mitigation. For example: https://attack.mitre.org/versions/v14/mitigations/M1027. */
  src_url?: string;
}

import { D3fend } from './d3fend.js';

const MitigationSchema = z.strictObject({
  /** The Mitigation name that is associated with the attack technique. For example: Password Policies, or Code Signing. */
  name: z.string().optional(),
  /** The Mitigation ID that is associated with the attack technique. For example: M1027, or AML.M0013. */
  uid: z.string().optional(),
  /** The D3FEND countermeasures that are associated with the attack technique. For example: ATT&CK Technique T1003 is addressed by Mitigation M1027, and D3FEND Technique D3-OTP. */
  countermeasures: z.array(D3fend).optional(),
  /** The versioned permalink of the Mitigation. For example: https://attack.mitre.org/versions/v14/mitigations/M1027. */
  src_url: z.string().optional(),
});

export const Mitigation = MitigationSchema;
