import { z } from 'zod';

/**
 * Details about the encryption methodology utilized.
 *
 * OCSF Object: Encryption Details
 */
export interface EncryptionDetailsType {
  /** The encryption algorithm used, normalized to the caption of 'algorithm_id */
  algorithm?: string;
  /** The encryption algorithm used. */
  algorithm_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The length of the encryption key used. */
  key_length?: number;
  /** The unique identifier of the key used for encryption. For example, AWS KMS Key ARN. */
  key_uid?: string;
  /** The type of the encryption used. */
  type?: string;
}

type EncryptionDetailsShape = {
  algorithm: z.ZodOptional<z.ZodString>;
  algorithm_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  key_length: z.ZodOptional<z.ZodNumber>;
  key_uid: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
};

const EncryptionDetailsSchema: z.ZodObject<EncryptionDetailsShape, z.core.$strict> = z.strictObject({
  /** The encryption algorithm used, normalized to the caption of 'algorithm_id */
  algorithm: z.string().optional(),
  /** The encryption algorithm used. */
  algorithm_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The length of the encryption key used. */
  key_length: z.number().int().optional(),
  /** The unique identifier of the key used for encryption. For example, AWS KMS Key ARN. */
  key_uid: z.string().optional(),
  /** The type of the encryption used. */
  type: z.string().optional(),
});

export const EncryptionDetails = EncryptionDetailsSchema;

/** Value → label mappings for each enum field of EncryptionDetails. */
export const EncryptionDetailsLabels: Readonly<Record<"algorithm_id", Readonly<Record<number, string>>>> = {
  algorithm_id: {
    0: "Unknown",
    1: "DES",
    2: "TripleDES",
    3: "AES",
    4: "RSA",
    5: "ECC",
    6: "SM2",
    99: "Other",
  },
};
