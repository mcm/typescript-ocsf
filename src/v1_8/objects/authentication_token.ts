import { z } from 'zod';

import type { EncryptionDetailsType } from './encryption_details.js';

/**
 * The Authentication Token object extends the base <code>token</code> object and represents standardized authentication tokens, tickets, or assertions that conform to established authentication protocols such as Kerberos, OIDC, and SAML. This object inherits all attributes from <code>token</code> and adds protocol-specific attributes (e.g., <code>kerberos_flags</code>, <code>encryption_details</code>) for authentication events. Use this object in authentication events to represent protocol-specific tokens: Kerberos Ticket Granting Tickets (TGT) and Service Tickets (ST), OIDC Identity Tokens and Refresh Tokens, and SAML Assertions. These tokens are issued by authentication servers and identity providers and carry protocol-specific metadata, lifecycle information, and security attributes defined by their respective specifications. When to use this object: Use <code>authentication_token</code> when representing protocol-specific authentication tokens (type_id values 1-5: Kerberos TGT/ST, OIDC ID/Refresh tokens, SAML assertions) in authentication events. When NOT to use this object: Do NOT use <code>authentication_token</code> for API tokens or client tokens (type_id values 6-7) used in API activity events - use the base <code>token</code> object instead. Do NOT use <code>authentication_token</code> for generic API keys - use the base <code>token</code> object instead.
 *
 * OCSF Object: Authentication Token
 */
export interface AuthenticationTokenType {
  /** The time that the authentication token was created or issued. This corresponds to the token issuance time, such as the iat (issued at) claim in OIDC tokens, the issue instant in SAML assertions, or the ticket start time in Kerberos tickets. */
  created_time?: number;
  /** The expiration time of the authentication token. */
  expiration_time?: number;
  /** Indicates whether the authentication token is renewable. */
  is_renewable?: boolean;
  /** The last time the token was updated. */
  modified_time?: number;
  /** The human-friendly name of a token or key, if available, such as the name from the Okta API Token API. */
  name?: string;
  /** The unique identifier of the tenant or organization that owns the token or key, or the tenant context in which the token is authorized for use. This is particularly relevant in multi-tenant Identity Provider scenarios where tokens are scoped to specific tenants. */
  tenant_uid?: string;
  /** The type of the authentication token. */
  type?: string;
  /** The normalized authentication token type identifier. This attribute restricts the base token.type_id enum to only protocol-specific authentication token types (values 0, 1-5, 99). API tokens and client tokens (values 6-7) are not valid for authentication_token - use the base token object for those types. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The unique ID of a token or key, if available, such as the Secret ID of Entra ID Application Registration Client Secrets. */
  uid?: string;
  /** The network zone or geographic region that the token or key is authorized to be used from. This may represent network-based access restrictions, geographic limitations, or other zone-based authorization policies. Examples include Okta's network zone restrictions or cloud provider region restrictions. */
  zone?: string;
  /** The encryption details of the authentication token. */
  encryption_details?: EncryptionDetailsType;
  /** A bitmask, either in hexadecimal or decimal form, which encodes various attributes or permissions associated with a Kerberos ticket. These flags delineate specific characteristics of the ticket, such as its renewability or forwardability. */
  kerberos_flags?: string;
}

import { EncryptionDetails } from './encryption_details.js';

type AuthenticationTokenShape = {
  created_time: z.ZodOptional<z.ZodNumber>;
  expiration_time: z.ZodOptional<z.ZodNumber>;
  is_renewable: z.ZodOptional<z.ZodBoolean>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  name: z.ZodOptional<z.ZodString>;
  tenant_uid: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<99>]>>;
  uid: z.ZodOptional<z.ZodString>;
  zone: z.ZodOptional<z.ZodString>;
  encryption_details: z.ZodOptional<typeof EncryptionDetails>;
  kerberos_flags: z.ZodOptional<z.ZodString>;
};

const AuthenticationTokenSchema: z.ZodObject<AuthenticationTokenShape, z.core.$strict> = z.strictObject({
  /** The time that the authentication token was created or issued. This corresponds to the token issuance time, such as the iat (issued at) claim in OIDC tokens, the issue instant in SAML assertions, or the ticket start time in Kerberos tickets. */
  created_time: z.number().int().optional(),
  /** The expiration time of the authentication token. */
  expiration_time: z.number().int().optional(),
  /** Indicates whether the authentication token is renewable. */
  is_renewable: z.boolean().optional(),
  /** The last time the token was updated. */
  modified_time: z.number().int().optional(),
  /** The human-friendly name of a token or key, if available, such as the name from the Okta API Token API. */
  name: z.string().optional(),
  /** The unique identifier of the tenant or organization that owns the token or key, or the tenant context in which the token is authorized for use. This is particularly relevant in multi-tenant Identity Provider scenarios where tokens are scoped to specific tenants. */
  tenant_uid: z.string().optional(),
  /** The type of the authentication token. */
  type: z.string().optional(),
  /** The normalized authentication token type identifier. This attribute restricts the base token.type_id enum to only protocol-specific authentication token types (values 0, 1-5, 99). API tokens and client tokens (values 6-7) are not valid for authentication_token - use the base token object for those types. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]).optional(),
  /** The unique ID of a token or key, if available, such as the Secret ID of Entra ID Application Registration Client Secrets. */
  uid: z.string().optional(),
  /** The network zone or geographic region that the token or key is authorized to be used from. This may represent network-based access restrictions, geographic limitations, or other zone-based authorization policies. Examples include Okta's network zone restrictions or cloud provider region restrictions. */
  zone: z.string().optional(),
  /** The encryption details of the authentication token. */
  encryption_details: EncryptionDetails.optional(),
  /** A bitmask, either in hexadecimal or decimal form, which encodes various attributes or permissions associated with a Kerberos ticket. These flags delineate specific characteristics of the ticket, such as its renewability or forwardability. */
  kerberos_flags: z.string().optional(),
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
    6: "Client Token",
    7: "API Token",
    99: "Other",
  },
};
