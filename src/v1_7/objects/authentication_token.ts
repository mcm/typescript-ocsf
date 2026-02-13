import { z } from 'zod';

import { EncryptionDetails } from './encryption_details.js';

/**
 * The Authentication Token object represents standardized authentication tokens, tickets, or assertions that conform to established authentication protocols such as Kerberos, OIDC, and SAML. These tokens are issued by authentication servers and identity providers and carry protocol-specific metadata, lifecycle information, and security attributes defined by their respective specifications.
 *
 * OCSF Object: Authentication Token
 */
export const AuthenticationToken: any = z.object({
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
  type_id: z.number().int().optional(),
}).passthrough();

export type AuthenticationTokenType = z.infer<typeof AuthenticationToken>;
