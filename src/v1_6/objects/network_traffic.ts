import { z } from 'zod';

/**
 * The Network Traffic object describes characteristics of network traffic. Network traffic refers to data moving across a network at a given point of time.
 *
 * OCSF Object: Network Traffic
 */
export const NetworkTraffic = z.object({
  /** The total number of bytes (in and out). */
  bytes: z.number().int().optional(),
  /** The number of bytes sent from the destination to the source. */
  bytes_in: z.number().int().optional(),
  /** Indicates the number of bytes missed, which is representative of packet loss. */
  bytes_missed: z.number().int().optional(),
  /** The number of bytes sent from the source to the destination. */
  bytes_out: z.number().int().optional(),
  /** The total number of chunks (in and out). */
  chunks: z.number().int().optional(),
  /** The number of chunks sent from the destination to the source. */
  chunks_in: z.number().int().optional(),
  /** The number of chunks sent from the source to the destination. */
  chunks_out: z.number().int().optional(),
  /** The total number of packets (in and out). */
  packets: z.number().int().optional(),
  /** The number of packets sent from the destination to the source. */
  packets_in: z.number().int().optional(),
  /** The number of packets sent from the source to the destination. */
  packets_out: z.number().int().optional(),
}).passthrough();

export type NetworkTrafficType = z.infer<typeof NetworkTraffic>;
