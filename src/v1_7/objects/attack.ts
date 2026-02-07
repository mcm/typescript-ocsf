import { z } from "zod";

import { Mitigation, type MitigationType } from "./mitigation.js";
import { SubTechnique, type SubTechniqueType } from "./sub_technique.js";
import { Tactic, type TacticType } from "./tactic.js";
import { Technique, type TechniqueType } from "./technique.js";

/**
 * The MITRE ATT&CK® & ATLAS™ object describes the tactic, technique, sub-technique & mitigation associated to an attack.
 *
 * OCSF Object: MITRE ATT&CK® & ATLAS™
 */
export interface AttackType {
  /** The Mitigation object describes the MITRE ATT&CK® or ATLAS™ Mitigation ID and/or name that is associated to an attack. */
  mitigation?: MitigationType | undefined;
  /** The Sub-technique object describes the MITRE ATT&CK® or ATLAS™ Sub-technique ID and/or name associated to an attack. */
  sub_technique?: SubTechniqueType | undefined;
  /** The Tactic object describes the MITRE ATT&CK® or ATLAS™ Tactic ID and/or name that is associated to an attack. */
  tactic?: TacticType | undefined;
  /** The Tactic object describes the tactic ID and/or tactic name that are associated with the attack technique, as defined by ATT&CK® Matrix. */
  tactics?: TacticType[] | undefined;
  /** The Technique object describes the MITRE ATT&CK® or ATLAS™ Technique ID and/or name associated to an attack. */
  technique?: TechniqueType | undefined;
  /** The ATT&CK® or ATLAS™ Matrix version. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Attack: z.ZodType<AttackType> = z
  .object({
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
  })
  .passthrough() as any;
