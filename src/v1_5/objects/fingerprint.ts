import { z } from 'zod';

/**
 * The Fingerprint object provides detailed information about a digital fingerprint, which is a compact representation of data used to identify a longer piece of information, such as a public key or file content. It contains the algorithm and value of the fingerprint, enabling efficient and reliable identification of the associated data.
 *
 * OCSF Object: Fingerprint
 */
export interface FingerprintType {
  /** The hash algorithm used to create the digital fingerprint, normalized to the caption of algorithm_id. In the case of Other, it is defined by the event source. */
  algorithm?: string;
  /** The identifier of the normalized hash algorithm, which was used to create the digital fingerprint. */
  algorithm_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The digital fingerprint value. */
  value: string;
}

const FingerprintSchema = z.strictObject({
  /** The hash algorithm used to create the digital fingerprint, normalized to the caption of algorithm_id. In the case of Other, it is defined by the event source. */
  algorithm: z.string().optional(),
  /** The identifier of the normalized hash algorithm, which was used to create the digital fingerprint. */
  algorithm_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
  /** The digital fingerprint value. */
  value: z.string(),
});

export const Fingerprint = FingerprintSchema;
