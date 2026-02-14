import { z } from 'zod';

/**
 * The Scan object describes characteristics of a proactive scan.
 *
 * OCSF Object: Scan
 */
export interface ScanType {
  /** The administrator-supplied or application-generated name of the scan. For example: "Home office weekly user database scan", "Scan folders for viruses", "Full system virus scan" */
  name?: string;
  /** The application-defined unique identifier assigned to an instance of a scan. */
  uid?: string;
  /** The type of scan. */
  type?: string;
  /** The type id of the scan. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
}

const ScanSchema: z.ZodType<ScanType> = z.strictObject({
  /** The administrator-supplied or application-generated name of the scan. For example: "Home office weekly user database scan", "Scan folders for viruses", "Full system virus scan" */
  name: z.string().optional(),
  /** The application-defined unique identifier assigned to an instance of a scan. */
  uid: z.string().optional(),
  /** The type of scan. */
  type: z.string().optional(),
  /** The type id of the scan. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
});

export const Scan = ScanSchema;
