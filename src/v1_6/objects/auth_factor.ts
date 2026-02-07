import { z } from "zod";

import { Device, type DeviceType } from "./device.js";

/**
 * An Authentication Factor object describes a category of methods used for identity verification in an authentication attempt.
 *
 * OCSF Object: Authentication Factor
 */
export interface AuthFactorType {
  /** Device used to complete an authentication request. */
  device?: DeviceType | undefined;
  /** The email address used in an email-based authentication factor. */
  email_addr?: string | undefined;
  /** The type of authentication factor used in an authentication attempt. */
  factor_type?: string | undefined;
  /** The normalized identifier for the authentication factor. */
  factor_type_id: number;
  /** Whether the authentication factor is an HMAC-based One-time Password (HOTP). */
  is_hotp?: boolean | undefined;
  /** Whether the authentication factor is a Time-based One-time Password (TOTP). */
  is_totp?: boolean | undefined;
  /** The phone number used for a telephony-based authentication request. */
  phone_number?: string | undefined;
  /** The name of provider for an authentication factor. */
  provider?: string | undefined;
  /** The question(s) provided to user for a question-based authentication factor. */
  security_questions?: string[] | undefined;
  [key: string]: unknown;
}

export const AuthFactor: z.ZodType<AuthFactorType> = z
  .object({
    /** Device used to complete an authentication request. */
    device: Device.optional(),
    /** The email address used in an email-based authentication factor. */
    email_addr: z.string().optional(),
    /** The type of authentication factor used in an authentication attempt. */
    factor_type: z.string().optional(),
    /** The normalized identifier for the authentication factor. */
    factor_type_id: z.number().int(),
    /** Whether the authentication factor is an HMAC-based One-time Password (HOTP). */
    is_hotp: z.boolean().optional(),
    /** Whether the authentication factor is a Time-based One-time Password (TOTP). */
    is_totp: z.boolean().optional(),
    /** The phone number used for a telephony-based authentication request. */
    phone_number: z.string().optional(),
    /** The name of provider for an authentication factor. */
    provider: z.string().optional(),
    /** The question(s) provided to user for a question-based authentication factor. */
    security_questions: z.array(z.string()).optional(),
  })
  .passthrough() as any;
