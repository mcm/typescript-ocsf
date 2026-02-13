import { z } from 'zod';

import { Container } from './container.js';

/**
 * The Response Elements object describes characteristics of an API response.
 *
 * OCSF Object: Response Elements
 */
export const Response: any = z.object({
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
}).passthrough();

export type ResponseType = z.infer<typeof Response>;
