import { z } from 'zod';

import type { FileType } from './file.js';

/**
 * The Module object describes the load attributes of a module.
 *
 * OCSF Object: Module
 */
export interface ModuleType {
  /** The memory address where the module was loaded. */
  base_address?: string;
  /** The module file object. */
  file?: FileType;
  /** The entry-point function of the module. The system calls the entry-point function whenever a process or thread loads or unloads the module. */
  function_name?: string;
  /** The load type, normalized to the caption of the load_type_id value. In the case of 'Other', it is defined by the event source. */
  load_type?: string;
  /** The normalized identifier for how the module was loaded in memory. */
  load_type_id: 1 | 2 | 3 | 4 | 5;
  /** The start address of the execution. */
  start_address?: string;
  /** The module type. */
  type?: string;
}

import { File } from './file.js';

const ModuleSchema = z.strictObject({
  /** The memory address where the module was loaded. */
  base_address: z.string().optional(),
  /** The module file object. */
  file: File.optional(),
  /** The entry-point function of the module. The system calls the entry-point function whenever a process or thread loads or unloads the module. */
  function_name: z.string().optional(),
  /** The load type, normalized to the caption of the load_type_id value. In the case of 'Other', it is defined by the event source. */
  load_type: z.string().optional(),
  /** The normalized identifier for how the module was loaded in memory. */
  load_type_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  /** The start address of the execution. */
  start_address: z.string().optional(),
  /** The module type. */
  type: z.string().optional(),
});

export const Module = ModuleSchema;
