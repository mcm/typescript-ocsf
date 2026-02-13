import { z } from 'zod';

/**
 * The Email Authentication object describes the Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC) attributes of an email.
 *
 * OCSF Object: Email Authentication
 */
export const EmailAuth: any = z.object({
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
}).passthrough();

export type EmailAuthType = z.infer<typeof EmailAuth>;
