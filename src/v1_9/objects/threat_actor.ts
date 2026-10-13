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

type ThreatActorShape = {
  name: z.ZodString;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
};

const ThreatActorSchema: z.ZodObject<ThreatActorShape, z.core.$strict> = z.strictObject({
  /** The name of the threat actor. */
  name: z.string(),
  /** The classification of the threat actor based on their motivations, capabilities, or affiliations. Common types include nation-state actors, cybercriminal groups, hacktivists, or insider threats. */
  type: z.string().optional(),
  /** The normalized datastore resource type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
});

export const ThreatActor = ThreatActorSchema;

/** Value → label mappings for each enum field of ThreatActor. */
export const ThreatActorLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Nation-state",
    2: "Cybercriminal",
    3: "Hacktivists",
    4: "Insider",
    99: "Other",
  },
};
