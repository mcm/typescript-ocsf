import { z } from 'zod';

import type { EncryptionDetailsType } from './encryption_details.js';

/**
 * The Authentication Token object represents standardized authentication tokens, tickets, or assertions that conform to established authentication protocols such as Kerberos, OIDC, and SAML. These tokens are issued by authentication servers and identity providers and carry protocol-specific metadata, lifecycle information, and security attributes defined by their respective specifications.
 *
 * OCSF Object: Authentication Token
 */
export interface AuthenticationTokenType {
  /** The time that the authentication token was created. */
  created_time?: number;
  /** The encryption details of the authentication token. */
  encryption_details?: EncryptionDetailsType;
  /** The expiration time of the authentication token. */
  expiration_time?: number;
  /** Indicates whether the authentication token is renewable. */
  is_renewable?: boolean;
  /** A bitmask, either in hexadecimal or decimal form, which encodes various attributes or permissions associated with a Kerberos ticket. These flags delineate specific characteristics of the ticket, such as its renewability or forwardability. */
  kerberos_flags?: string;
  /** The type of the authentication token. */
  type?: string;
  /** The normalized authentication token type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 99;
}

import { EncryptionDetails } from './encryption_details.js';

type AuthenticationTokenShape = {
  created_time: z.ZodOptional<z.ZodNumber>;
  encryption_details: z.ZodOptional<typeof EncryptionDetails>;
  expiration_time: z.ZodOptional<z.ZodNumber>;
  is_renewable: z.ZodOptional<z.ZodBoolean>;
  kerberos_flags: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<99>]>>;
};

const AuthenticationTokenSchema: z.ZodObject<AuthenticationTokenShape, z.core.$strict> = z.strictObject({
  /** The time that the authentication token was created. */
  created_time: z.number().int().optional(),
  /** The encryption details of the authentication token. */
  encryption_details: EncryptionDetails.optional(),
  /** The expiration time of the authentication token. */
  expiration_time: z.number().int().optional(),
  /** Indicates whether the authentication token is renewable. */
  is_renewable: z.boolean().optional(),
  /** A bitmask, either in hexadecimal or decimal form, which encodes various attributes or permissions associated with a Kerberos ticket. These flags delineate specific characteristics of the ticket, such as its renewability or forwardability. */
  kerberos_flags: z.string().optional(),
  /** The type of the authentication token. */
  type: z.string().optional(),
  /** The normalized authentication token type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]).optional(),
});

export const AuthenticationToken = AuthenticationTokenSchema;

/** Value → label mappings for each enum field of AuthenticationToken. */
export const AuthenticationTokenLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Ticket Granting Ticket",
    2: "Service Ticket",
    3: "Identity Token",
    4: "Refresh Token",
    5: "SAML Assertion",
    99: "Other",
  },
};
