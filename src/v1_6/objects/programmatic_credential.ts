import { z } from 'zod';

/**
 * The Programmatic Credential object describes service-specific credentials used for direct API access and system integration. These credentials are typically issued by individual services or platforms for accessing their APIs and resources, focusing on credential lifecycle management and usage tracking. Examples include API keys, service account keys, client certificates, and vendor-specific access tokens.
 *
 * OCSF Object: Programmatic Credential
 */
export interface ProgrammaticCredentialType {
  /** The timestamp when this programmatic credential was last used for authentication or API access. This helps track credential usage patterns, identify dormant credentials that may pose security risks, and support credential lifecycle management. The timestamp should reflect the most recent successful authentication or API call using this credential. */
  last_used_time?: number;
  /** The type or category of programmatic credential, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. Examples include 'API Key', 'Service Account Key', 'Access Token', 'Client Certificate', 'OAuth Token', 'Personal Access Token', etc. */
  type?: string;
  /** The unique identifier of the programmatic credential. This could be an API key ID, service account key ID, access token identifier, certificate serial number, or other unique identifier that distinguishes this credential from others. Examples: AWS Access Key ID, GCP Service Account Key ID, Azure Application ID, or OAuth2 token identifier. */
  uid: string;
}

const ProgrammaticCredentialSchema: z.ZodType<ProgrammaticCredentialType> = z.strictObject({
  /** The timestamp when this programmatic credential was last used for authentication or API access. This helps track credential usage patterns, identify dormant credentials that may pose security risks, and support credential lifecycle management. The timestamp should reflect the most recent successful authentication or API call using this credential. */
  last_used_time: z.number().int().optional(),
  /** The type or category of programmatic credential, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. Examples include 'API Key', 'Service Account Key', 'Access Token', 'Client Certificate', 'OAuth Token', 'Personal Access Token', etc. */
  type: z.string().optional(),
  /** The unique identifier of the programmatic credential. This could be an API key ID, service account key ID, access token identifier, certificate serial number, or other unique identifier that distinguishes this credential from others. Examples: AWS Access Key ID, GCP Service Account Key ID, Azure Application ID, or OAuth2 token identifier. */
  uid: z.string(),
});

export const ProgrammaticCredential = ProgrammaticCredentialSchema;
