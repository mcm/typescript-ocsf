import { z } from 'zod';

import { Cvss } from './cvss.js';
import { Cwe } from './cwe.js';
import { Epss } from './epss.js';
import { Product } from './product.js';

/**
 * The Common Vulnerabilities and Exposures (CVE) object represents publicly disclosed cybersecurity vulnerabilities defined in CVE Program catalog (<a target='_blank' href='https://cve.mitre.org/'>CVE</a>). There is one CVE Record for each vulnerability in the catalog.
 *
 * OCSF Object: CVE
 */
export const Cve = z.strictObject({
  /** The Record Creation Date identifies when the CVE ID was issued to a CVE Numbering Authority (CNA) or the CVE Record was published on the CVE List. Note that the Record Creation Date does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE. */
  created_time: z.number().int().optional(),
  /** The CVSS object details Common Vulnerability Scoring System (CVSS) scores from the advisory that are related to the vulnerability. */
  cvss: z.array(Cvss).optional(),
  /** The CWE object represents a weakness in a software system that can be exploited by a threat actor to perform an attack. The CWE object is based on the Common Weakness Enumeration (CWE) catalog. */
  cwe: Cwe.optional(),
  /** The Common Weakness Enumeration (CWE) unique identifier. For example: CWE-787. */
  cwe_uid: z.string().optional(),
  /** Common Weakness Enumeration (CWE) definition URL. For example: https://cwe.mitre.org/data/definitions/787.html. */
  cwe_url: z.string().optional(),
  /** A brief description of the CVE Record. */
  desc: z.string().optional(),
  /** The Exploit Prediction Scoring System (EPSS) object describes the estimated probability a vulnerability will be exploited. EPSS is a community-driven effort to combine descriptive information about vulnerabilities (CVEs) with evidence of actual exploitation in-the-wild. (EPSS). */
  epss: Epss.optional(),
  /** The Record Modified Date identifies when the CVE record was last updated. */
  modified_time: z.number().int().optional(),
  /** The product where the vulnerability was discovered. */
  product: Product.optional(),
  /** A list of reference URLs with additional information about the CVE Record. */
  references: z.array(z.string()).optional(),
  /** Describes the Common Weakness Enumeration (CWE) details related to the CVE Record. */
  related_cwes: z.array(Cwe).optional(),
  /** A title or a brief phrase summarizing the CVE record. */
  title: z.string().optional(),
  /** The vulnerability type as selected from a large dropdown menu during CVE refinement.Most frequently used vulnerability types are: DoS, Code Execution, Overflow, Memory Corruption, Sql Injection, XSS, Directory Traversal, Http Response Splitting, Bypass something, Gain Information, Gain Privileges, CSRF, File Inclusion. For more information see Vulnerabilities By Type distributions. */
  type: z.string().optional(),
  /** The Common Vulnerabilities and Exposures unique number assigned to a specific computer vulnerability. A CVE Identifier begins with 4 digits representing the year followed by a sequence of digits that acts as a unique identifier. For example: CVE-2021-12345. */
  uid: z.string(),
});

export type CveType = z.infer<typeof Cve>;
