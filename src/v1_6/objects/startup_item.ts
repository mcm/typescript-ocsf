import { z } from "zod";

import { Job, type JobType } from "./job.js";
import { KernelDriver, type KernelDriverType } from "./kernel_driver.js";
import { Process, type ProcessType } from "./process.js";

/**
 * The startup item object describes an application component that has associated startup criteria and configurations.
 *
 * OCSF Object: Startup Item
 */
export interface StartupItemType {
  /** The startup item kernel driver resource. */
  driver?: KernelDriverType | undefined;
  /** The startup item job resource. */
  job?: JobType | undefined;
  /** The unique name of the startup item. */
  name: string;
  /** The startup item process resource. */
  process?: ProcessType | undefined;
  /** The list of normalized identifiers that describe the startup items' properties when it is running. Use this field to capture extended information about the process, which may depend on the type of startup item. E.g., A Windows service that interacts with the desktop. */
  run_mode_ids?: number[] | undefined;
  /** The list of run_modes, normalized to the captions of the run_mode_id values. In the case of 'Other', they are defined by the event source. */
  run_modes?: string[] | undefined;
  /** The run state of the startup item. */
  run_state?: string | undefined;
  /** The run state ID of the startup item. */
  run_state_id?: number | undefined;
  /** The start type of the startup item. */
  start_type?: string | undefined;
  /** The start type ID of the startup item. */
  start_type_id: number;
  /** The startup item type. */
  type?: string | undefined;
  /** The startup item type identifier. */
  type_id?: number | undefined;
  [key: string]: unknown;
}

export const StartupItem: z.ZodType<StartupItemType> = z
  .object({
    /** The startup item kernel driver resource. */
    driver: KernelDriver.optional(),
    /** The startup item job resource. */
    job: Job.optional(),
    /** The unique name of the startup item. */
    name: z.string(),
    /** The startup item process resource. */
    process: z.lazy(() => Process).optional(),
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
  })
  .passthrough() as any;
