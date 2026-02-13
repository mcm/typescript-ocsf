import { z } from 'zod';

import { AuthFactor } from './auth_factor.js';
import { Fingerprint } from './fingerprint.js';
import { Scim } from './scim.js';
import { Sso } from './sso.js';

/**
 * The Identity Provider object contains detailed information about a provider responsible for creating, maintaining, and managing identity information while offering authentication services to applications. An Identity Provider (IdP) serves as a trusted authority that verifies the identity of users and issues authentication tokens or assertions to enable secure access to applications or services.
 *
 * OCSF Object: Identity Provider
 */
export const Idp: any = z.object({
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
  state_id: z.number().int().optional(),
  /** The tenant ID associated with the Identity Provider. */
  tenant_uid: z.string().optional(),
  /** The URL for accessing the configuration or metadata of the Identity Provider. */
  url_string: z.string().optional(),
}).passthrough();

export type IdpType = z.infer<typeof Idp>;
