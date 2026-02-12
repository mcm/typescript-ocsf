import { z } from 'zod';

import { Timespan } from './timespan.js';

/**
 * A record of an observed value or event that captures the timing and frequency of its occurrence. Used to track when values/events were first detected, last detected, and their total occurrence count.
 *
 * OCSF Object: Observation
 */
export const Observation = z.object({
  /** The specific value, event, indicator or data point that was observed and recorded. This is the core piece of information being tracked. */
  value: z.string(),
  /** Integer representing the total number of times this specific value/event was observed across all occurrences. Helps establish prevalence and patterns. */
  count: z.number().int().optional(),
  /** The time window when the value or event was first observed. It is used to analyze activity patterns, detect trends, or correlate events within a specific timeframe. */
  timespan: Timespan.optional(),
}).passthrough() as any;

export type ObservationType = z.infer<typeof Observation>;
