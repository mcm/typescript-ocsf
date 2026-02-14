import { z } from 'zod';

import type { TimespanType } from './timespan.js';
import type { OsType } from './os.js';
import type { ProductType } from './product.js';
import type { CveType } from './cve.js';
import type { CweType } from './cwe.js';

/**
 * The Advisory object represents publicly disclosed cybersecurity vulnerabilities defined in a Security advisory. e.g. <code> Microsoft KB Article</code>, <code>Apple Security Advisory</code>, or a <code>GitHub Security Advisory (GHSA)</code>
 *
 * OCSF Object: Advisory
 */
export interface AdvisoryType {
  /** The average time to patch. */
  avg_timespan?: TimespanType;
  /** The Advisory bulletin identifier. */
  bulletin?: string;
  /** The vendors classification of the Advisory. */
  classification?: string;
  /** The time when the Advisory record was created. */
  created_time?: number;
  /** A brief description of the Advisory Record. */
  desc?: string;
  /** The install state of the Advisory. */
  install_state?: string;
  /** The normalized install state ID of the Advisory. */
  install_state_id?: 0 | 1 | 2 | 3 | 99;
  /** The Advisory has been replaced by another. */
  is_superseded?: boolean;
  /** The time when the Advisory record was last updated. */
  modified_time?: number;
  /** The operating system the Advisory applies to. */
  os?: OsType;
  /** The product where the vulnerability was discovered. */
  product?: ProductType;
  /** A list of reference URLs with additional information about the vulnerabilities disclosed in the Advisory. */
  references?: string[];
  /** A list of Common Vulnerabilities and Exposures (CVE) identifiers related to the vulnerabilities disclosed in the Advisory. */
  related_cves?: CveType[];
  /** A list of Common Weakness Enumeration (CWE) identifiers related to the vulnerabilities disclosed in the Advisory. */
  related_cwes?: CweType[];
  /** The size in bytes for the Advisory. Usually populated for a KB Article patch. */
  size?: number;
  /** The Advisory link from the source vendor. */
  src_url?: string;
  /** A title or a brief phrase summarizing the Advisory. */
  title?: string;
  /** The unique identifier assigned to the advisory or disclosed vulnerability, e.g, GHSA-5mrr-rgp6-x4gr. */
  uid: string;
}

import { Timespan } from './timespan.js';
import { Os } from './os.js';
import { Product } from './product.js';
import { Cve } from './cve.js';
import { Cwe } from './cwe.js';

const AdvisorySchema = z.strictObject({
  /** The average time to patch. */
  avg_timespan: Timespan.optional(),
  /** The Advisory bulletin identifier. */
  bulletin: z.string().optional(),
  /** The vendors classification of the Advisory. */
  classification: z.string().optional(),
  /** The time when the Advisory record was created. */
  created_time: z.number().int().optional(),
  /** A brief description of the Advisory Record. */
  desc: z.string().optional(),
  /** The install state of the Advisory. */
  install_state: z.string().optional(),
  /** The normalized install state ID of the Advisory. */
  install_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The Advisory has been replaced by another. */
  is_superseded: z.boolean().optional(),
  /** The time when the Advisory record was last updated. */
  modified_time: z.number().int().optional(),
  /** The operating system the Advisory applies to. */
  os: Os.optional(),
  /** The product where the vulnerability was discovered. */
  product: Product.optional(),
  /** A list of reference URLs with additional information about the vulnerabilities disclosed in the Advisory. */
  references: z.array(z.string()).optional(),
  /** A list of Common Vulnerabilities and Exposures (CVE) identifiers related to the vulnerabilities disclosed in the Advisory. */
  related_cves: z.array(Cve).optional(),
  /** A list of Common Weakness Enumeration (CWE) identifiers related to the vulnerabilities disclosed in the Advisory. */
  related_cwes: z.array(Cwe).optional(),
  /** The size in bytes for the Advisory. Usually populated for a KB Article patch. */
  size: z.number().int().optional(),
  /** The Advisory link from the source vendor. */
  src_url: z.string().optional(),
  /** A title or a brief phrase summarizing the Advisory. */
  title: z.string().optional(),
  /** The unique identifier assigned to the advisory or disclosed vulnerability, e.g, GHSA-5mrr-rgp6-x4gr. */
  uid: z.string(),
});

export const Advisory = AdvisorySchema;
