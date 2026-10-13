import { z } from 'zod';

/**
 * An unordered collection of attributes. It defines a set of attributes available in all objects. It can be also used as a generic object to log objects that are not otherwise defined by the schema.
 *
 * OCSF Object: Object
 */
export interface OcsfObjectType {
}

type OcsfObjectShape = {
};

const OcsfObjectSchema: z.ZodObject<OcsfObjectShape, z.core.$strict> = z.strictObject({
});

export const OcsfObject = OcsfObjectSchema;

/** Value → label mappings for each enum field of OcsfObject. */
export const OcsfObjectLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
