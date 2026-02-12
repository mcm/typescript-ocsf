import { z } from 'zod';

import { File } from './file.js';
import { User } from './user.js';

/**
 * The Job object provides information about a scheduled job or task, including its name, command line, and state. It encompasses attributes that describe the properties and status of the scheduled job.
 *
 * OCSF Object: Job
 */
export const Job = z.object({
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
  run_state_id: z.number().int().optional(),
  /** The user that created the job. */
  user: User.optional(),
}).passthrough() as any;

export type JobType = z.infer<typeof Job>;
