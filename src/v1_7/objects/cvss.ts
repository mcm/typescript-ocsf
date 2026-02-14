import { z } from 'zod';

import type { MetricType } from './metric.js';

/**
 * The Common Vulnerability Scoring System (<a target='_blank' href='https://www.first.org/cvss/'>CVSS</a>) object provides a way to capture the principal characteristics of a vulnerability and produce a numerical score reflecting its severity.
 *
 * OCSF Object: CVSS Score
 */
export interface CvssType {
  /** The CVSS base score. For example: 9.1. */
  base_score: number;
  /** The CVSS depth represents a depth of the equation used to calculate CVSS score. */
  depth?: string;
  /** The Common Vulnerability Scoring System metrics. This attribute contains information on the CVE's impact. If the CVE has been analyzed, this attribute will contain any CVSSv2 or CVSSv3 information associated with the vulnerability. For example: { {"Access Vector", "Network"}, {"Access Complexity", "Low"}, ...}. */
  metrics?: MetricType[];
  /** The CVSS overall score, impacted by base, temporal, and environmental metrics. For example: 9.1. */
  overall_score?: number;
  /** The Common Vulnerability Scoring System (CVSS) Qualitative Severity Rating. A textual representation of the numeric score.CVSS v2.0Low (0.0 – 3.9)Medium (4.0 – 6.9)High (7.0 – 10.0)CVSS v3.0None (0.0)Low (0.1 - 3.9)Medium (4.0 - 6.9)High (7.0 - 8.9)Critical (9.0 - 10.0) */
  severity?: string;
  /** The source URL for the CVSS score. For example: https://nvd.nist.gov/vuln/detail/CVE-2021-44228 */
  src_url?: string;
  /** The CVSS vector string is a text representation of a set of CVSS metrics. It is commonly used to record or transfer CVSS metric information in a concise form. For example: 3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:H. */
  vector_string?: string;
  /** The vendor that provided the CVSS score. For example: NVD, REDHAT etc. */
  vendor_name?: string;
  /** The CVSS version. For example: 3.1. */
  version: string;
}

import { Metric } from './metric.js';

const CvssSchema: z.ZodType<CvssType> = z.strictObject({
  /** The CVSS base score. For example: 9.1. */
  base_score: z.number(),
  /** The CVSS depth represents a depth of the equation used to calculate CVSS score. */
  depth: z.string().optional(),
  /** The Common Vulnerability Scoring System metrics. This attribute contains information on the CVE's impact. If the CVE has been analyzed, this attribute will contain any CVSSv2 or CVSSv3 information associated with the vulnerability. For example: { {"Access Vector", "Network"}, {"Access Complexity", "Low"}, ...}. */
  metrics: z.array(Metric).optional(),
  /** The CVSS overall score, impacted by base, temporal, and environmental metrics. For example: 9.1. */
  overall_score: z.number().optional(),
  /** The Common Vulnerability Scoring System (CVSS) Qualitative Severity Rating. A textual representation of the numeric score.CVSS v2.0Low (0.0 – 3.9)Medium (4.0 – 6.9)High (7.0 – 10.0)CVSS v3.0None (0.0)Low (0.1 - 3.9)Medium (4.0 - 6.9)High (7.0 - 8.9)Critical (9.0 - 10.0) */
  severity: z.string().optional(),
  /** The source URL for the CVSS score. For example: https://nvd.nist.gov/vuln/detail/CVE-2021-44228 */
  src_url: z.string().optional(),
  /** The CVSS vector string is a text representation of a set of CVSS metrics. It is commonly used to record or transfer CVSS metric information in a concise form. For example: 3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:H. */
  vector_string: z.string().optional(),
  /** The vendor that provided the CVSS score. For example: NVD, REDHAT etc. */
  vendor_name: z.string().optional(),
  /** The CVSS version. For example: 3.1. */
  version: z.string(),
});

export const Cvss = CvssSchema;
