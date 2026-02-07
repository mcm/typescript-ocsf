import { z } from "zod";

import { File, type FileType } from "./file.js";

/**
 * The Module object describes the load attributes of a module.
 *
 * OCSF Object: Module
 */
export interface ModuleType {
  /** The memory address where the module was loaded. */
  base_address?: string | undefined;
  /** The module file object. */
  file?: FileType | undefined;
  /** The entry-point function of the module. The system calls the entry-point function whenever a process or thread loads or unloads the module. */
  function_name?: string | undefined;
  /** The load type, normalized to the caption of the load_type_id value. In the case of 'Other', it is defined by the event source. */
  load_type?: string | undefined;
  /** The normalized identifier for how the module was loaded in memory. */
  load_type_id: number;
  /** The start address of the execution. */
  start_address?: string | undefined;
  /** The module type. */
  type?: string | undefined;
  [key: string]: unknown;
}

export const Module: z.ZodType<ModuleType> = z
  .object({
    /** The memory address where the module was loaded. */
    base_address: z.string().optional(),
    /** The module file object. */
    file: File.optional(),
    /** The entry-point function of the module. The system calls the entry-point function whenever a process or thread loads or unloads the module. */
    function_name: z.string().optional(),
    /** The load type, normalized to the caption of the load_type_id value. In the case of 'Other', it is defined by the event source. */
    load_type: z.string().optional(),
    /** The normalized identifier for how the module was loaded in memory. */
    load_type_id: z.number().int(),
    /** The start address of the execution. */
    start_address: z.string().optional(),
    /** The module type. */
    type: z.string().optional(),
  })
  .passthrough() as any;
