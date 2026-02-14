import { z } from 'zod';

import type { FingerprintType } from './fingerprint.js';

/**
 * The HASSH object contains SSH network fingerprinting values for specific client/server implementations. It provides a standardized way of identifying and categorizing SSH connections based on their unique characteristics and behavior.
 *
 * OCSF Object: HASSH
 */
export interface HasshType {
  /** The concatenation of key exchange, encryption, authentication and compression algorithms (separated by ';'). NOTE: This is not the underlying algorithm for the hash implementation. */
  algorithm?: string;
  /** The hash of the key exchange, encryption, authentication and compression algorithms. */
  fingerprint: FingerprintType;
}

import { Fingerprint } from './fingerprint.js';

const HasshSchema: z.ZodType<HasshType> = z.strictObject({
  /** The concatenation of key exchange, encryption, authentication and compression algorithms (separated by ';'). NOTE: This is not the underlying algorithm for the hash implementation. */
  algorithm: z.string().optional(),
  /** The hash of the key exchange, encryption, authentication and compression algorithms. */
  fingerprint: Fingerprint,
});

export const Hassh = HasshSchema;
