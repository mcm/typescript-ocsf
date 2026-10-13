import { z } from 'zod';

import type { GroupType } from './group.js';
import type { RequestType } from './request.js';
import type { ResponseType } from './response.js';
import type { ServiceType } from './service.js';
import type { TokenType } from './token.js';

/**
 * The API, or Application Programming Interface, object represents  information pertaining to an API request and response.
 *
 * OCSF Object: API
 */
export interface ApiType {
  /** The information pertaining to the API group. */
  group?: GroupType;
  /** Verb/Operation associated with the request */
  operation: string;
  /** Details pertaining to the API request. */
  request?: RequestType;
  /** Details pertaining to the API response. */
  response?: ResponseType;
  /** The information pertaining to the API service. */
  service?: ServiceType;
  /** The API or client token used to authenticate or authorize the API request. This attribute contains the base token object that represents: (1) IdP-issued client tokens (type_id: 6) such as Okta API tokens or Microsoft Entra ID Application Registration client secrets, or (2) generic API tokens/keys (type_id: 7) used for SaaS application authentication. Use this attribute when the API request was authenticated using a token that should be tracked as part of the API activity event. Note: Protocol-specific authentication tokens (Kerberos, OIDC, SAML) should be represented using authentication_token in authentication events, not in API activity events. */
  token?: TokenType;
  /** The version of the API service. */
  version?: string;
}

import { Group } from './group.js';
import { Request } from './request.js';
import { Response } from './response.js';
import { Service } from './service.js';
import { Token } from './token.js';

type ApiShape = {
  group: z.ZodOptional<typeof Group>;
  operation: z.ZodString;
  request: z.ZodOptional<typeof Request>;
  response: z.ZodOptional<typeof Response>;
  service: z.ZodOptional<typeof Service>;
  token: z.ZodOptional<typeof Token>;
  version: z.ZodOptional<z.ZodString>;
};

const ApiSchema: z.ZodObject<ApiShape, z.core.$strict> = z.strictObject({
  /** The information pertaining to the API group. */
  group: Group.optional(),
  /** Verb/Operation associated with the request */
  operation: z.string(),
  /** Details pertaining to the API request. */
  request: Request.optional(),
  /** Details pertaining to the API response. */
  response: Response.optional(),
  /** The information pertaining to the API service. */
  service: Service.optional(),
  /** The API or client token used to authenticate or authorize the API request. This attribute contains the base token object that represents: (1) IdP-issued client tokens (type_id: 6) such as Okta API tokens or Microsoft Entra ID Application Registration client secrets, or (2) generic API tokens/keys (type_id: 7) used for SaaS application authentication. Use this attribute when the API request was authenticated using a token that should be tracked as part of the API activity event. Note: Protocol-specific authentication tokens (Kerberos, OIDC, SAML) should be represented using authentication_token in authentication events, not in API activity events. */
  token: Token.optional(),
  /** The version of the API service. */
  version: z.string().optional(),
});

export const Api = ApiSchema;

/** Value → label mappings for each enum field of Api. */
export const ApiLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
