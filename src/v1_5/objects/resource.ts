import { z } from 'zod';

import { KeyValueObject } from './key_value_object.js';

/**
 * The Resource object contains attributes that provide information about a particular resource. It serves as a base object, offering attributes that help identify and classify the resource effectively.
 *
 * OCSF Object: Resource
 */
export const Resource = z.object({
  /** The name of the resource. */
  name: z.string().optional(),
  /** The unique identifier of the resource. */
  uid: z.string().optional(),
  /** The time when the resource was created. */
  created_time: z.number().int().optional(),
  /** Additional data describing the resource. */
  data: z.record(z.unknown()).optional(),
  /** The list of labels associated to the resource. */
  labels: z.array(z.string()).optional(),
  /** The time when the resource was last modified. */
  modified_time: z.number().int().optional(),
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags: z.array(KeyValueObject).optional(),
  /** The resource type as defined by the event source. */
  type: z.string().optional(),
  /** The alternative unique identifier of the resource. */
  uid_alt: z.string().optional(),
}).passthrough() as any;

export type ResourceType = z.infer<typeof Resource>;
