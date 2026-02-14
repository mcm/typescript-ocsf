import { z } from 'zod';

import type { NetworkEndpointType } from './network_endpoint.js';

/**
 * The Endpoint Connection object contains information detailing a connection attempt to an endpoint.
 *
 * OCSF Object: Endpoint Connection
 */
export interface EndpointConnectionType {
  /** A numerical response status code providing details about the connection. */
  code?: number;
  /** Provides characteristics of the network endpoint. */
  network_endpoint?: NetworkEndpointType;
}

import { NetworkEndpoint } from './network_endpoint.js';

const EndpointConnectionSchema = z.strictObject({
  /** A numerical response status code providing details about the connection. */
  code: z.number().int().optional(),
  /** Provides characteristics of the network endpoint. */
  network_endpoint: NetworkEndpoint.optional(),
});

export const EndpointConnection = EndpointConnectionSchema;
