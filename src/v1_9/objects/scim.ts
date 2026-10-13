import { z } from 'zod';

/**
 * The System for Cross-domain Identity Management (SCIM) Configuration object provides a structured set of attributes related to SCIM protocols used for identity provisioning and management across cloud-based platforms. It standardizes user and group provisioning details, enabling identity synchronization and lifecycle management with compatible Identity Providers (IdPs) and applications. SCIM is defined in RFC 7634.
 *
 * OCSF Object: SCIM
 */
export interface ScimType {
  /** The authorization protocol as defined by the caption of auth_protocol_id. In the case of Other, it is defined by the event source. */
  auth_protocol?: string;
  /** The normalized identifier of the authorization protocol used by the SCIM resource. */
  auth_protocol_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 99;
  /** When the SCIM resource was added to the service provider. */
  created_time?: number;
  /** Message or code associated with the last encountered error. */
  error_message?: string;
  /** Indicates whether the SCIM resource is configured to provision groups, automatically or otherwise. */
  is_group_provisioning_enabled?: boolean;
  /** Indicates whether the SCIM resource is configured to provision users, automatically or otherwise. */
  is_user_provisioning_enabled?: boolean;
  /** Timestamp of the most recent successful synchronization. */
  last_run_time?: number;
  /** The most recent time when the SCIM resource was updated at the service provider. */
  modified_time?: number;
  /** The name of the SCIM resource. */
  name?: string;
  /** The supported protocol for the SCIM resource. E.g., SAML, OIDC, or OAuth2. */
  protocol_name?: string;
  /** Maximum number of requests allowed by the SCIM resource within a specified time frame to avoid throttling. */
  rate_limit?: number;
  /** SCIM provides a schema for representing groups, identified using the following schema URI: urn:ietf:params:scim:schemas:core:2.0:Group as defined in RFC 7634. This attribute will capture key-value pairs for the scheme implemented in a SCIM resource. */
  scim_group_schema?: Record<string, unknown>;
  /** SCIM provides a resource type for user resources. The core schema for user is identified using the following schema URI: urn:ietf:params:scim:schemas:core:2.0:User as defined in RFC 7634. This attribute will capture key-value pairs for the scheme implemented in a SCIM resource. This object is inclusive of both the basic and Enterprise User Schema Extension. */
  scim_user_schema?: Record<string, unknown>;
  /** The provisioning state of the SCIM resource, normalized to the caption of the state_id value. In the case of Other, it is defined by the event source. */
  state?: string;
  /** The normalized state ID of the SCIM resource to reflect its activation status. */
  state_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** A unique identifier for a SCIM resource as defined by the service provider. */
  uid?: string;
  /** A String that is an identifier for the resource as defined by the provisioning client. The externalId may simplify identification of a resource between the provisioning client and the service provider by allowing the client to use a filter to locate the resource with an identifier from the provisioning domain, obviating the need to store a local mapping between the provisioning domain's identifier of the resource and the identifier used by the service provider. */
  uid_alt?: string;
  /** The primary URL for SCIM API requests. */
  url_string?: string;
  /** Name of the vendor or service provider implementing SCIM. E.g., Okta, Auth0, Microsoft. */
  vendor_name?: string;
  /** SCIM protocol version supported e.g., SCIM 2.0. */
  version?: string;
}

type ScimShape = {
  auth_protocol: z.ZodOptional<z.ZodString>;
  auth_protocol_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<99>]>>;
  created_time: z.ZodOptional<z.ZodNumber>;
  error_message: z.ZodOptional<z.ZodString>;
  is_group_provisioning_enabled: z.ZodOptional<z.ZodBoolean>;
  is_user_provisioning_enabled: z.ZodOptional<z.ZodBoolean>;
  last_run_time: z.ZodOptional<z.ZodNumber>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  name: z.ZodOptional<z.ZodString>;
  protocol_name: z.ZodOptional<z.ZodString>;
  rate_limit: z.ZodOptional<z.ZodNumber>;
  scim_group_schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  scim_user_schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  state: z.ZodOptional<z.ZodString>;
  state_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  uid: z.ZodOptional<z.ZodString>;
  uid_alt: z.ZodOptional<z.ZodString>;
  url_string: z.ZodOptional<z.ZodString>;
  vendor_name: z.ZodOptional<z.ZodString>;
  version: z.ZodOptional<z.ZodString>;
};

const ScimSchema: z.ZodObject<ScimShape, z.core.$strict> = z.strictObject({
  /** The authorization protocol as defined by the caption of auth_protocol_id. In the case of Other, it is defined by the event source. */
  auth_protocol: z.string().optional(),
  /** The normalized identifier of the authorization protocol used by the SCIM resource. */
  auth_protocol_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(99)]).optional(),
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
  /** SCIM provides a schema for representing groups, identified using the following schema URI: urn:ietf:params:scim:schemas:core:2.0:Group as defined in RFC 7634. This attribute will capture key-value pairs for the scheme implemented in a SCIM resource. */
  scim_group_schema: z.record(z.string(), z.unknown()).optional(),
  /** SCIM provides a resource type for user resources. The core schema for user is identified using the following schema URI: urn:ietf:params:scim:schemas:core:2.0:User as defined in RFC 7634. This attribute will capture key-value pairs for the scheme implemented in a SCIM resource. This object is inclusive of both the basic and Enterprise User Schema Extension. */
  scim_user_schema: z.record(z.string(), z.unknown()).optional(),
  /** The provisioning state of the SCIM resource, normalized to the caption of the state_id value. In the case of Other, it is defined by the event source. */
  state: z.string().optional(),
  /** The normalized state ID of the SCIM resource to reflect its activation status. */
  state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
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
});

export const Scim = ScimSchema;

/** Value → label mappings for each enum field of Scim. */
export const ScimLabels: Readonly<Record<"auth_protocol_id" | "state_id", Readonly<Record<number, string>>>> = {
  auth_protocol_id: {
    0: "Unknown",
    1: "NTLM",
    2: "Kerberos",
    3: "Digest",
    4: "OpenID",
    5: "SAML",
    6: "OAUTH 2.0",
    7: "PAP",
    8: "CHAP",
    9: "EAP",
    10: "RADIUS",
    11: "Basic Authentication",
    12: "LDAP",
    99: "Other",
  },
  state_id: {
    0: "Unknown",
    1: "Pending",
    2: "Active",
    3: "Failed",
    4: "Deleted",
    99: "Other",
  },
};
