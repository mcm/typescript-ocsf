import { z } from 'zod';

import type { RemediationType } from './remediation.js';
import type { RuleType } from './rule.js';

/**
 * The CIS Benchmark Result object contains information as defined by the Center for Internet Security (<a target='_blank' href='https://www.cisecurity.org/cis-benchmarks/'>CIS</a>) benchmark result. CIS Benchmarks are a collection of best practices for securely configuring IT systems, software, networks, and cloud infrastructure.
 *
 * OCSF Object: CIS Benchmark Result
 */
export interface CisBenchmarkResultType {
  /** The CIS benchmark description. */
  desc?: string;
  /** The CIS benchmark name. */
  name: string;
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation?: RemediationType;
  /** The CIS benchmark rule. */
  rule?: RuleType;
}

import { Remediation } from './remediation.js';
import { Rule } from './rule.js';

const CisBenchmarkResultSchema: z.ZodType<CisBenchmarkResultType> = z.strictObject({
  /** The CIS benchmark description. */
  desc: z.string().optional(),
  /** The CIS benchmark name. */
  name: z.string(),
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation: Remediation.optional(),
  /** The CIS benchmark rule. */
  rule: Rule.optional(),
});

export const CisBenchmarkResult = CisBenchmarkResultSchema;
