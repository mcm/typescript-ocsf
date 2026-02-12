import { z } from 'zod';

/**
 * A generic object allowing to define a <code>{key:value}</code> pair.
 *
 * OCSF Object: Key:Value object
 */
export const KeyValueObject = z.object({
  /** The name of the key. */
  name: z.string(),
  /** The value associated to the key. */
  value: z.string().optional(),
  /** Optional, the values associated to the key. You can populate this attribute, when you have multiple values for the same key. */
  values: z.array(z.string()).optional(),
}).passthrough() as any;

export type KeyValueObjectType = z.infer<typeof KeyValueObject>;
