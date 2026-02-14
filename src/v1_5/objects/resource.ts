import { z } from 'zod';

import type { KeyValueObjectType } from './key_value_object.js';

/**
 * The Resource object contains attributes that provide information about a particular resource. It serves as a base object, offering attributes that help identify and classify the resource effectively.
 *
 * OCSF Object: Resource
 */
export interface ResourceType {
  /** The name of the resource. */
  name?: string;
  /** The unique identifier of the resource. */
  uid?: string;
  /** The time when the resource was created. */
  created_time?: number;
  /** Additional data describing the resource. */
  data?: Record<string, unknown>;
  /** The list of labels associated to the resource. */
  labels?: string[];
  /** The time when the resource was last modified. */
  modified_time?: number;
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags?: KeyValueObjectType[];
  /** The resource type as defined by the event source. */
  type?: string;
  /** The alternative unique identifier of the resource. */
  uid_alt?: string;
}

import { KeyValueObject } from './key_value_object.js';

const ResourceSchema = z.strictObject({
  /** The name of the resource. */
  name: z.string().optional(),
  /** The unique identifier of the resource. */
  uid: z.string().optional(),
  /** The time when the resource was created. */
  created_time: z.number().int().optional(),
  /** Additional data describing the resource. */
  data: z.record(z.string(), z.unknown()).optional(),
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
});

export const Resource = ResourceSchema;
