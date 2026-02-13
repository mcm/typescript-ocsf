import { z } from 'zod';

import { KernelDriver } from './kernel_driver.js';
import { Job } from './job.js';
import { Process } from './process.js';

/**
 * The startup item object describes an application component that has associated startup criteria and configurations.
 *
 * OCSF Object: Startup Item
 */
export const StartupItem = z.object({
  /** The startup item kernel driver resource. */
  driver: KernelDriver.optional(),
  /** The startup item job resource. */
  job: Job.optional(),
  /** The unique name of the startup item. */
  name: z.string(),
  /** The startup item process resource. */
  process: Process.optional(),
  /** The list of normalized identifiers that describe the startup items' properties when it is running. Use this field to capture extended information about the process, which may depend on the type of startup item. E.g., A Windows service that interacts with the desktop. */
  run_mode_ids: z.array(z.number().int()).optional(),
  /** The list of run_modes, normalized to the captions of the run_mode_id values. In the case of 'Other', they are defined by the event source. */
  run_modes: z.array(z.string()).optional(),
  /** The run state of the startup item. */
  run_state: z.string().optional(),
  /** The run state ID of the startup item. */
  run_state_id: z.number().int().optional(),
  /** The start type of the startup item. */
  start_type: z.string().optional(),
  /** The start type ID of the startup item. */
  start_type_id: z.number().int(),
  /** The startup item type. */
  type: z.string().optional(),
  /** The startup item type identifier. */
  type_id: z.number().int().optional(),
}).passthrough();

export type StartupItemType = z.infer<typeof StartupItem>;
