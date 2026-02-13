import { z } from 'zod';

/**
 * The Entity object is an unordered collection of attributes, with a name and unique identifier. It serves as a base object that defines a set of attributes and default constraints available in all objects that extend it.
 *
 * OCSF Object: Entity
 */
export const Entity = z.strictObject({
  /** The name of the entity. */
  name: z.string().optional(),
  /** The unique identifier of the entity. */
  uid: z.string().optional(),
});

export type EntityType = z.infer<typeof Entity>;
