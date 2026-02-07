import { z } from "zod";

import { Group, type GroupType } from "./group.js";
import { Request, type RequestType } from "./request.js";
import { Response, type ResponseType } from "./response.js";
import { Service, type ServiceType } from "./service.js";

/**
 * The API, or Application Programming Interface, object represents  information pertaining to an API request and response.
 *
 * OCSF Object: API
 */
export interface ApiType {
  /** The information pertaining to the API group. */
  group?: GroupType | undefined;
  /** Verb/Operation associated with the request */
  operation: string;
  /** Details pertaining to the API request. */
  request?: RequestType | undefined;
  /** Details pertaining to the API response. */
  response?: ResponseType | undefined;
  /** The information pertaining to the API service. */
  service?: ServiceType | undefined;
  /** The version of the API service. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Api: z.ZodType<ApiType> = z
  .object({
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
  })
  .passthrough() as any;
