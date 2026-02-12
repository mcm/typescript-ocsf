import { z } from 'zod';

/**
 * The Scan object describes characteristics of a proactive scan.
 *
 * OCSF Object: Scan
 */
export const Scan = z.object({
  /** The administrator-supplied or application-generated name of the scan. For example: "Home office weekly user database scan", "Scan folders for viruses", "Full system virus scan" */
  name: z.string().optional(),
  /** The application-defined unique identifier assigned to an instance of a scan. */
  uid: z.string().optional(),
  /** The type of scan. */
  type: z.string().optional(),
  /** The type id of the scan. */
  type_id: z.number().int(),
}).passthrough() as any;

export type ScanType = z.infer<typeof Scan>;
