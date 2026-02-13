import { z } from 'zod';

/**
 * Details about the encrytpion methodology utilized.
 *
 * OCSF Object: Encryption Details
 */
export const EncryptionDetails = z.strictObject({
  /** The encryption algorithm used, normalized to the caption of 'algorithm_id */
  algorithm: z.string().optional(),
  /** The encryption algorithm used. */
  algorithm_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]).optional(),
  /** The length of the encryption key used. */
  key_length: z.number().int().optional(),
  /** The unique identifier of the key used for encrpytion. For example, AWS KMS Key ARN. */
  key_uid: z.string().optional(),
  /** The type of the encryption used. */
  type: z.string().optional(),
});

export type EncryptionDetailsType = z.infer<typeof EncryptionDetails>;
