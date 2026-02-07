import { z } from "zod";

/**
 * The CWE object represents a weakness in a software system that can be exploited by a threat actor to perform an attack. The CWE object is based on the <a target='_blank' href='https://cwe.mitre.org/'>Common Weakness Enumeration (CWE)</a> catalog.
 *
 * OCSF Object: CWE
 */
export interface CweType {
  /** The caption assigned to the Common Weakness Enumeration unique identifier. */
  caption?: string | undefined;
  /** URL pointing to the CWE Specification. For more information see CWE. */
  src_url?: string | undefined;
  /** The Common Weakness Enumeration unique number assigned to a specific weakness. A CWE Identifier begins "CWE" followed by a sequence of digits that acts as a unique identifier. For example: CWE-123. */
  uid: string;
  [key: string]: unknown;
}

export const Cwe: z.ZodType<CweType> = z
  .object({
    /** The caption assigned to the Common Weakness Enumeration unique identifier. */
    caption: z.string().optional(),
    /** URL pointing to the CWE Specification. For more information see CWE. */
    src_url: z.string().optional(),
    /** The Common Weakness Enumeration unique number assigned to a specific weakness. A CWE Identifier begins "CWE" followed by a sequence of digits that acts as a unique identifier. For example: CWE-123. */
    uid: z.string(),
  })
  .passthrough() as any;
