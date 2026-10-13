import { z } from 'zod';

/**
 * The TSIG (Transaction Signature) object represents a TSIG resource record as defined in RFC 2845. TSIG uses a shared secret key and one-way hash function to authenticate DNS messages. Per RFC 2845, at most one TSIG record is permitted per DNS message.
 *
 * OCSF Object: TSIG
 */
export interface TsigType {
  /** The HMAC algorithm used to compute the MAC. For example: hmac-sha256. */
  algorithm?: string;
  /** The TSIG error, normalized to the caption of the error_id value. In the case of 'Other', it is defined by the event source. */
  error?: string;
  /** The normalized TSIG-specific error code as defined in RFC 2845 and RFC 6895. This is independent of the DNS message header RCODE. */
  error_id?: 0 | 16 | 17 | 18 | 99;
  /** The name of the shared secret key used to sign the DNS message. For example: my-tsig-key.example.com. */
  key_name?: string;
}

type TsigShape = {
  algorithm: z.ZodOptional<z.ZodString>;
  error: z.ZodOptional<z.ZodString>;
  error_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<16>, z.ZodLiteral<17>, z.ZodLiteral<18>, z.ZodLiteral<99>]>>;
  key_name: z.ZodOptional<z.ZodString>;
};

const TsigSchema: z.ZodObject<TsigShape, z.core.$strict> = z.strictObject({
  /** The HMAC algorithm used to compute the MAC. For example: hmac-sha256. */
  algorithm: z.string().optional(),
  /** The TSIG error, normalized to the caption of the error_id value. In the case of 'Other', it is defined by the event source. */
  error: z.string().optional(),
  /** The normalized TSIG-specific error code as defined in RFC 2845 and RFC 6895. This is independent of the DNS message header RCODE. */
  error_id: z.union([z.literal(0), z.literal(16), z.literal(17), z.literal(18), z.literal(99)]).optional(),
  /** The name of the shared secret key used to sign the DNS message. For example: my-tsig-key.example.com. */
  key_name: z.string().optional(),
});

export const Tsig = TsigSchema;

/** Value → label mappings for each enum field of Tsig. */
export const TsigLabels: Readonly<Record<"error_id", Readonly<Record<number, string>>>> = {
  error_id: {
    0: "NoError",
    16: "BADSIG",
    17: "BADKEY",
    18: "BADTIME",
    99: "Other",
  },
};
