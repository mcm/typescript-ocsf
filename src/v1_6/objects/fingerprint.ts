import { z } from 'zod';

/**
 * The Fingerprint object provides detailed information about a digital fingerprint, which is a compact representation of data used to identify a longer piece of information, such as a public key or file content. It contains the algorithm and value of the fingerprint, enabling efficient and reliable identification of the associated data.
 *
 * OCSF Object: Fingerprint
 */
export const Fingerprint = z.object({
  /** The hash algorithm used to create the digital fingerprint, normalized to the caption of algorithm_id. In the case of Other, it is defined by the event source. */
  algorithm: z.string().optional(),
  /** The identifier of the normalized hash algorithm, which was used to create the digital fingerprint. */
  algorithm_id: z.number().int(),
  /** The digital fingerprint value. */
  value: z.string(),
}).passthrough();

export type FingerprintType = z.infer<typeof Fingerprint>;
