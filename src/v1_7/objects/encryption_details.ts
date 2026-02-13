import { z } from 'zod';

/**
 * Details about the encryption methodology utilized.
 *
 * OCSF Object: Encryption Details
 */
export const EncryptionDetails = z.object({
  /** The encryption algorithm used, normalized to the caption of 'algorithm_id */
  algorithm: z.string().optional(),
  /** The encryption algorithm used. */
  algorithm_id: z.number().int().optional(),
  /** The length of the encryption key used. */
  key_length: z.number().int().optional(),
  /** The unique identifier of the key used for encryption. For example, AWS KMS Key ARN. */
  key_uid: z.string().optional(),
  /** The type of the encryption used. */
  type: z.string().optional(),
}).passthrough();

export type EncryptionDetailsType = z.infer<typeof EncryptionDetails>;
