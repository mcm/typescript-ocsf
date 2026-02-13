import { z } from 'zod';

import { Certificate } from './certificate.js';

/**
 * The Single Sign-On (SSO) object provides a structure for normalizing SSO attributes, configuration, and/or settings from Identity Providers.
 *
 * OCSF Object: SSO
 */
export const Sso = z.object({
  /** The authorization protocol as defined by the caption of auth_protocol_id. In the case of Other, it is defined by the event source. */
  auth_protocol: z.string().optional(),
  /** The normalized identifier of the authentication protocol used by the SSO resource. */
  auth_protocol_id: z.number().int().optional(),
  /** Digital Signature associated with the SSO resource, e.g., SAML X.509 certificate details. */
  certificate: Certificate.optional(),
  /** When the SSO resource was created. */
  created_time: z.number().int().optional(),
  /** The duration (in minutes) for an SSO session, after which re-authentication is required. */
  duration_mins: z.number().int().optional(),
  /** Duration (in minutes) of allowed inactivity before Single Sign-On (SSO) session expiration. */
  idle_timeout: z.number().int().optional(),
  /** URL for initiating an SSO login request. */
  login_endpoint: z.string().optional(),
  /** URL for initiating an SSO logout request, allowing sessions to be terminated across applications. */
  logout_endpoint: z.string().optional(),
  /** URL where metadata about the SSO configuration is available (e.g., for SAML configurations). */
  metadata_endpoint: z.string().optional(),
  /** The most recent time when the SSO resource was updated. */
  modified_time: z.number().int().optional(),
  /** The name of the SSO resource. */
  name: z.string().optional(),
  /** The supported protocol for the SSO resource. E.g., SAML or OIDC. */
  protocol_name: z.string().optional(),
  /** Scopes define the specific permissions or actions that the client is allowed to perform on behalf of the user. Each scope represents a different set of permissions, and the user can selectively grant or deny access to specific scopes during the authorization process. */
  scopes: z.array(z.string()).optional(),
  /** A unique identifier for a SSO resource. */
  uid: z.string().optional(),
  /** Name of the vendor or service provider implementing SSO. E.g., Okta, Auth0, Microsoft. */
  vendor_name: z.string().optional(),
}).passthrough();

export type SsoType = z.infer<typeof Sso>;
