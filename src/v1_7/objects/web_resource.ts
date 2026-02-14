import { z } from 'zod';

import type { KeyValueObjectType } from './key_value_object.js';

/**
 * The Web Resource object describes characteristics of a web resource that was affected by the activity/event.
 *
 * OCSF Object: Web Resource
 */
export interface WebResourceType {
  /** The name of the web resource. */
  name?: string;
  /** The unique identifier of the web resource. */
  uid?: string;
  /** The time when the resource was created. */
  created_time?: number;
  /** Details of the web resource, e.g, file details, search results or application-defined resource. */
  data?: Record<string, unknown>;
  /** The list of labels associated to the resource. */
  labels?: string[];
  /** The time when the resource was last modified. */
  modified_time?: number;
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags?: KeyValueObjectType[];
  /** The web resource type as defined by the event source. */
  type?: string;
  /** The alternative unique identifier of the resource. */
  uid_alt?: string;
  /** Description of the web resource. */
  desc?: string;
  /** The URL pointing towards the source of the web resource. */
  url_string?: string;
}

import { KeyValueObject } from './key_value_object.js';

const WebResourceSchema = z.strictObject({
  /** The name of the web resource. */
  name: z.string().optional(),
  /** The unique identifier of the web resource. */
  uid: z.string().optional(),
  /** The time when the resource was created. */
  created_time: z.number().int().optional(),
  /** Details of the web resource, e.g, file details, search results or application-defined resource. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** The list of labels associated to the resource. */
  labels: z.array(z.string()).optional(),
  /** The time when the resource was last modified. */
  modified_time: z.number().int().optional(),
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags: z.array(KeyValueObject).optional(),
  /** The web resource type as defined by the event source. */
  type: z.string().optional(),
  /** The alternative unique identifier of the resource. */
  uid_alt: z.string().optional(),
  /** Description of the web resource. */
  desc: z.string().optional(),
  /** The URL pointing towards the source of the web resource. */
  url_string: z.string().optional(),
});

export const WebResource = WebResourceSchema;
