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
  type_id: 0 | 1 | 2 | 99;
}

type KernelShape = {
  is_system: z.ZodOptional<z.ZodBoolean>;
  name: z.ZodString;
  path: z.ZodOptional<z.ZodString>;
  system_call: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>;
};

const KernelSchema: z.ZodObject<KernelShape, z.core.$strict> = z.strictObject({
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]),
});

export const Kernel = KernelSchema;

/** Value → label mappings for each enum field of Kernel. */
export const KernelLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Shared Mutex",
    2: "System Call",
    99: "Other",
  },
};
