import { z } from "zod";

import { NetworkEndpoint, type NetworkEndpointType } from "./network_endpoint.js";

/**
 * The Endpoint Connection object contains information detailing a connection attempt to an endpoint.
 *
 * OCSF Object: Endpoint Connection
 */
export interface EndpointConnectionType {
  /** A numerical response status code providing details about the connection. */
  code?: number | undefined;
  /** Provides characteristics of the network endpoint. */
  network_endpoint?: NetworkEndpointType | undefined;
  [key: string]: unknown;
}

export const EndpointConnection: z.ZodType<EndpointConnectionType> = z
  .object({
    /** A numerical response status code providing details about the connection. */
    code: z.number().int().optional(),
    /** Provides characteristics of the network endpoint. */
    network_endpoint: NetworkEndpoint.optional(),
  })
  .passthrough() as any;
