import { z } from "zod";

/**
 * The Entity object is an unordered collection of attributes, with a name and unique identifier. It serves as a base object that defines a set of attributes and default constraints available in all objects that extend it.
 *
 * OCSF Object: Entity
 */
export interface EntityType {
  /** The name of the entity. */
  name?: string | undefined;
  /** The unique identifier of the entity. */
  uid?: string | undefined;
  [key: string]: unknown;
}

export const Entity: z.ZodType<EntityType> = z
  .object({
    /** The name of the entity. */
    name: z.string().optional(),
    /** The unique identifier of the entity. */
    uid: z.string().optional(),
  })
  .passthrough() as any;
