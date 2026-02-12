import { z } from 'zod';

import { Fingerprint } from './fingerprint.js';
import { San } from './san.js';

/**
 * The Digital Certificate, also known as a Public Key Certificate, object contains information about the ownership and usage of a public key. It serves as a means to establish trust in the authenticity and integrity of the public key and the associated entity.
 *
 * OCSF Object: Digital Certificate
 */
export const Certificate = z.object({
  /** The time when the certificate was created. */
  created_time: z.number().int().optional(),
  /** The expiration time of the certificate. */
  expiration_time: z.number().int().optional(),
  /** The fingerprint list of the certificate. */
  fingerprints: z.array(Fingerprint).optional(),
  /** Denotes whether a digital certificate is self-signed or signed by a known certificate authority (CA). */
  is_self_signed: z.boolean().optional(),
  /** The certificate issuer distinguished name. */
  issuer: z.string(),
  /** The list of subject alternative names that are secured by a specific certificate. */
  sans: z.array(San).optional(),
  /** The serial number of the certificate used to create the digital signature. */
  serial_number: z.string(),
  /** The certificate subject distinguished name. */
  subject: z.string().optional(),
  /** The unique identifier of the certificate. */
  uid: z.string().optional(),
  /** The certificate version. */
  version: z.string().optional(),
}).passthrough() as any;

export type CertificateType = z.infer<typeof Certificate>;
