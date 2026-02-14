import { z } from 'zod';

import type { CisControlType } from './cis_control.js';

/**
 * The CIS Benchmark object describes best practices for securely configuring IT systems, software, networks, and cloud infrastructure as defined by the <a target='_blank' href='https://www.cisecurity.org/cis-benchmarks/'>Center for Internet Security</a>. See also <a target='_blank' href='https://www.cisecurity.org/insights/blog/getting-to-know-the-cis-benchmarks'>Getting to Know the CIS Benchmarks</a>.
 *
 * OCSF Object: CIS Benchmark
 */
export interface CisBenchmarkType {
  /** The CIS Critical Security Controls is a prioritized set of actions to protect your organization and data from cyber-attack vectors. */
  cis_controls?: CisControlType[];
  /** The CIS Benchmark description. For example: The cramfs filesystem type is a compressed read-only Linux filesystem embedded in small footprint systems. A cramfs image can be used without having to first decompress the image. */
  desc?: string;
  /** The CIS Benchmark name. For example: Ensure mounting of cramfs filesystems is disabled. */
  name: string;
}

import { CisControl } from './cis_control.js';

const CisBenchmarkSchema: z.ZodType<CisBenchmarkType> = z.strictObject({
  /** The CIS Critical Security Controls is a prioritized set of actions to protect your organization and data from cyber-attack vectors. */
  cis_controls: z.array(CisControl).optional(),
  /** The CIS Benchmark description. For example: The cramfs filesystem type is a compressed read-only Linux filesystem embedded in small footprint systems. A cramfs image can be used without having to first decompress the image. */
  desc: z.string().optional(),
  /** The CIS Benchmark name. For example: Ensure mounting of cramfs filesystems is disabled. */
  name: z.string(),
});

export const CisBenchmark = CisBenchmarkSchema;
