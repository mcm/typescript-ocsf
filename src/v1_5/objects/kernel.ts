import { z } from "zod";

/**
 * The Kernel Resource object provides information about a specific kernel resource, including its name and type. It describes essential attributes associated with a resource managed by the kernel of an operating system.
 *
 * OCSF Object: Kernel Resource
 */
export interface KernelType {
  /** The indication of whether the object is part of the operating system. */
  is_system?: boolean | undefined;
  /** The name of the kernel resource. */
  name: string;
  /** The full path of the kernel resource. */
  path?: string | undefined;
  /** The system call that was invoked. */
  system_call?: string | undefined;
  /** The type of the kernel resource. */
  type?: string | undefined;
  /** The type of the kernel resource. */
  type_id: number;
  [key: string]: unknown;
}

export const Kernel: z.ZodType<KernelType> = z
  .object({
    /** The indication of whether the object is part of the operating system. */
    is_system: z.boolean().optional(),
    /** The name of the kernel resource. */
    name: z.string(),
    /** The full path of the kernel resource. */
    path: z.string().optional(),
    /** The system call that was invoked. */
    system_call: z.string().optional(),
    /** The type of the kernel resource. */
    type: z.string().optional(),
    /** The type of the kernel resource. */
    type_id: z.number().int(),
  })
  .passthrough() as any;
