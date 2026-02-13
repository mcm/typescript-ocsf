import { z } from 'zod';

/**
 * An unordered collection of attributes. It defines a set of attributes available in all objects. It can be also used as a generic object to log objects that are not otherwise defined by the schema.
 *
 * OCSF Object: Object
 */
export const OcsfObject: any = z.object({
}).passthrough();

export type OcsfObjectType = z.infer<typeof OcsfObject>;
