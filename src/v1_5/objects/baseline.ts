import { z } from "zod";

import { Observation, type ObservationType } from "./observation.js";

/**
 * Describes the baseline or expected behavior of a system, service, or component based on historical observations and measurements. It establishes reference points for comparison to detect anomalies, trends, and deviations from typical patterns.
 *
 * OCSF Object: Baseline
 */
export interface BaselineType {
  /** The specific parameter or property being monitored. Examples include: CPU usage percentage, API response time in milliseconds, HTTP error rate, memory utilization, network latency, transaction volume, etc. */
  observation_parameter: string;
  /** The type of analysis being performed to establish baseline behavior. Common types include: Frequency Analysis, Time Pattern Analysis, Volume Analysis, Sequence Analysis, Distribution Analysis, etc. */
  observation_type?: string | undefined;
  /** Collection of actual measured values, data points and observations recorded for this baseline. */
  observations: ObservationType[];
  /** The specific pattern identified within the observation type. For Frequency Analysis, this could be 'FREQUENT', 'INFREQUENT', 'RARE', or 'UNSEEN'. For Time Pattern Analysis, this could be 'BUSINESS_HOURS', 'OFF_HOURS', or 'UNUSUAL_TIME'. For Volume Analysis, this could be 'NORMAL_VOLUME', 'HIGH_VOLUME', or 'SURGE'. The pattern values are specific to each observation type and indicate the baseline behavior. */
  observed_pattern?: string | undefined;
  [key: string]: unknown;
}

export const Baseline: z.ZodType<BaselineType> = z
  .object({
    /** The specific parameter or property being monitored. Examples include: CPU usage percentage, API response time in milliseconds, HTTP error rate, memory utilization, network latency, transaction volume, etc. */
    observation_parameter: z.string(),
    /** The type of analysis being performed to establish baseline behavior. Common types include: Frequency Analysis, Time Pattern Analysis, Volume Analysis, Sequence Analysis, Distribution Analysis, etc. */
    observation_type: z.string().optional(),
    /** Collection of actual measured values, data points and observations recorded for this baseline. */
    observations: z.array(Observation),
    /** The specific pattern identified within the observation type. For Frequency Analysis, this could be 'FREQUENT', 'INFREQUENT', 'RARE', or 'UNSEEN'. For Time Pattern Analysis, this could be 'BUSINESS_HOURS', 'OFF_HOURS', or 'UNUSUAL_TIME'. For Volume Analysis, this could be 'NORMAL_VOLUME', 'HIGH_VOLUME', or 'SURGE'. The pattern values are specific to each observation type and indicate the baseline behavior. */
    observed_pattern: z.string().optional(),
  })
  .passthrough() as any;
