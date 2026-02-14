import { z } from 'zod';

/**
 * Threat actor is responsible for the observed malicious activity.
 *
 * OCSF Object: Threat Actor
 */
export interface ThreatActorType {
  /** The name of the threat actor. */
  name: string;
  /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
  type?: string;
  /** The normalized datastore resource type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 99;
}

const ThreatActorSchema = z.strictObject({
  /** The name of the threat actor. */
  name: z.string(),
  /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
  type: z.string().optional(),
  /** The normalized datastore resource type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
});

export const ThreatActor = ThreatActorSchema;
