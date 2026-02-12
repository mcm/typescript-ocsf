import { z } from 'zod';

import { NetworkEndpoint } from './network_endpoint.js';

/**
 * The Endpoint Connection object contains information detailing a connection attempt to an endpoint.
 *
 * OCSF Object: Endpoint Connection
 */
export const EndpointConnection = z.object({
  /** A numerical response status code providing details about the connection. */
  code: z.number().int().optional(),
  /** Provides characteristics of the network endpoint. */
  network_endpoint: NetworkEndpoint.optional(),
}).passthrough() as any;

export type EndpointConnectionType = z.infer<typeof EndpointConnection>;
