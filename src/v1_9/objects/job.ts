import { z } from 'zod';

import type { FileType } from './file.js';
import type { JobActionType } from './job_action.js';
import type { JobTriggerType } from './job_trigger.js';
import type { UserType } from './user.js';

/**
 * The Job object provides information about a scheduled job or task, including its name, command line, and state. It encompasses attributes that describe the properties and status of the scheduled job.
 *
 * OCSF Object: Job
 */
export interface JobType {
  /** The job command line. */
  cmd_line?: string;
  /** The time when the job was created. */
  created_time?: number;
  /** The description of the job. */
  desc?: string;
  /** The file that pertains to the job. */
  file?: FileType;
  /** An array of actions that will be performed by the job when certain conditions are met. */
  job_actions?: JobActionType[];
  /** An array of conditions or events that, when met, will initiate the job to perform specified actions. */
  job_triggers?: JobTriggerType[];
  /** The time when the job was last run. */
  last_run_time?: number;
  /** The name of the job. */
  name?: string;
  /** The time when the job will next be run. */
  next_run_time?: number;
  /** The run state of the job. */
  run_state?: string;
  /** The run state ID of the job. */
  run_state_id?: 0 | 1 | 2 | 3 | 4 | 5 | 99;
  /** The job type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The job type, i.e. the mechanism that executes the job. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The unique job identifier. */
  uid?: string;
  /** The user that created the job. */
  user?: UserType;
}

import { File } from './file.js';
import { JobAction } from './job_action.js';
import { JobTrigger } from './job_trigger.js';
import { User } from './user.js';

type JobShape = {
  cmd_line: z.ZodOptional<z.ZodString>;
  created_time: z.ZodOptional<z.ZodNumber>;
  desc: z.ZodOptional<z.ZodString>;
  file: z.ZodOptional<typeof File>;
  job_actions: z.ZodOptional<z.ZodArray<typeof JobAction>>;
  job_triggers: z.ZodOptional<z.ZodArray<typeof JobTrigger>>;
  last_run_time: z.ZodOptional<z.ZodNumber>;
  name: z.ZodOptional<z.ZodString>;
  next_run_time: z.ZodOptional<z.ZodNumber>;
  run_state: z.ZodOptional<z.ZodString>;
  run_state_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<99>]>>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  uid: z.ZodOptional<z.ZodString>;
  user: z.ZodOptional<typeof User>;
};

const JobSchema: z.ZodObject<JobShape, z.core.$strict> = z.strictObject({
  /** The job command line. */
  cmd_line: z.string().optional(),
  /** The time when the job was created. */
  created_time: z.number().int().optional(),
  /** The description of the job. */
  desc: z.string().optional(),
  /** The file that pertains to the job. */
  file: File.optional(),
  /** An array of actions that will be performed by the job when certain conditions are met. */
  job_actions: z.array(JobAction).optional(),
  /** An array of conditions or events that, when met, will initiate the job to perform specified actions. */
  job_triggers: z.array(JobTrigger).optional(),
  /** The time when the job was last run. */
  last_run_time: z.number().int().optional(),
  /** The name of the job. */
  name: z.string().optional(),
  /** The time when the job will next be run. */
  next_run_time: z.number().int().optional(),
  /** The run state of the job. */
  run_state: z.string().optional(),
  /** The run state ID of the job. */
  run_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]).optional(),
  /** The job type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The job type, i.e. the mechanism that executes the job. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The unique job identifier. */
  uid: z.string().optional(),
  /** The user that created the job. */
  user: User.optional(),
});

export const Job = JobSchema;

/** Value → label mappings for each enum field of Job. */
export const JobLabels: Readonly<Record<"run_state_id" | "type_id", Readonly<Record<number, string>>>> = {
  run_state_id: {
    0: "Unknown",
    1: "Ready",
    2: "Queued",
    3: "Running",
    4: "Stopped",
    5: "Disabled",
    99: "Other",
  },
  type_id: {
    0: "Unknown",
    1: "Task Scheduler",
    2: "Cron",
    3: "Systemd",
    4: "Launchd",
    99: "Other",
  },
};
