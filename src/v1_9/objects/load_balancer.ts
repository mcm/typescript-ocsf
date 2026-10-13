import { z } from 'zod';

import type { NetworkEndpointType } from './network_endpoint.js';
import type { EndpointConnectionType } from './endpoint_connection.js';
import type { MetricType } from './metric.js';

/**
 * The load balancer object describes the load balancer entity and contains additional information regarding the distribution of traffic across a network.
 *
 * OCSF Object: Load Balancer
 */
export interface LoadBalancerType {
  /** The name of the load balancer. */
  name?: string;
  /** The unique identifier for the load balancer. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The request classification as defined by the load balancer. */
  classification?: string;
  /** The numeric response status code detailing the connection from the load balancer to the destination target. */
  code?: number;
  /** The destination to which the load balancer is distributing traffic. */
  dst_endpoint?: NetworkEndpointType;
  /** An object detailing the load balancer connection attempts and responses. */
  endpoint_connections?: EndpointConnectionType[];
  /** The load balancer error message. */
  error_message?: string;
  /** The IP address of the load balancer node that handled the client request. Note: the load balancer may have other IP addresses, and this is not an IP address of the target/distribution endpoint - see dst_endpoint. */
  ip?: string;
  /** The load balancer message. */
  message?: string;
  /** General purpose metrics associated with the load balancer. */
  metrics?: MetricType[];
  /** The status detail contains additional status information about the load balancer distribution event. */
  status_detail?: string;
}

import { NetworkEndpoint } from './network_endpoint.js';
import { EndpointConnection } from './endpoint_connection.js';
import { Metric } from './metric.js';

type LoadBalancerShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  classification: z.ZodOptional<z.ZodString>;
  code: z.ZodOptional<z.ZodNumber>;
  dst_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  endpoint_connections: z.ZodOptional<z.ZodArray<typeof EndpointConnection>>;
  error_message: z.ZodOptional<z.ZodString>;
  ip: z.ZodOptional<z.ZodString>;
  message: z.ZodOptional<z.ZodString>;
  metrics: z.ZodOptional<z.ZodArray<typeof Metric>>;
  status_detail: z.ZodOptional<z.ZodString>;
};

const LoadBalancerSchema: z.ZodObject<LoadBalancerShape, z.core.$strict> = z.strictObject({
  /** The name of the load balancer. */
  name: z.string().optional(),
  /** The unique identifier for the load balancer. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The request classification as defined by the load balancer. */
  classification: z.string().optional(),
  /** The numeric response status code detailing the connection from the load balancer to the destination target. */
  code: z.number().int().optional(),
  /** The destination to which the load balancer is distributing traffic. */
  dst_endpoint: NetworkEndpoint.optional(),
  /** An object detailing the load balancer connection attempts and responses. */
  endpoint_connections: z.array(EndpointConnection).optional(),
  /** The load balancer error message. */
  error_message: z.string().optional(),
  /** The IP address of the load balancer node that handled the client request. Note: the load balancer may have other IP addresses, and this is not an IP address of the target/distribution endpoint - see dst_endpoint. */
  ip: z.string().optional(),
  /** The load balancer message. */
  message: z.string().optional(),
  /** General purpose metrics associated with the load balancer. */
  metrics: z.array(Metric).optional(),
  /** The status detail contains additional status information about the load balancer distribution event. */
  status_detail: z.string().optional(),
});

export const LoadBalancer = LoadBalancerSchema;

/** Value → label mappings for each enum field of LoadBalancer. */
export const LoadBalancerLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
