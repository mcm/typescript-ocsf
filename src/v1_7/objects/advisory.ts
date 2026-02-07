import { z } from "zod";

import { Cve, type CveType } from "./cve.js";
import { Cwe, type CweType } from "./cwe.js";
import { Os, type OsType } from "./os.js";
import { Product, type ProductType } from "./product.js";
import { Timespan, type TimespanType } from "./timespan.js";

/**
 * The Advisory object represents publicly disclosed cybersecurity vulnerabilities defined in a Security advisory. e.g. <code> Microsoft KB Article</code>, <code>Apple Security Advisory</code>, or a <code>GitHub Security Advisory (GHSA)</code>
 *
 * OCSF Object: Advisory
 */
export interface AdvisoryType {
  /** The average time to patch. */
  avg_timespan?: TimespanType | undefined;
  /** The Advisory bulletin identifier. */
  bulletin?: string | undefined;
  /** The vendors classification of the Advisory. */
  classification?: string | undefined;
  /** The time when the Advisory record was created. */
  created_time?: number | undefined;
  /** A brief description of the Advisory Record. */
  desc?: string | undefined;
  /** The install state of the Advisory. */
  install_state?: string | undefined;
  /** The normalized install state ID of the Advisory. */
  install_state_id?: number | undefined;
  /** The Advisory has been replaced by another. */
  is_superseded?: boolean | undefined;
  /** The time when the Advisory record was last updated. */
  modified_time?: number | undefined;
  /** The operating system the Advisory applies to. */
  os?: OsType | undefined;
  /** The product where the vulnerability was discovered. */
  product?: ProductType | undefined;
  /** A list of reference URLs with additional information about the vulnerabilities disclosed in the Advisory. */
  references?: string[] | undefined;
  /** A list of Common Vulnerabilities and Exposures (CVE) identifiers related to the vulnerabilities disclosed in the Advisory. */
  related_cves?: CveType[] | undefined;
  /** A list of Common Weakness Enumeration (CWE) identifiers related to the vulnerabilities disclosed in the Advisory. */
  related_cwes?: CweType[] | undefined;
  /** The size in bytes for the Advisory. Usually populated for a KB Article patch. */
  size?: number | undefined;
  /** The Advisory link from the source vendor. */
  src_url?: string | undefined;
  /** A title or a brief phrase summarizing the Advisory. */
  title?: string | undefined;
  /** The unique identifier assigned to the advisory or disclosed vulnerability, e.g, GHSA-5mrr-rgp6-x4gr. */
  uid: string;
  [key: string]: unknown;
}

export const Advisory: z.ZodType<AdvisoryType> = z
  .object({
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
    install_state_id: z.number().int().optional(),
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
  })
  .passthrough() as any;
