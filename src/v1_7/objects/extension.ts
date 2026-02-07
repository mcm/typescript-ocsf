import { z } from "zod";

/**
 * The OCSF Schema Extension object provides detailed information about the schema extension used to construct the event. The schema extensions are registered in the <a target='_blank' href='https://github.com/ocsf/ocsf-schema/blob/main/extensions.md'>extensions.md</a> file.
 *
 * OCSF Object: Schema Extension
 */
export interface ExtensionType {
  /** The schema extension name. For example: dev. */
  name?: string | undefined;
  /** The schema extension unique identifier. For example: 999. */
  uid?: string | undefined;
  /** The schema extension version. For example: 1.0.0-alpha.2. */
  version: string;
  [key: string]: unknown;
}

export const Extension: z.ZodType<ExtensionType> = z
  .object({
    /** The schema extension name. For example: dev. */
    name: z.string().optional(),
    /** The schema extension unique identifier. For example: 999. */
    uid: z.string().optional(),
    /** The schema extension version. For example: 1.0.0-alpha.2. */
    version: z.string(),
  })
  .passthrough() as any;
