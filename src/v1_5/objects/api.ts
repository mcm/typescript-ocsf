import { z } from 'zod';

import { Group } from './group.js';
import { Request } from './request.js';
import { Response } from './response.js';
import { Service } from './service.js';

/**
 * The API, or Application Programming Interface, object represents  information pertaining to an API request and response.
 *
 * OCSF Object: API
 */
export const Api = z.object({
  /** The information pertaining to the API group. */
  group: Group.optional(),
  /** Verb/Operation associated with the request */
  operation: z.string(),
  /** Details pertaining to the API request. */
  request: Request.optional(),
  /** Details pertaining to the API response. */
  response: Response.optional(),
  /** The information pertaining to the API service. */
  service: Service.optional(),
  /** The version of the API service. */
  version: z.string().optional(),
}).passthrough();

export type ApiType = z.infer<typeof Api>;
