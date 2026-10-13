import { z } from 'zod';

/**
 * The Time Span object represents different time period durations. If a timespan is fractional, i.e. crosses one period, e.g. a week and 3 days, more than one may be populated since each member is of integral type. In that case <code>type_id</code> if present should be set to <code>Other.</code><P>A timespan may also be defined by its time interval boundaries, <code>start_time</code> and <code>end_time</code>.
 *
 * OCSF Object: Time Span
 */
export interface TimespanType {
  /** The duration of the time span in milliseconds. */
  duration?: number;
  /** The duration of the time span in days. */
  duration_days?: number;
  /** The duration of the time span in hours. */
  duration_hours?: number;
  /** The duration of the time span in minutes. */
  duration_mins?: number;
  /** The duration of the time span in months. */
  duration_months?: number;
  /** The duration of the time span in seconds. */
  duration_secs?: number;
  /** The duration of the time span in weeks. */
  duration_weeks?: number;
  /** The duration of the time span in years. */
  duration_years?: number;
  /** The end time or conclusion of the timespan's interval. */
  end_time?: number;
  /** The start time or beginning of the timespan's interval. */
  start_time?: number;
  /** The type of time span duration the object represents. */
  type?: string;
  /** The normalized identifier for the time span duration type. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;
}

const TimespanSchema = z.strictObject({
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(99)]).optional(),
});

export const Timespan = TimespanSchema;

/** Value → label mappings for each enum field of Timespan. */
export const TimespanLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Milliseconds",
    2: "Seconds",
    3: "Minutes",
    4: "Hours",
    5: "Days",
    6: "Weeks",
    7: "Months",
    8: "Years",
    9: "Time Interval",
    99: "Other",
  },
};
