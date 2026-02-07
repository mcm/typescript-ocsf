import { z } from "zod";

/**
 * Describes a characteristic or feature of an entity that was observed. For example, this object can be used to represent specific characteristics derived from events or findings that can be surfaced as distinguishing traits of the entity in question.
 *
 * OCSF Object: Trait
 */
export interface TraitType {
  /** The name of the trait. */
  name?: string | undefined;
  /** The unique identifier of the trait. */
  uid?: string | undefined;
  /** The high-level grouping or classification this trait belongs to. */
  category?: string | undefined;
  /** The type of the trait. For example, this can be used to indicate if the trait acts as a contributing factor (increases risk/severity) or a mitigating factor (decreases risk/severity), in the context of the related finding. */
  type?: string | undefined;
  /** The values of the trait. */
  values?: string[] | undefined;
  [key: string]: unknown;
}

export const Trait: z.ZodType<TraitType> = z
  .object({
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
  })
  .passthrough() as any;
