import { z } from "zod";

import { Certificate, type CertificateType } from "./certificate.js";
import { Fingerprint, type FingerprintType } from "./fingerprint.js";

/**
 * The Digital Signature object contains information about the cryptographic mechanism used to verify the authenticity, integrity, and origin of the file or application.
 *
 * OCSF Object: Digital Signature
 */
export interface DigitalSignatureType {
  /** The digital signature algorithm used to create the signature, normalized to the caption of 'algorithm_id'. In the case of 'Other', it is defined by the event source. */
  algorithm?: string | undefined;
  /** The identifier of the normalized digital signature algorithm. */
  algorithm_id: number;
  /** The certificate object containing information about the digital certificate. */
  certificate?: CertificateType | undefined;
  /** The time when the digital signature was created. */
  created_time?: number | undefined;
  /** The developer ID on the certificate that signed the file. */
  developer_uid?: string | undefined;
  /** The message digest attribute contains the fixed length message hash representation and the corresponding hashing algorithm information. */
  digest?: FingerprintType | undefined;
  /** The digital signature state defines the signature state, normalized to the caption of 'state_id'. In the case of 'Other', it is defined by the event source. */
  state?: string | undefined;
  /** The normalized identifier of the signature state. */
  state_id?: number | undefined;
  [key: string]: unknown;
}

export const DigitalSignature: z.ZodType<DigitalSignatureType> = z
  .object({
    /** The digital signature algorithm used to create the signature, normalized to the caption of 'algorithm_id'. In the case of 'Other', it is defined by the event source. */
    algorithm: z.string().optional(),
    /** The identifier of the normalized digital signature algorithm. */
    algorithm_id: z.number().int(),
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
    state_id: z.number().int().optional(),
  })
  .passthrough() as any;
