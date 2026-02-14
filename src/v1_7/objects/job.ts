import { z } from 'zod';

import type { FileType } from './file.js';
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
  /** The time when the job was last run. */
  last_run_time?: number;
  /** The name of the job. */
  name: string;
  /** The time when the job will next be run. */
  next_run_time?: number;
  /** The run state of the job. */
  run_state?: string;
  /** The run state ID of the job. */
  run_state_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The user that created the job. */
  user?: UserType;
}

import { File } from './file.js';
import { User } from './user.js';

const JobSchema: z.ZodType<JobType> = z.strictObject({
  /** The job command line. */
  cmd_line: z.string().optional(),
  /** The time when the job was created. */
  created_time: z.number().int().optional(),
  /** The description of the job. */
  desc: z.string().optional(),
  /** The file that pertains to the job. */
  file: File.optional(),
  /** The time when the job was last run. */
  last_run_time: z.number().int().optional(),
  /** The name of the job. */
  name: z.string(),
  /** The time when the job will next be run. */
  next_run_time: z.number().int().optional(),
  /** The run state of the job. */
  run_state: z.string().optional(),
  /** The run state ID of the job. */
  run_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The user that created the job. */
  user: User.optional(),
});

export const Job = JobSchema;
