import { z } from 'zod';

/**
 * The JA4+ fingerprint object provides detailed fingerprint information about various aspects of network traffic which is both machine and human readable.
 *
 * OCSF Object: JA4+ Fingerprint
 */
export const Ja4Fingerprint = z.strictObject({
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
  type_id: z.number().int(),
  /** The JA4+ fingerprint value. */
  value: z.string(),
});

export type Ja4FingerprintType = z.infer<typeof Ja4Fingerprint>;
