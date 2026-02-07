import { z } from "zod";

import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";

/**
 * The Service object describes characteristics of a service, <code> e.g. AWS EC2. </code>
 *
 * OCSF Object: Service
 */
export interface ServiceType {
  /** The name of the service. */
  name?: string | undefined;
  /** The unique identifier of the service. */
  uid?: string | undefined;
  /** The list of labels associated with the service. */
  labels?: string[] | undefined;
  /** The list of tags; {key:value} pairs associated to the service. */
  tags?: KeyValueObjectType[] | undefined;
  /** The version of the service. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Service: z.ZodType<ServiceType> = z
  .object({
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
  })
  .passthrough() as any;
