import { z } from 'zod';

/**
 * The Kernel Resource object provides information about a specific kernel resource, including its name and type. It describes essential attributes associated with a resource managed by the kernel of an operating system.
 *
 * OCSF Object: Kernel Resource
 */
export interface KernelType {
  /** The indication of whether the object is part of the operating system. */
  is_system?: boolean;
  /** The name of the kernel resource. */
  name: string;
  /** The full path of the kernel resource. */
  path?: string;
  /** The system call that was invoked. */
  system_call?: string;
  /** The type of the kernel resource. */
  type?: string;
  /** The type of the kernel resource. */
  type_id: 1 | 2;
}

const KernelSchema: z.ZodType<KernelType> = z.strictObject({
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
  type_id: z.union([z.literal(1), z.literal(2)]),
});

export const Kernel = KernelSchema;
