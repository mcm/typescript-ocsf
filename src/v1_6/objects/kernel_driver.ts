import { z } from "zod";

import { File, type FileType } from "./file.js";

/**
 * The Kernel Extension object describes a kernel driver that has been loaded or unloaded into the operating system (OS) kernel.
 *
 * OCSF Object: Kernel Extension
 */
export interface KernelDriverType {
  /** The driver/extension file object. */
  file: FileType;
  [key: string]: unknown;
}

export const KernelDriver: z.ZodType<KernelDriverType> = z
  .object({
    /** The driver/extension file object. */
    file: File,
  })
  .passthrough() as any;
