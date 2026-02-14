import { z } from 'zod';

import type { GroupType } from './group.js';
import type { RequestType } from './request.js';
import type { ResponseType } from './response.js';
import type { ServiceType } from './service.js';

/**
 * The API, or Application Programming Interface, object represents  information pertaining to an API request and response.
 *
 * OCSF Object: API
 */
export interface ApiType {
  /** The information pertaining to the API group. */
  group?: GroupType;
  /** Verb/Operation associated with the request */
  operation: string;
  /** Details pertaining to the API request. */
  request?: RequestType;
  /** Details pertaining to the API response. */
  response?: ResponseType;
  /** The information pertaining to the API service. */
  service?: ServiceType;
  /** The version of the API service. */
  version?: string;
}

import { Group } from './group.js';
import { Request } from './request.js';
import { Response } from './response.js';
import { Service } from './service.js';

const ApiSchema: z.ZodType<ApiType> = z.strictObject({
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
});

export const Api = ApiSchema;
