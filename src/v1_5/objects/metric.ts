import { z } from 'zod';

/**
 * The Metric object defines a simple name/value pair entity for a metric.
 *
 * OCSF Object: Metric
 */
export interface MetricType {
  /** The name of the metric. */
  name: string;
  /** The value of the metric. */
  value: string;
}

const MetricSchema: z.ZodType<MetricType> = z.strictObject({
  /** The name of the metric. */
  name: z.string(),
  /** The value of the metric. */
  value: z.string(),
});

export const Metric = MetricSchema;
