import { z } from 'zod';

/**
 * The JA4+ fingerprint object provides detailed fingerprint information about various aspects of network traffic which is both machine and human readable.
 *
 * OCSF Object: JA4+ Fingerprint
 */
export interface Ja4FingerprintType {
  /** The 'a' section of the JA4 fingerprint. */
  section_a?: string;
  /** The 'b' section of the JA4 fingerprint. */
  section_b?: string;
  /** The 'c' section of the JA4 fingerprint. */
  section_c?: string;
  /** The 'd' section of the JA4 fingerprint. */
  section_d?: string;
  /** The JA4+ fingerprint type as defined by FoxIO, normalized to the caption of 'type_id'. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The identifier of the JA4+ fingerprint type. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;
  /** The JA4+ fingerprint value. */
  value: string;
}

const Ja4FingerprintSchema = z.strictObject({
  /** The 'a' section of the JA4 fingerprint. */
  section_a: z.string().optional(),
  /** The 'b' section of the JA4 fingerprint. */
  section_b: z.string().optional(),
  /** The 'c' section of the JA4 fingerprint. */
  section_c: z.string().optional(),
  /** The 'd' section of the JA4 fingerprint. */
  section_d: z.string().optional(),
  /** The JA4+ fingerprint type as defined by FoxIO, normalized to the caption of 'type_id'. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The identifier of the JA4+ fingerprint type. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(99)]),
  /** The JA4+ fingerprint value. */
  value: z.string(),
});

export const Ja4Fingerprint = Ja4FingerprintSchema;
