import { z } from 'zod';

/**
 * The System for Cross-domain Identity Management (SCIM) Configuration object provides a structured set of attributes related to SCIM protocols used for identity provisioning and management across cloud-based platforms. It standardizes user and group provisioning details, enabling identity synchronization and lifecycle management with compatible Identity Providers (IdPs) and applications. SCIM is defined in <a target='_blank' href='https://datatracker.ietf.org/doc/html/rfc7643'>RFC-7634</a>
 *
 * OCSF Object: SCIM
 */
export const Scim = z.object({
  /** The authorization protocol as defined by the caption of auth_protocol_id. In the case of Other, it is defined by the event source. */
  auth_protocol: z.string().optional(),
  /** The normalized identifier of the authorization protocol used by the SCIM resource. */
  auth_protocol_id: z.number().int().optional(),
  /** When the SCIM resource was added to the service provider. */
  created_time: z.number().int().optional(),
  /** Message or code associated with the last encountered error. */
  error_message: z.string().optional(),
  /** Indicates whether the SCIM resource is configured to provision groups, automatically or otherwise. */
  is_group_provisioning_enabled: z.boolean().optional(),
  /** Indicates whether the SCIM resource is configured to provision users, automatically or otherwise. */
  is_user_provisioning_enabled: z.boolean().optional(),
  /** Timestamp of the most recent successful synchronization. */
  last_run_time: z.number().int().optional(),
  /** The most recent time when the SCIM resource was updated at the service provider. */
  modified_time: z.number().int().optional(),
  /** The name of the SCIM resource. */
  name: z.string().optional(),
  /** The supported protocol for the SCIM resource. E.g., SAML, OIDC, or OAuth2. */
  protocol_name: z.string().optional(),
  /** Maximum number of requests allowed by the SCIM resource within a specified time frame to avoid throttling. */
  rate_limit: z.number().int().optional(),
  /** SCIM provides a schema for representing groups, identified using the following schema URI: urn:ietf:params:scim:schemas:core:2.0:Group as defined in RFC-7634. This attribute will capture key-value pairs for the scheme implemented in a SCIM resource. */
  scim_group_schema: z.record(z.unknown()).optional(),
  /** SCIM provides a resource type for user resources. The core schema for user is identified using the following schema URI: urn:ietf:params:scim:schemas:core:2.0:User as defined in RFC-7634. his attribute will capture key-value pairs for the scheme implemented in a SCIM resource. This object is inclusive of both the basic and Enterprise User Schema Extension. */
  scim_user_schema: z.record(z.unknown()).optional(),
  /** The provisioning state of the SCIM resource, normalized to the caption of the state_id value. In the case of Other, it is defined by the event source. */
  state: z.string().optional(),
  /** The normalized state ID of the SCIM resource to reflect its activation status. */
  state_id: z.number().int().optional(),
  /** A unique identifier for a SCIM resource as defined by the service provider. */
  uid: z.string().optional(),
  /** A String that is an identifier for the resource as defined by the provisioning client. The externalId may simplify identification of a resource between the provisioning client and the service provider by allowing the client to use a filter to locate the resource with an identifier from the provisioning domain, obviating the need to store a local mapping between the provisioning domain's identifier of the resource and the identifier used by the service provider. */
  uid_alt: z.string().optional(),
  /** The primary URL for SCIM API requests. */
  url_string: z.string().optional(),
  /** Name of the vendor or service provider implementing SCIM. E.g., Okta, Auth0, Microsoft. */
  vendor_name: z.string().optional(),
  /** SCIM protocol version supported e.g., SCIM 2.0. */
  version: z.string().optional(),
}).passthrough() as any;

export type ScimType = z.infer<typeof Scim>;
