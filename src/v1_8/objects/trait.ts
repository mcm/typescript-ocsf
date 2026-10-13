import { z } from 'zod';

/**
 * Describes a characteristic or feature of an entity that was observed. For example, this object can be used to represent specific characteristics derived from events or findings that can be surfaced as distinguishing traits of the entity in question.
 *
 * OCSF Object: Trait
 */
export interface TraitType {
  /** The name of the trait. */
  name?: string;
  /** The unique identifier of the trait. */
  uid?: string;
  /** The high-level grouping or classification this trait belongs to. */
  category?: string;
  /** The type of the trait. For example, this can be used to indicate if the trait acts as a contributing factor (increases risk/severity) or a mitigating factor (decreases risk/severity), in the context of the related finding. */
  type?: string;
  /** The values of the trait. */
  values?: string[];
}

type TraitShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  category: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  values: z.ZodOptional<z.ZodArray<z.ZodString>>;
};

const TraitSchema: z.ZodObject<TraitShape, z.core.$strict> = z.strictObject({
  /** The name of the trait. */
  name: z.string().optional(),
  /** The unique identifier of the trait. */
  uid: z.string().optional(),
  /** The high-level grouping or classification this trait belongs to. */
  category: z.string().optional(),
  /** The type of the trait. For example, this can be used to indicate if the trait acts as a contributing factor (increases risk/severity) or a mitigating factor (decreases risk/severity), in the context of the related finding. */
  type: z.string().optional(),
  /** The values of the trait. */
  values: z.array(z.string()).optional(),
});

export const Trait = TraitSchema;

/** Value → label mappings for each enum field of Trait. */
export const TraitLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
