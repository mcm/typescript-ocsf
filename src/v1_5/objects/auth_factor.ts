import { z } from 'zod';

import type { DeviceType } from './device.js';

/**
 * An Authentication Factor object describes a category of methods used for identity verification in an authentication attempt.
 *
 * OCSF Object: Authentication Factor
 */
export interface AuthFactorType {
  /** Device used to complete an authentication request. */
  device?: DeviceType;
  /** The email address used in an email-based authentication factor. */
  email_addr?: string;
  /** The type of authentication factor used in an authentication attempt. */
  factor_type?: string;
  /** The normalized identifier for the authentication factor. */
  factor_type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 99;
  /** Whether the authentication factor is an HMAC-based One-time Password (HOTP). */
  is_hotp?: boolean;
  /** Whether the authentication factor is a Time-based One-time Password (TOTP). */
  is_totp?: boolean;
  /** The phone number used for a telephony-based authentication request. */
  phone_number?: string;
  /** The name of provider for an authentication factor. */
  provider?: string;
  /** The question(s) provided to user for a question-based authentication factor. */
  security_questions?: string[];
}

import { Device } from './device.js';

type AuthFactorShape = {
  device: z.ZodOptional<typeof Device>;
  email_addr: z.ZodOptional<z.ZodString>;
  factor_type: z.ZodOptional<z.ZodString>;
  factor_type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<99>]>;
  is_hotp: z.ZodOptional<z.ZodBoolean>;
  is_totp: z.ZodOptional<z.ZodBoolean>;
  phone_number: z.ZodOptional<z.ZodString>;
  provider: z.ZodOptional<z.ZodString>;
  security_questions: z.ZodOptional<z.ZodArray<z.ZodString>>;
};

const AuthFactorSchema: z.ZodObject<AuthFactorShape, z.core.$strict> = z.strictObject({
  /** Device used to complete an authentication request. */
  device: Device.optional(),
  /** The email address used in an email-based authentication factor. */
  email_addr: z.string().optional(),
  /** The type of authentication factor used in an authentication attempt. */
  factor_type: z.string().optional(),
  /** The normalized identifier for the authentication factor. */
  factor_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(99)]),
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
});

export const AuthFactor = AuthFactorSchema;

/** Value → label mappings for each enum field of AuthFactor. */
export const AuthFactorLabels: Readonly<Record<"factor_type_id", Readonly<Record<number, string>>>> = {
  factor_type_id: {
    0: "Unknown",
    1: "SMS",
    2: "Security Question",
    3: "Phone Call",
    4: "Biometric",
    5: "Push Notification",
    6: "Hardware Token",
    7: "OTP",
    8: "Email",
    9: "U2F",
    10: "WebAuthn",
    11: "Password",
    99: "Other",
  },
};
