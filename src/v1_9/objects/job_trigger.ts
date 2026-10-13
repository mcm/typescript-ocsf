import { z } from 'zod';

import type { KeyValueObjectType } from './key_value_object.js';
import type { UserType } from './user.js';

/**
 * The condition or event that, when met, will initiate the job to perform specified actions.
 *
 * OCSF Object: Job Trigger
 */
export interface JobTriggerType {
  /** Event identifiers that pertain to the job trigger. Should be populated when the Event (3) type is specified. */
  event_codes?: string[];
  /** The time when the job was last run. */
  last_run_time?: number;
  /** A collection of log systems or components that pertain to the job trigger. Should be populated when the Event (3) type is specified. */
  log_sources?: string[];
  /** The time when the job will next be run. */
  next_run_time?: number;
  /** The list of properties associated with the trigger.Can be used to describe time boundaries of the job, amount of repetitions or when the job should be activated or expired. */
  properties?: KeyValueObjectType[];
  /** The job trigger type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The job trigger type, i.e. the condition that must be met for the job to perform its action. */
  type_id: 0 | 1 | 2 | 3 | 99;
  /** The user that pertains to the job trigger. Can be populated when the Event (3) type that bounds to specific user is used. */
  user?: UserType;
}

import { KeyValueObject } from './key_value_object.js';
import { User } from './user.js';

type JobTriggerShape = {
  event_codes: z.ZodOptional<z.ZodArray<z.ZodString>>;
  last_run_time: z.ZodOptional<z.ZodNumber>;
  log_sources: z.ZodOptional<z.ZodArray<z.ZodString>>;
  next_run_time: z.ZodOptional<z.ZodNumber>;
  properties: z.ZodOptional<z.ZodArray<typeof KeyValueObject>>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>;
  user: z.ZodOptional<typeof User>;
};

const JobTriggerSchema: z.ZodObject<JobTriggerShape, z.core.$strict> = z.strictObject({
  /** Event identifiers that pertain to the job trigger. Should be populated when the Event (3) type is specified. */
  event_codes: z.array(z.string()).optional(),
  /** The time when the job was last run. */
  last_run_time: z.number().int().optional(),
  /** A collection of log systems or components that pertain to the job trigger. Should be populated when the Event (3) type is specified. */
  log_sources: z.array(z.string()).optional(),
  /** The time when the job will next be run. */
  next_run_time: z.number().int().optional(),
  /** The list of properties associated with the trigger.Can be used to describe time boundaries of the job, amount of repetitions or when the job should be activated or expired. */
  properties: z.array(KeyValueObject).optional(),
  /** The job trigger type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The job trigger type, i.e. the condition that must be met for the job to perform its action. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]),
  /** The user that pertains to the job trigger. Can be populated when the Event (3) type that bounds to specific user is used. */
  user: User.optional(),
});

export const JobTrigger = JobTriggerSchema;

/** Value → label mappings for each enum field of JobTrigger. */
export const JobTriggerLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Boot",
    2: "Schedule",
    3: "Event",
    99: "Other",
  },
};
