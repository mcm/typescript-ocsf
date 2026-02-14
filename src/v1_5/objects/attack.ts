import { z } from 'zod';

import type { MitigationType } from './mitigation.js';
import type { SubTechniqueType } from './sub_technique.js';
import type { TacticType } from './tactic.js';
import type { TechniqueType } from './technique.js';

/**
 * The MITRE ATT&CK® & ATLAS™ object describes the tactic, technique, sub-technique & mitigation associated to an attack.
 *
 * OCSF Object: MITRE ATT&CK® & ATLAS™
 */
export interface AttackType {
  /** The Mitigation object describes the MITRE ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack. */
  mitigation?: MitigationType;
  /** The Sub-technique object describes the MITRE ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack. */
  sub_technique?: SubTechniqueType;
  /** The Tactic object describes the MITRE ATT&CK® or ATLAS™ Tactic ID and/or name that is associated to an attack. */
  tactic?: TacticType;
  /** The Tactic object describes the tactic ID and/or tactic name that are associated with the attack technique, as defined by ATT&CK® Matrix. */
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

const AttackSchema = z.strictObject({
  /** The Mitigation object describes the MITRE ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack. */
  mitigation: Mitigation.optional(),
  /** The Sub-technique object describes the MITRE ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack. */
  sub_technique: SubTechnique.optional(),
  /** The Tactic object describes the MITRE ATT&CK® or ATLAS™ Tactic ID and/or name that is associated to an attack. */
  tactic: Tactic.optional(),
  /** The Tactic object describes the tactic ID and/or tactic name that are associated with the attack technique, as defined by ATT&CK® Matrix. */
  tactics: z.array(Tactic).optional(),
  /** The Technique object describes the MITRE ATT&CK® or ATLAS™ Technique ID and/or name associated to an attack. */
  technique: Technique.optional(),
  /** The ATT&CK® or ATLAS™ Matrix version. */
  version: z.string().optional(),
});

export const Attack = AttackSchema;
