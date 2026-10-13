import { z } from 'zod';

import type { MitigationType } from './mitigation.js';
import type { SubTechniqueType } from './sub_technique.js';
import type { TacticType } from './tactic.js';
import type { TechniqueType } from './technique.js';

/**
 * The Attack object describes the tactic, technique, sub-technique & mitigation associated to an attack.
 *
 * OCSF Object: Attack Tactics & Techniques
 */
export interface AttackType {
  /** The Mitigation object describes the MITRE ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack. */
  mitigation?: MitigationType;
  /** The Sub-technique object describes the MITRE ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack. */
  sub_technique?: SubTechniqueType;
  /** The Tactic object describes the Tactic ID and/or name associated to an attack. */
  tactic?: TacticType;
  /** The Tactics associated with the attack technique. */
  tactics?: TacticType[];
  /** The Technique object describes the MITRE ATT&CK® or ATLAS™ Technique ID and/or name associated to an attack. */
  technique?: TechniqueType;
  /** The ATT&CK® or ATLAS™ Matrix version. */
  version?: string;
}

import { Mitigation } from './mitigation.js';
import { SubTechnique } from './sub_technique.js';
import { Tactic } from './tactic.js';
import { Technique } from './technique.js';

type AttackShape = {
  mitigation: z.ZodOptional<typeof Mitigation>;
  sub_technique: z.ZodOptional<typeof SubTechnique>;
  tactic: z.ZodOptional<typeof Tactic>;
  tactics: z.ZodOptional<z.ZodArray<typeof Tactic>>;
  technique: z.ZodOptional<typeof Technique>;
  version: z.ZodOptional<z.ZodString>;
};

const AttackSchema: z.ZodObject<AttackShape, z.core.$strict> = z.strictObject({
  /** The Mitigation object describes the MITRE ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack. */
  mitigation: Mitigation.optional(),
  /** The Sub-technique object describes the MITRE ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack. */
  sub_technique: SubTechnique.optional(),
  /** The Tactic object describes the Tactic ID and/or name associated to an attack. */
  tactic: Tactic.optional(),
  /** The Tactics associated with the attack technique. */
  tactics: z.array(Tactic).optional(),
  /** The Technique object describes the MITRE ATT&CK® or ATLAS™ Technique ID and/or name associated to an attack. */
  technique: Technique.optional(),
  /** The ATT&CK® or ATLAS™ Matrix version. */
  version: z.string().optional(),
});

export const Attack = AttackSchema;

/** Value → label mappings for each enum field of Attack. */
export const AttackLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
