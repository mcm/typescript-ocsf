import { z } from "zod";

/**
 * Threat actor is responsible for the observed malicious activity.
 *
 * OCSF Object: Threat Actor
 */
export interface ThreatActorType {
  /** The name of the threat actor. */
  name: string;
  /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
  type?: string | undefined;
  /** The normalized datastore resource type identifier. */
  type_id?: number | undefined;
  [key: string]: unknown;
}

export const ThreatActor: z.ZodType<ThreatActorType> = z
  .object({
    /** The name of the threat actor. */
    name: z.string(),
    /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
    type: z.string().optional(),
    /** The normalized datastore resource type identifier. */
    type_id: z.number().int().optional(),
  })
  .passthrough() as any;
