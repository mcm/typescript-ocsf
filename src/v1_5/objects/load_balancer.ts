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

const LoadBalancerSchema = z.strictObject({
  /** The name of the load balancer. */
  name: z.string().optional(),
  /** The unique identifier for the load balancer. */
  uid: z.string().optional(),
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
