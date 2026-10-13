import { z } from 'zod';

import type { FileType } from './file.js';
import type { FunctionInvocationType } from './function_invocation.js';

/**
 * The Module object describes the attributes of a module.
 *
 * OCSF Object: Module
 */
export interface ModuleType {
  /** The memory address where the module was loaded. */
  base_address?: string;
  /** The module file object. */
  file?: FileType;
  /** Details about the invocation of the function given in function_name. */
  function_invocation?: FunctionInvocationType;
  /** The invoked function in the module. For load and unload events, this is the entry-point function of the module. The system calls the entry-point function whenever a process or thread loads or unloads the module. */
  function_name?: string;
  /** The load type, normalized to the caption of the load_type_id value. In the case of 'Other', it is defined by the event source. */
  load_type?: string;
  /** The normalized identifier for how the module was loaded in memory. */
  load_type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 99;
  /** The start address of the execution. */
  start_address?: string;
  /** The module type. */
  type?: string;
}

import { File } from './file.js';
import { FunctionInvocation } from './function_invocation.js';

type ModuleShape = {
  base_address: z.ZodOptional<z.ZodString>;
  file: z.ZodOptional<typeof File>;
  function_invocation: z.ZodOptional<typeof FunctionInvocation>;
  function_name: z.ZodOptional<z.ZodString>;
  load_type: z.ZodOptional<z.ZodString>;
  load_type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<99>]>>;
  start_address: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
};

const ModuleSchema: z.ZodObject<ModuleShape, z.core.$strict> = z.strictObject({
  /** The memory address where the module was loaded. */
  base_address: z.string().optional(),
  /** The module file object. */
  file: File.optional(),
  /** Details about the invocation of the function given in function_name. */
  function_invocation: FunctionInvocation.optional(),
  /** The invoked function in the module. For load and unload events, this is the entry-point function of the module. The system calls the entry-point function whenever a process or thread loads or unloads the module. */
  function_name: z.string().optional(),
  /** The load type, normalized to the caption of the load_type_id value. In the case of 'Other', it is defined by the event source. */
  load_type: z.string().optional(),
  /** The normalized identifier for how the module was loaded in memory. */
  load_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]).optional(),
  /** The start address of the execution. */
  start_address: z.string().optional(),
  /** The module type. */
  type: z.string().optional(),
});

export const Module = ModuleSchema;

/** Value → label mappings for each enum field of Module. */
export const ModuleLabels: Readonly<Record<"load_type_id", Readonly<Record<number, string>>>> = {
  load_type_id: {
    0: "Unknown",
    1: "Standard",
    2: "Non Standard",
    3: "ShellCode",
    4: "Mapped",
    5: "NonStandard Backed",
    99: "Other",
  },
};
