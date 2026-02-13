import { z } from 'zod';

import { File } from './file.js';

/**
 * The Kernel Extension object describes a kernel driver that has been loaded or unloaded into the operating system (OS) kernel.
 *
 * OCSF Object: Kernel Extension
 */
export const KernelDriver: any = z.object({
  /** The driver/extension file object. */
  file: File,
}).passthrough();

export type KernelDriverType = z.infer<typeof KernelDriver>;
