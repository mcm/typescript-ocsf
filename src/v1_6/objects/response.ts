import { z } from "zod";

import { Container, type ContainerType } from "./container.js";

/**
 * The Response Elements object describes characteristics of an API response.
 *
 * OCSF Object: Response Elements
 */
export interface ResponseType {
  /** The numeric response sent to a request. */
  code?: number | undefined;
  /** When working with containerized applications, the set of containers which write to the standard the output of a particular logging driver. For example, this may be the set of containers involved in handling api requests and responses for a containerized application. */
  containers?: ContainerType[] | undefined;
  /** The additional data that is associated with the api response. */
  data?: Record<string, unknown> | undefined;
  /** Error Code */
  error?: string | undefined;
  /** Error Message */
  error_message?: string | undefined;
  /** The communication flags that are associated with the api response. */
  flags?: string[] | undefined;
  /** The description of the event/finding, as defined by the source. */
  message?: string | undefined;
  [key: string]: unknown;
}

export const Response: z.ZodType<ResponseType> = z
  .object({
    /** The numeric response sent to a request. */
    code: z.number().int().optional(),
    /** When working with containerized applications, the set of containers which write to the standard the output of a particular logging driver. For example, this may be the set of containers involved in handling api requests and responses for a containerized application. */
    containers: z.array(Container).optional(),
    /** The additional data that is associated with the api response. */
    data: z.record(z.unknown()).optional(),
    /** Error Code */
    error: z.string().optional(),
    /** Error Message */
    error_message: z.string().optional(),
    /** The communication flags that are associated with the api response. */
    flags: z.array(z.string()).optional(),
    /** The description of the event/finding, as defined by the source. */
    message: z.string().optional(),
  })
  .passthrough() as any;
