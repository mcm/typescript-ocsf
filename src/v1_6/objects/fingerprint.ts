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
  algorithm_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 99;
  /** The digital fingerprint value. */
  value: string;
}

type FingerprintShape = {
  algorithm: z.ZodOptional<z.ZodString>;
  algorithm_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<15>, z.ZodLiteral<16>, z.ZodLiteral<17>, z.ZodLiteral<99>]>;
  value: z.ZodString;
};

const FingerprintSchema: z.ZodObject<FingerprintShape, z.core.$strict> = z.strictObject({
  /** The hash algorithm used to create the digital fingerprint, normalized to the caption of algorithm_id. In the case of Other, it is defined by the event source. */
  algorithm: z.string().optional(),
  /** The identifier of the normalized hash algorithm, which was used to create the digital fingerprint. */
  algorithm_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(99)]),
  /** The digital fingerprint value. */
  value: z.string(),
});

export const Fingerprint = FingerprintSchema;

/** Value → label mappings for each enum field of Fingerprint. */
export const FingerprintLabels: Readonly<Record<"algorithm_id", Readonly<Record<number, string>>>> = {
  algorithm_id: {
    0: "Unknown",
    1: "MD5",
    2: "SHA-1",
    3: "SHA-256",
    4: "SHA-512",
    5: "CTPH",
    6: "TLSH",
    7: "quickXorHash",
    8: "SHA-224",
    9: "SHA-384",
    10: "SHA-512/224",
    11: "SHA-512/256",
    12: "SHA3-224",
    13: "SHA3-256",
    14: "SHA3-384",
    15: "SHA3-512",
    16: "xxHash H3 64-bit",
    17: "xxHash H3 128-bit",
    99: "Other",
  },
};
