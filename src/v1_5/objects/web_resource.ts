import { z } from "zod";

import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";

/**
 * The Web Resource object describes characteristics of a web resource that was affected by the activity/event.
 *
 * OCSF Object: Web Resource
 */
export interface WebResourceType {
  /** The name of the web resource. */
  name?: string | undefined;
  /** The unique identifier of the web resource. */
  uid?: string | undefined;
  /** The time when the resource was created. */
  created_time?: number | undefined;
  /** Details of the web resource, e.g, file details, search results or application-defined resource. */
  data?: Record<string, unknown> | undefined;
  /** The list of labels associated to the resource. */
  labels?: string[] | undefined;
  /** The time when the resource was last modified. */
  modified_time?: number | undefined;
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags?: KeyValueObjectType[] | undefined;
  /** The web resource type as defined by the event source. */
  type?: string | undefined;
  /** The alternative unique identifier of the resource. */
  uid_alt?: string | undefined;
  /** Description of the web resource. */
  desc?: string | undefined;
  /** The URL pointing towards the source of the web resource. */
  url_string?: string | undefined;
  [key: string]: unknown;
}

export const WebResource: z.ZodType<WebResourceType> = z
  .object({
    /** The name of the web resource. */
    name: z.string().optional(),
    /** The unique identifier of the web resource. */
    uid: z.string().optional(),
    /** The time when the resource was created. */
    created_time: z.number().int().optional(),
    /** Details of the web resource, e.g, file details, search results or application-defined resource. */
    data: z.record(z.unknown()).optional(),
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
  })
  .passthrough() as any;
