import { z } from 'zod';

import type { AttackType } from './attack.js';
import type { PrivilegeInfoType } from './privilege_info.js';

/**
 * The Privilege Attack Info object groups privileges by the potential attack they could enable. It maps specific privileges to MITRE ATT&CK techniques, helping identify security risks associated with granted permissions.
 *
 * OCSF Object: Privilege Attack Info
 */
export interface PrivilegeAttackInfoType {
  /** The MITRE ATT&CK technique that these privileges could enable. */
  attack: AttackType;
  /** The list of privilege information objects, where each element describes a specific privilege that could enable the associated attack technique. */
  privilege_info_list: PrivilegeInfoType[];
}

import { Attack } from './attack.js';
import { PrivilegeInfo } from './privilege_info.js';

type PrivilegeAttackInfoShape = {
  attack: typeof Attack;
  privilege_info_list: z.ZodArray<typeof PrivilegeInfo>;
};

const PrivilegeAttackInfoSchema: z.ZodObject<PrivilegeAttackInfoShape, z.core.$strict> = z.strictObject({
  /** The MITRE ATT&CK technique that these privileges could enable. */
  attack: Attack,
  /** The list of privilege information objects, where each element describes a specific privilege that could enable the associated attack technique. */
  privilege_info_list: z.array(PrivilegeInfo),
});

export const PrivilegeAttackInfo = PrivilegeAttackInfoSchema;

/** Value → label mappings for each enum field of PrivilegeAttackInfo. */
export const PrivilegeAttackInfoLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
