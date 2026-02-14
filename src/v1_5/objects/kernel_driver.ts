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

const KernelDriverSchema: z.ZodType<KernelDriverType> = z.strictObject({
  /** The driver/extension file object. */
  file: File,
});

export const KernelDriver = KernelDriverSchema;
