import { z } from "zod";

import { Container, type ContainerType } from "./container.js";

/**
 * The Request Elements object describes characteristics of an API request.
 *
 * OCSF Object: Request Elements
 */
export interface RequestType {
  /** When working with containerized applications, the set of containers which write to the standard the output of a particular logging driver. For example, this may be the set of containers involved in handling api requests and responses for a containerized application. */
  containers?: ContainerType[] | undefined;
  /** The additional data that is associated with the api request. */
  data?: Record<string, unknown> | undefined;
  /** The communication flags that are associated with the api request. */
  flags?: string[] | undefined;
  /** The unique request identifier. */
  uid: string;
  [key: string]: unknown;
}

export const Request: z.ZodType<RequestType> = z
  .object({
    /** When working with containerized applications, the set of containers which write to the standard the output of a particular logging driver. For example, this may be the set of containers involved in handling api requests and responses for a containerized application. */
    containers: z.array(Container).optional(),
    /** The additional data that is associated with the api request. */
    data: z.record(z.unknown()).optional(),
    /** The communication flags that are associated with the api request. */
    flags: z.array(z.string()).optional(),
    /** The unique request identifier. */
    uid: z.string(),
  })
  .passthrough() as any;
