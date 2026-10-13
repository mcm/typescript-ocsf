import { z } from 'zod';

import type { FileType } from './file.js';

/**
 * The Kernel Extension object describes a kernel driver that has been loaded or unloaded into the operating system (OS) kernel.
 *
 * OCSF Object: Kernel Extension
 */
export interface KernelDriverType {
  /** The driver/extension file object. */
  file: FileType;
}

import { File } from './file.js';

type KernelDriverShape = {
  file: typeof File;
};

const KernelDriverSchema: z.ZodObject<KernelDriverShape, z.core.$strict> = z.strictObject({
  /** The driver/extension file object. */
  file: File,
});

export const KernelDriver = KernelDriverSchema;

/** Value → label mappings for each enum field of KernelDriver. */
export const KernelDriverLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
