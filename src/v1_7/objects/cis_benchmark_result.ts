import { z } from 'zod';

import { Remediation } from './remediation.js';
import { Rule } from './rule.js';

/**
 * The CIS Benchmark Result object contains information as defined by the Center for Internet Security (<a target='_blank' href='https://www.cisecurity.org/cis-benchmarks/'>CIS</a>) benchmark result. CIS Benchmarks are a collection of best practices for securely configuring IT systems, software, networks, and cloud infrastructure.
 *
 * OCSF Object: CIS Benchmark Result
 */
export const CisBenchmarkResult = z.object({
  /** The CIS benchmark description. */
  desc: z.string().optional(),
  /** The CIS benchmark name. */
  name: z.string(),
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation: Remediation.optional(),
  /** The CIS benchmark rule. */
  rule: Rule.optional(),
}).passthrough();

export type CisBenchmarkResultType = z.infer<typeof CisBenchmarkResult>;
