import { z } from "zod";

/**
 * Details about the encryption methodology utilized.
 *
 * OCSF Object: Encryption Details
 */
export interface EncryptionDetailsType {
  /** The encryption algorithm used, normalized to the caption of 'algorithm_id */
  algorithm?: string | undefined;
  /** The encryption algorithm used. */
  algorithm_id?: number | undefined;
  /** The length of the encryption key used. */
  key_length?: number | undefined;
  /** The unique identifier of the key used for encryption. For example, AWS KMS Key ARN. */
  key_uid?: string | undefined;
  /** The type of the encryption used. */
  type?: string | undefined;
  [key: string]: unknown;
}

export const EncryptionDetails: z.ZodType<EncryptionDetailsType> = z
  .object({
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
  })
  .passthrough() as any;
