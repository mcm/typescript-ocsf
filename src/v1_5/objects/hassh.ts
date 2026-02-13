import { z } from 'zod';

import { Fingerprint } from './fingerprint.js';

/**
 * The HASSH object contains SSH network fingerprinting values for specific client/server implementations. It provides a standardized way of identifying and categorizing SSH connections based on their unique characteristics and behavior.
 *
 * OCSF Object: HASSH
 */
export const Hassh = z.object({
  /** The concatenation of key exchange, encryption, authentication and compression algorithms (separated by ';'). NOTE: This is not the underlying algorithm for the hash implementation. */
  algorithm: z.string().optional(),
  /** The hash of the key exchange, encryption, authentication and compression algorithms. */
  fingerprint: Fingerprint,
}).passthrough();

export type HasshType = z.infer<typeof Hassh>;
