import { z } from 'zod';

import { Device } from './device.js';

/**
 * An Authentication Factor object describes a category of methods used for identity verification in an authentication attempt.
 *
 * OCSF Object: Authentication Factor
 */
export const AuthFactor = z.strictObject({
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

export type AuthFactorType = z.infer<typeof AuthFactor>;
