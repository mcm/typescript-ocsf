import { z } from 'zod';

/**
 * The Metric object defines a simple name/value pair entity for a metric.
 *
 * OCSF Object: Metric
 */
export const Metric = z.strictObject({
  /** The name of the metric. */
  name: z.string(),
  /** The value of the metric. */
  value: z.string(),
});

export type MetricType = z.infer<typeof Metric>;
