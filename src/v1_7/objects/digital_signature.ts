import { z } from 'zod';

import type { CertificateType } from './certificate.js';
import type { FingerprintType } from './fingerprint.js';

/**
 * The Digital Signature object contains information about the cryptographic mechanism used to verify the authenticity, integrity, and origin of the file or application.
 *
 * OCSF Object: Digital Signature
 */
export interface DigitalSignatureType {
  /** The digital signature algorithm used to create the signature, normalized to the caption of 'algorithm_id'. In the case of 'Other', it is defined by the event source. */
  algorithm?: string;
  /** The identifier of the normalized digital signature algorithm. */
  algorithm_id: 0 | 1 | 2 | 3 | 4 | 99;
  /** The certificate object containing information about the digital certificate. */
  certificate?: CertificateType;
  /** The time when the digital signature was created. */
  created_time?: number;
  /** The developer ID on the certificate that signed the file. */
  developer_uid?: string;
  /** The message digest attribute contains the fixed length message hash representation and the corresponding hashing algorithm information. */
  digest?: FingerprintType;
  /** The digital signature state defines the signature state, normalized to the caption of 'state_id'. In the case of 'Other', it is defined by the event source. */
  state?: string;
  /** The normalized identifier of the signature state. */
  state_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
}

import { Certificate } from './certificate.js';
import { Fingerprint } from './fingerprint.js';

type DigitalSignatureShape = {
  algorithm: z.ZodOptional<z.ZodString>;
  algorithm_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>;
  certificate: z.ZodOptional<typeof Certificate>;
  created_time: z.ZodOptional<z.ZodNumber>;
  developer_uid: z.ZodOptional<z.ZodString>;
  digest: z.ZodOptional<typeof Fingerprint>;
  state: z.ZodOptional<z.ZodString>;
  state_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<99>]>>;
};

const DigitalSignatureSchema: z.ZodObject<DigitalSignatureShape, z.core.$strict> = z.strictObject({
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
  state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]).optional(),
});

export const DigitalSignature = DigitalSignatureSchema;

/** Value → label mappings for each enum field of DigitalSignature. */
export const DigitalSignatureLabels: Readonly<Record<"algorithm_id" | "state_id", Readonly<Record<number, string>>>> = {
  algorithm_id: {
    0: "Unknown",
    1: "DSA",
    2: "RSA",
    3: "ECDSA",
    4: "Authenticode",
    99: "Other",
  },
  state_id: {
    0: "Unknown",
    1: "Valid",
    2: "Expired",
    3: "Revoked",
    4: "Suspended",
    5: "Pending",
    6: "Untrusted",
    7: "Distrusted",
    8: "WrongUsage",
    9: "Bad",
    10: "Broken",
    99: "Other",
  },
};
