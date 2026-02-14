import { z } from 'zod';

import type { KeyValueObjectType } from './key_value_object.js';

/**
 * The Service object describes characteristics of a service, <code> e.g. AWS EC2. </code>
 *
 * OCSF Object: Service
 */
export interface ServiceType {
  /** The name of the service. */
  name?: string;
  /** The unique identifier of the service. */
  uid?: string;
  /** The list of labels associated with the service. */
  labels?: string[];
  /** The list of tags; {key:value} pairs associated to the service. */
  tags?: KeyValueObjectType[];
  /** The version of the service. */
  version?: string;
}

import { KeyValueObject } from './key_value_object.js';

const ServiceSchema = z.strictObject({
  /** The name of the service. */
  name: z.string().optional(),
  /** The unique identifier of the service. */
  uid: z.string().optional(),
  /** The list of labels associated with the service. */
  labels: z.array(z.string()).optional(),
  /** The list of tags; {key:value} pairs associated to the service. */
  tags: z.array(KeyValueObject).optional(),
  /** The version of the service. */
  version: z.string().optional(),
});

export const Service = ServiceSchema;
