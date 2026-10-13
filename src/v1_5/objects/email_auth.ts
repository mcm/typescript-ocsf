import { z } from 'zod';

/**
 * The Email Authentication object describes the Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC) attributes of an email.
 *
 * OCSF Object: Email Authentication
 */
export interface EmailAuthType {
  /** The DomainKeys Identified Mail (DKIM) status of the email. */
  dkim?: string;
  /** The DomainKeys Identified Mail (DKIM) signing domain of the email. */
  dkim_domain?: string;
  /** The DomainKeys Identified Mail (DKIM) signature used by the sending/receiving system. */
  dkim_signature?: string;
  /** The Domain-based Message Authentication, Reporting and Conformance (DMARC) status of the email. */
  dmarc?: string;
  /** The Domain-based Message Authentication, Reporting and Conformance (DMARC) override action. */
  dmarc_override?: string;
  /** The Domain-based Message Authentication, Reporting and Conformance (DMARC) policy status. */
  dmarc_policy?: string;
  /** The Sender Policy Framework (SPF) status of the email. */
  spf?: string;
}

type EmailAuthShape = {
  dkim: z.ZodOptional<z.ZodString>;
  dkim_domain: z.ZodOptional<z.ZodString>;
  dkim_signature: z.ZodOptional<z.ZodString>;
  dmarc: z.ZodOptional<z.ZodString>;
  dmarc_override: z.ZodOptional<z.ZodString>;
  dmarc_policy: z.ZodOptional<z.ZodString>;
  spf: z.ZodOptional<z.ZodString>;
};

const EmailAuthSchema: z.ZodObject<EmailAuthShape, z.core.$strict> = z.strictObject({
  /** The DomainKeys Identified Mail (DKIM) status of the email. */
  dkim: z.string().optional(),
  /** The DomainKeys Identified Mail (DKIM) signing domain of the email. */
  dkim_domain: z.string().optional(),
  /** The DomainKeys Identified Mail (DKIM) signature used by the sending/receiving system. */
  dkim_signature: z.string().optional(),
  /** The Domain-based Message Authentication, Reporting and Conformance (DMARC) status of the email. */
  dmarc: z.string().optional(),
  /** The Domain-based Message Authentication, Reporting and Conformance (DMARC) override action. */
  dmarc_override: z.string().optional(),
  /** The Domain-based Message Authentication, Reporting and Conformance (DMARC) policy status. */
  dmarc_policy: z.string().optional(),
  /** The Sender Policy Framework (SPF) status of the email. */
  spf: z.string().optional(),
});

export const EmailAuth = EmailAuthSchema;

/** Value → label mappings for each enum field of EmailAuth. */
export const EmailAuthLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
