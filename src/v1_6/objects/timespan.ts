import { z } from 'zod';

/**
 * The Time Span object represents different time period durations. If a timespan is fractional, i.e. crosses one period, e.g. a week and 3 days, more than one may be populated since each member is of integral type. In that case <code>type_id</code> if present should be set to <code>Other.</code><P>A timespan may also be defined by its time interval boundaries, <code>start_time</code> and <code>end_time</code>.
 *
 * OCSF Object: Time Span
 */
export const Timespan = z.object({
  /** The duration of the time span in milliseconds. */
  duration: z.number().int().optional(),
  /** The duration of the time span in days. */
  duration_days: z.number().int().optional(),
  /** The duration of the time span in hours. */
  duration_hours: z.number().int().optional(),
  /** The duration of the time span in minutes. */
  duration_mins: z.number().int().optional(),
  /** The duration of the time span in months. */
  duration_months: z.number().int().optional(),
  /** The duration of the time span in seconds. */
  duration_secs: z.number().int().optional(),
  /** The duration of the time span in weeks. */
  duration_weeks: z.number().int().optional(),
  /** The duration of the time span in years. */
  duration_years: z.number().int().optional(),
  /** The end time or conclusion of the timespan's interval. */
  end_time: z.number().int().optional(),
  /** The start time or beginning of the timespan's interval. */
  start_time: z.number().int().optional(),
  /** The type of time span duration the object represents. */
  type: z.string().optional(),
  /** The normalized identifier for the time span duration type. */
  type_id: z.number().int().optional(),
}).passthrough() as any;

export type TimespanType = z.infer<typeof Timespan>;
