import { z } from 'zod';

/**
 * The Token object is the base object for representing tokens, API keys, and authentication credentials used across different contexts. This object provides common attributes for all token types, including protocol-specific authentication tokens (Kerberos, OIDC, SAML) and API/client tokens used for service authentication. When to use this object: Use the base <code>token</code> object directly in API activity events to represent API tokens, client tokens, or API keys used to authenticate API requests. Examples include: Okta API tokens, Microsoft Entra ID Application Registration client secrets, Stripe API keys, AWS API keys. When NOT to use this object: Do NOT use the base <code>token</code> object for protocol-specific authentication tokens in authentication events - use <code>authentication_token</code> instead (which extends this object). Do NOT use <code>token</code> for tracking credential lifecycle and usage patterns - use <code>programmatic_credential</code> instead.
 *
 * OCSF Object: Token
 */
export interface TokenType {
  /** The time that the token was created. */
  created_time?: number;
  /** The expiration time of the token. */
  expiration_time?: number;
  /** Indicates whether the token is renewable. */
  is_renewable?: boolean;
  /** The last time the token was updated. */
  modified_time?: number;
  /** The human-friendly name of a token or key, if available, such as the name from the Okta API Token API. */
  name?: string;
  /** The unique identifier of the tenant or organization that owns the token or key, or the tenant context in which the token is authorized for use. This is particularly relevant in multi-tenant Identity Provider scenarios where tokens are scoped to specific tenants. */
  tenant_uid?: string;
  /** The type of the token, normalized to the caption of the type_id value. This indicates whether the token is a Client Token, API Token, or one of the protocol-specific token types. */
  type?: string;
  /** The normalized token type identifier. Valid values: 0 (Unknown), 1 (Ticket Granting Ticket - Kerberos), 2 (Service Ticket - Kerberos), 3 (Identity Token - OIDC), 4 (Refresh Token - OIDC), 5 (SAML Assertion), 6 (Client Token - IdP-issued), 7 (API Token - generic API keys), 99 (Other). */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The unique ID of a token or key, if available, such as the Secret ID of Entra ID Application Registration Client Secrets. */
  uid?: string;
  /** The network zone or geographic region that the token or key is authorized to be used from. This may represent network-based access restrictions, geographic limitations, or other zone-based authorization policies. Examples include Okta's network zone restrictions or cloud provider region restrictions. */
  zone?: string;
}

type TokenShape = {
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
};

const TokenSchema: z.ZodObject<TokenShape, z.core.$strict> = z.strictObject({
  /** The time that the token was created. */
  created_time: z.number().int().optional(),
  /** The expiration time of the token. */
  expiration_time: z.number().int().optional(),
  /** Indicates whether the token is renewable. */
  is_renewable: z.boolean().optional(),
  /** The last time the token was updated. */
  modified_time: z.number().int().optional(),
  /** The human-friendly name of a token or key, if available, such as the name from the Okta API Token API. */
  name: z.string().optional(),
  /** The unique identifier of the tenant or organization that owns the token or key, or the tenant context in which the token is authorized for use. This is particularly relevant in multi-tenant Identity Provider scenarios where tokens are scoped to specific tenants. */
  tenant_uid: z.string().optional(),
  /** The type of the token, normalized to the caption of the type_id value. This indicates whether the token is a Client Token, API Token, or one of the protocol-specific token types. */
  type: z.string().optional(),
  /** The normalized token type identifier. Valid values: 0 (Unknown), 1 (Ticket Granting Ticket - Kerberos), 2 (Service Ticket - Kerberos), 3 (Identity Token - OIDC), 4 (Refresh Token - OIDC), 5 (SAML Assertion), 6 (Client Token - IdP-issued), 7 (API Token - generic API keys), 99 (Other). */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]).optional(),
  /** The unique ID of a token or key, if available, such as the Secret ID of Entra ID Application Registration Client Secrets. */
  uid: z.string().optional(),
  /** The network zone or geographic region that the token or key is authorized to be used from. This may represent network-based access restrictions, geographic limitations, or other zone-based authorization policies. Examples include Okta's network zone restrictions or cloud provider region restrictions. */
  zone: z.string().optional(),
});

export const Token = TokenSchema;

/** Value → label mappings for each enum field of Token. */
export const TokenLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
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
