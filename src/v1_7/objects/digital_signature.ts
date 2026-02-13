import { z } from 'zod';

import { Certificate } from './certificate.js';
import { Fingerprint } from './fingerprint.js';

/**
 * The Digital Signature object contains information about the cryptographic mechanism used to verify the authenticity, integrity, and origin of the file or application.
 *
 * OCSF Object: Digital Signature
 */
export const DigitalSignature = z.strictObject({
  /** The digital signature algorithm used to create the signature, normalized to the caption of 'algorithm_id'. In the case of 'Other', it is defined by the event source. */
  algorithm: z.string().optional(),
  /** The identifier of the normalized digital signature algorithm. */
  algorithm_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]),
  /** The certificate object containing information about the digital certificate. */
  certificate: Certificate.optional(),
  /** The time when the digital signature was created. */
  created_time: z.number().int().optional(),
  /** The developer ID on the certificate that signed the file. */
  developer_uid: z.string().optional(),
  /** The message digest attribute contains the fixed length message hash representation and the corresponding hashing algorithm information. */
  digest: Fingerprint.optional(),
  /** The digital signature state defines the signature state, normalized to the caption of 'state_id'. In the case of 'Other', it is defined by the event source. */
  state: z.string().optional(),
  /** The normalized identifier of the signature state. */
  state_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10)]).optional(),
});

export type DigitalSignatureType = z.infer<typeof DigitalSignature>;
