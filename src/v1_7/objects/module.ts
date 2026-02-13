import { z } from 'zod';

import { File } from './file.js';
import { FunctionInvocation } from './function_invocation.js';

/**
 * The Module object describes the attributes of a module.
 *
 * OCSF Object: Module
 */
export const Module: any = z.object({
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
  load_type_id: z.number().int().optional(),
  /** The start address of the execution. */
  start_address: z.string().optional(),
  /** The module type. */
  type: z.string().optional(),
}).passthrough();

export type ModuleType = z.infer<typeof Module>;
