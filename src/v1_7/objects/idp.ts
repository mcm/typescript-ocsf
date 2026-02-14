import { z } from 'zod';

import type { AuthFactorType } from './auth_factor.js';
import type { FingerprintType } from './fingerprint.js';
import type { ScimType } from './scim.js';
import type { SsoType } from './sso.js';

/**
 * The Identity Provider object contains detailed information about a provider responsible for creating, maintaining, and managing identity information while offering authentication services to applications. An Identity Provider (IdP) serves as a trusted authority that verifies the identity of users and issues authentication tokens or assertions to enable secure access to applications or services.
 *
 * OCSF Object: Identity Provider
 */
export interface IdpType {
  /** The name of the Identity Provider. */
  name?: string;
  /** The unique identifier of the Identity Provider. */
  uid?: string;
  /** The Authentication Factors object describes the different types of Multi-Factor Authentication (MFA) methods and/or devices supported by the Identity Provider. */
  auth_factors?: AuthFactorType[];
  /** The primary domain associated with the Identity Provider. */
  domain?: string;
  /** The fingerprint of the X.509 certificate used by the Identity Provider. */
  fingerprint?: FingerprintType;
  /** The Identity Provider enforces Multi Factor Authentication (MFA). */
  has_mfa?: boolean;
  /** The unique identifier (often a URL) used by the Identity Provider as its issuer. */
  issuer?: string;
  /** The supported protocol of the Identity Provider. E.g., SAML, OIDC, or OAuth2. */
  protocol_name?: string;
  /** The System for Cross-domain Identity Management (SCIM) resource object provides a structured set of attributes related to SCIM protocols used for identity provisioning and management across cloud-based platforms. It standardizes user and group provisioning details, enabling identity synchronization and lifecycle management with compatible Identity Providers (IdPs) and applications. SCIM is defined in RFC-7634 */
  scim?: ScimType;
  /** The Single Sign-On (SSO) object provides a structure for normalizing SSO attributes, configuration, and/or settings from Identity Providers. */
  sso?: SsoType;
  /** The configuration state of the Identity Provider, normalized to the caption of the state_id value. In the case of Other, it is defined by the event source. */
  state?: string;
  /** The normalized state ID of the Identity Provider to reflect its configuration or activation status. */
  state_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The tenant ID associated with the Identity Provider. */
  tenant_uid?: string;
  /** The URL for accessing the configuration or metadata of the Identity Provider. */
  url_string?: string;
}

import { AuthFactor } from './auth_factor.js';
import { Fingerprint } from './fingerprint.js';
import { Scim } from './scim.js';
import { Sso } from './sso.js';

const IdpSchema: z.ZodType<IdpType> = z.strictObject({
  /** The name of the Identity Provider. */
  name: z.string().optional(),
  /** The unique identifier of the Identity Provider. */
  uid: z.string().optional(),
  /** The Authentication Factors object describes the different types of Multi-Factor Authentication (MFA) methods and/or devices supported by the Identity Provider. */
  auth_factors: z.array(AuthFactor).optional(),
  /** The primary domain associated with the Identity Provider. */
  domain: z.string().optional(),
  /** The fingerprint of the X.509 certificate used by the Identity Provider. */
  fingerprint: Fingerprint.optional(),
  /** The Identity Provider enforces Multi Factor Authentication (MFA). */
  has_mfa: z.boolean().optional(),
  /** The unique identifier (often a URL) used by the Identity Provider as its issuer. */
  issuer: z.string().optional(),
  /** The supported protocol of the Identity Provider. E.g., SAML, OIDC, or OAuth2. */
  protocol_name: z.string().optional(),
  /** The System for Cross-domain Identity Management (SCIM) resource object provides a structured set of attributes related to SCIM protocols used for identity provisioning and management across cloud-based platforms. It standardizes user and group provisioning details, enabling identity synchronization and lifecycle management with compatible Identity Providers (IdPs) and applications. SCIM is defined in RFC-7634 */
  scim: Scim.optional(),
  /** The Single Sign-On (SSO) object provides a structure for normalizing SSO attributes, configuration, and/or settings from Identity Providers. */
  sso: Sso.optional(),
  /** The configuration state of the Identity Provider, normalized to the caption of the state_id value. In the case of Other, it is defined by the event source. */
  state: z.string().optional(),
  /** The normalized state ID of the Identity Provider to reflect its configuration or activation status. */
  state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The tenant ID associated with the Identity Provider. */
  tenant_uid: z.string().optional(),
  /** The URL for accessing the configuration or metadata of the Identity Provider. */
  url_string: z.string().optional(),
});

export const Idp = IdpSchema;
