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

type Ja4FingerprintShape = {
  section_a: z.ZodOptional<z.ZodString>;
  section_b: z.ZodOptional<z.ZodString>;
  section_c: z.ZodOptional<z.ZodString>;
  section_d: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<99>]>;
  value: z.ZodString;
};

const Ja4FingerprintSchema: z.ZodObject<Ja4FingerprintShape, z.core.$strict> = z.strictObject({
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

/** Value → label mappings for each enum field of Ja4Fingerprint. */
export const Ja4FingerprintLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "JA4",
    2: "JA4Server",
    3: "JA4HTTP",
    4: "JA4Latency",
    5: "JA4X509",
    6: "JA4SSH",
    7: "JA4TCP",
    8: "JA4TCPServer",
    9: "JA4TCPScan",
    99: "Other",
  },
};
