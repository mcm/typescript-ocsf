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

type EndpointConnectionShape = {
  code: z.ZodOptional<z.ZodNumber>;
  network_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
};

const EndpointConnectionSchema: z.ZodObject<EndpointConnectionShape, z.core.$strict> = z.strictObject({
  /** A numerical response status code providing details about the connection. */
  code: z.number().int().optional(),
  /** Provides characteristics of the network endpoint. */
  network_endpoint: NetworkEndpoint.optional(),
});

export const EndpointConnection = EndpointConnectionSchema;

/** Value → label mappings for each enum field of EndpointConnection. */
export const EndpointConnectionLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
