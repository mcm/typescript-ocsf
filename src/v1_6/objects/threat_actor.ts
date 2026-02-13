import { z } from 'zod';

/**
 * Threat actor is responsible for the observed malicious activity.
 *
 * OCSF Object: Threat Actor
 */
export const ThreatActor: any = z.object({
  /** The name of the threat actor. */
  name: z.string(),
  /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
  type: z.string().optional(),
  /** The normalized datastore resource type identifier. */
  type_id: z.number().int().optional(),
}).passthrough();

export type ThreatActorType = z.infer<typeof ThreatActor>;
