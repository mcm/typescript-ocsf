import { z } from 'zod';

/**
 * The Entity object is an unordered collection of attributes, with a name and unique identifier. It serves as a base object that defines a set of attributes and default constraints available in all objects that extend it.
 *
 * OCSF Object: Entity
 */
export interface EntityType {
  /** The name of the entity. */
  name?: string;
  /** The unique identifier of the entity. */
  uid?: string;
}

type EntityShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
};

const EntitySchema: z.ZodObject<EntityShape, z.core.$strict> = z.strictObject({
  /** The name of the entity. */
  name: z.string().optional(),
  /** The unique identifier of the entity. */
  uid: z.string().optional(),
});

export const Entity = EntitySchema;

/** Value → label mappings for each enum field of Entity. */
export const EntityLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
