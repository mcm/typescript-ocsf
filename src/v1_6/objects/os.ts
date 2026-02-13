import { z } from 'zod';

/**
 * The Operating System (OS) object describes characteristics of an OS, such as Linux or Windows.
 *
 * OCSF Object: Operating System (OS)
 */
export const Os = z.object({
  /** The operating system build number. */
  build: z.string().optional(),
  /** The operating system country code, as defined by the ISO 3166-1 standard (Alpha-2 code).Note: The two letter country code should be capitalized. For example: US or CA. */
  country: z.string().optional(),
  /** The Common Platform Enumeration (CPE) name as described by (NIST) For example: cpe:/a:apple:safari:16.2. */
  cpe_name: z.string().optional(),
  /** The cpu architecture, the number of bits used for addressing in memory. For example: 32 or 64. */
  cpu_bits: z.number().int().optional(),
  /** The operating system edition. For example: Professional. */
  edition: z.string().optional(),
  /** The kernel release of the operating system. On Unix-based systems, this is determined from the uname -r command output, for example "5.15.0-122-generic". */
  kernel_release: z.string().optional(),
  /** The two letter lower case language codes, as defined by ISO 639-1. For example: en (English), de (German), or fr (French). */
  lang: z.string().optional(),
  /** The operating system name. */
  name: z.string(),
  /** The name of the latest Service Pack. */
  sp_name: z.string().optional(),
  /** The version number of the latest Service Pack. */
  sp_ver: z.number().int().optional(),
  /** The type of the operating system. */
  type: z.string().optional(),
  /** The type identifier of the operating system. */
  type_id: z.number().int(),
  /** The version of the OS running on the device that originated the event. For example: "Windows 10", "OS X 10.7", or "iOS 9". */
  version: z.string().optional(),
}).passthrough();

export type OsType = z.infer<typeof Os>;
