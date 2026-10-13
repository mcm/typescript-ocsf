import { z } from 'zod';

/**
 * The CWE object represents a weakness in a software system that can be exploited by a threat actor to perform an attack. The CWE object is based on the Common Weakness Enumeration (CWE) catalog.
 *
 * OCSF Object: CWE
 */
export interface CweType {
  /** The caption assigned to the Common Weakness Enumeration unique identifier. */
  caption?: string;
  /** URL pointing to the CWE Specification. For more information see CWE. */
  src_url?: string;
  /** The Common Weakness Enumeration unique number assigned to a specific weakness. A CWE Identifier begins "CWE" followed by a sequence of digits that acts as a unique identifier. For example: CWE-123. */
  uid: string;
}

type CweShape = {
  caption: z.ZodOptional<z.ZodString>;
  src_url: z.ZodOptional<z.ZodString>;
  uid: z.ZodString;
};

const CweSchema: z.ZodObject<CweShape, z.core.$strict> = z.strictObject({
  /** The caption assigned to the Common Weakness Enumeration unique identifier. */
  caption: z.string().optional(),
  /** URL pointing to the CWE Specification. For more information see CWE. */
  src_url: z.string().optional(),
  /** The Common Weakness Enumeration unique number assigned to a specific weakness. A CWE Identifier begins "CWE" followed by a sequence of digits that acts as a unique identifier. For example: CWE-123. */
  uid: z.string(),
});

export const Cwe = CweSchema;

/** Value → label mappings for each enum field of Cwe. */
export const CweLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
