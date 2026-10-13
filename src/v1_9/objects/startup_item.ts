import { z } from 'zod';

import type { KernelDriverType } from './kernel_driver.js';
import type { JobType } from './job.js';
import type { ProcessType } from './process.js';

/**
 * The startup item object describes an application component that has associated startup criteria and configurations.
 *
 * OCSF Object: Startup Item
 */
export interface StartupItemType {
  /** The startup item kernel driver resource. */
  driver?: KernelDriverType;
  /** The startup item job resource. */
  job?: JobType;
  /** The unique name of the startup item. */
  name: string;
  /** The startup item process resource. */
  process?: ProcessType;
  /** The list of normalized identifiers that describe the startup items' properties when it is running. Use this field to capture extended information about the process, which may depend on the type of startup item. E.g., A Windows service that interacts with the desktop. */
  run_mode_ids?: number[];
  /** The list of run_modes, normalized to the captions of the run_mode_id values. In the case of 'Other', they are defined by the event source. */
  run_modes?: string[];
  /** The run state of the startup item. */
  run_state?: string;
  /** The run state ID of the startup item. */
  run_state_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;
  /** The start type of the startup item. */
  start_type?: string;
  /** The start type ID of the startup item. */
  start_type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;
  /** The startup item type. */
  type?: string;
  /** The startup item type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;
}

import { KernelDriver } from './kernel_driver.js';
import { Job } from './job.js';
import { Process } from './process.js';

type StartupItemShape = {
  driver: z.ZodOptional<typeof KernelDriver>;
  job: z.ZodOptional<typeof Job>;
  name: z.ZodString;
  process: z.ZodOptional<typeof Process>;
  run_mode_ids: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
  run_modes: z.ZodOptional<z.ZodArray<z.ZodString>>;
  run_state: z.ZodOptional<z.ZodString>;
  run_state_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<99>]>>;
  start_type: z.ZodOptional<z.ZodString>;
  start_type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<99>]>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<99>]>>;
};

const StartupItemSchema: z.ZodObject<StartupItemShape, z.core.$strict> = z.strictObject({
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
  run_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(99)]).optional(),
  /** The start type of the startup item. */
  start_type: z.string().optional(),
  /** The start type ID of the startup item. */
  start_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(99)]),
  /** The startup item type. */
  type: z.string().optional(),
  /** The startup item type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(99)]).optional(),
});

export const StartupItem = StartupItemSchema;

/** Value → label mappings for each enum field of StartupItem. */
export const StartupItemLabels: Readonly<Record<"run_state_id" | "start_type_id" | "type_id", Readonly<Record<number, string>>>> = {
  run_state_id: {
    0: "Unknown",
    1: "Stopped",
    2: "Start Pending",
    3: "Stop Pending",
    4: "Running",
    5: "Continue Pending",
    6: "Pause Pending",
    7: "Paused",
    8: "Restart Pending",
    99: "Other",
  },
  start_type_id: {
    0: "Unknown",
    1: "Auto",
    2: "Boot",
    3: "On Demand",
    4: "Disabled",
    5: "All Logins",
    6: "Specific User Login",
    7: "Scheduled",
    8: "System Changed",
    99: "Other",
  },
  type_id: {
    0: "Unknown",
    1: "Kernel Mode Driver",
    2: "User Mode Driver",
    3: "Service",
    4: "User Mode Application",
    5: "Autoload",
    6: "System Extension",
    7: "Kernel Extension",
    8: "Scheduled Job, Task",
    99: "Other",
  },
};
