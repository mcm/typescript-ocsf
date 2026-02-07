import { z } from "zod";

import { Timespan, type TimespanType } from "./timespan.js";

/**
 * The Network Traffic object describes characteristics of network traffic over a time period. The metrics represent network data transferred between source and destination during an observation window.
 *
 * OCSF Object: Network Traffic
 */
export interface NetworkTrafficType {
  /** The total number of bytes transferred in both directions (sum of bytes_in and bytes_out). */
  bytes?: number | undefined;
  /** The number of bytes sent from the destination to the source (inbound direction). */
  bytes_in?: number | undefined;
  /** The number of bytes that were missed during observation, typically due to packet loss or sampling limitations. */
  bytes_missed?: number | undefined;
  /** The number of bytes sent from the source to the destination (outbound direction). */
  bytes_out?: number | undefined;
  /** The total number of chunks transferred in both directions (sum of chunks_in and chunks_out). */
  chunks?: number | undefined;
  /** The number of chunks sent from the destination to the source (inbound direction). */
  chunks_in?: number | undefined;
  /** The number of chunks sent from the source to the destination (outbound direction). */
  chunks_out?: number | undefined;
  /** The end time of the observation or reporting period. */
  end_time?: number | undefined;
  /** The total number of packets transferred in both directions (sum of packets_in and packets_out). */
  packets?: number | undefined;
  /** The number of packets sent from the destination to the source (inbound direction). */
  packets_in?: number | undefined;
  /** The number of packets sent from the source to the destination (outbound direction). */
  packets_out?: number | undefined;
  /** The start time of the observation or reporting period. */
  start_time?: number | undefined;
  /** The time span object representing the duration of the observation or reporting period. */
  timespan?: TimespanType | undefined;
  [key: string]: unknown;
}

export const NetworkTraffic: z.ZodType<NetworkTrafficType> = z
  .object({
    /** The total number of bytes transferred in both directions (sum of bytes_in and bytes_out). */
    bytes: z.number().int().optional(),
    /** The number of bytes sent from the destination to the source (inbound direction). */
    bytes_in: z.number().int().optional(),
    /** The number of bytes that were missed during observation, typically due to packet loss or sampling limitations. */
    bytes_missed: z.number().int().optional(),
    /** The number of bytes sent from the source to the destination (outbound direction). */
    bytes_out: z.number().int().optional(),
    /** The total number of chunks transferred in both directions (sum of chunks_in and chunks_out). */
    chunks: z.number().int().optional(),
    /** The number of chunks sent from the destination to the source (inbound direction). */
    chunks_in: z.number().int().optional(),
    /** The number of chunks sent from the source to the destination (outbound direction). */
    chunks_out: z.number().int().optional(),
    /** The end time of the observation or reporting period. */
    end_time: z.number().int().optional(),
    /** The total number of packets transferred in both directions (sum of packets_in and packets_out). */
    packets: z.number().int().optional(),
    /** The number of packets sent from the destination to the source (inbound direction). */
    packets_in: z.number().int().optional(),
    /** The number of packets sent from the source to the destination (outbound direction). */
    packets_out: z.number().int().optional(),
    /** The start time of the observation or reporting period. */
    start_time: z.number().int().optional(),
    /** The time span object representing the duration of the observation or reporting period. */
    timespan: Timespan.optional(),
  })
  .passthrough() as any;
