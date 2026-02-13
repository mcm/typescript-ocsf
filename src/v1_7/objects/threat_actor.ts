import { z } from 'zod';

/**
 * Threat actor is responsible for the observed malicious activity.
 *
 * OCSF Object: Threat Actor
 */
export const ThreatActor = z.strictObject({
  /** The name of the threat actor. */
  name: z.string(),
  /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
  type: z.string().optional(),
  /** The normalized datastore resource type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
});

export type ThreatActorType = z.infer<typeof ThreatActor>;
