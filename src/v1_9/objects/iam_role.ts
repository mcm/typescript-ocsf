import { z } from 'zod';

import type { AccountType } from './account.js';
import type { PolicyType } from './policy.js';
import type { ProgrammaticCredentialType } from './programmatic_credential.js';
import type { ResourceDetailsType } from './resource_details.js';
import type { SessionType } from './session.js';

/**
 * The IAM Role object describes permission characteristics (or privileges) associated with a user or group of users as security principals against one or more resources. In some cases only the name or ID of the role is known hence other attributes are optional. In some systems a user or group of users can have multiple roles, imparting the union of privileges to the principal. In some systems the role can serve as a temporary security principal without its own credentials on behalf of the actual security principal.
 *
 * OCSF Object: IAM Role
 */
export interface IamRoleType {
  /** The role name. For example, Power Users. */
  name?: string;
  /** The unique role identifier. For example, the Windows role SID, or AWS role ARN. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The account associated with the role. For example, can be a cross-account role, different from the user or group account, granting access within this account. */
  account?: AccountType;
  /** IAM policies associated with the role. */
  policies?: PolicyType[];
  /** List of privileges assigned to a role. */
  privileges?: string[];
  /** Programmatic credential (API keys, access tokens, certificates, etc) associated with the role. */
  programmatic_credentials?: ProgrammaticCredentialType[];
  /** Resources that the role applies to. */
  resources?: ResourceDetailsType[];
  /** The session where the role is active. Some roles may be temporary and expire when the session expires. */
  session?: SessionType;
  /** The alternate user identifier. For example, the Active Directory role GUID or the associated LDAP group DN. */
  uid_alt?: string;
}

import { Account } from './account.js';
import { Policy } from './policy.js';
import { ProgrammaticCredential } from './programmatic_credential.js';
import { ResourceDetails } from './resource_details.js';
import { Session } from './session.js';

type IamRoleShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  account: z.ZodOptional<typeof Account>;
  policies: z.ZodOptional<z.ZodArray<typeof Policy>>;
  privileges: z.ZodOptional<z.ZodArray<z.ZodString>>;
  programmatic_credentials: z.ZodOptional<z.ZodArray<typeof ProgrammaticCredential>>;
  resources: z.ZodOptional<z.ZodArray<typeof ResourceDetails>>;
  session: z.ZodOptional<typeof Session>;
  uid_alt: z.ZodOptional<z.ZodString>;
};

const IamRoleSchema: z.ZodObject<IamRoleShape, z.core.$strict> = z.strictObject({
  /** The role name. For example, Power Users. */
  name: z.string().optional(),
  /** The unique role identifier. For example, the Windows role SID, or AWS role ARN. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The account associated with the role. For example, can be a cross-account role, different from the user or group account, granting access within this account. */
  account: Account.optional(),
  /** IAM policies associated with the role. */
  policies: z.array(Policy).optional(),
  /** List of privileges assigned to a role. */
  privileges: z.array(z.string()).optional(),
  /** Programmatic credential (API keys, access tokens, certificates, etc) associated with the role. */
  programmatic_credentials: z.array(ProgrammaticCredential).optional(),
  /** Resources that the role applies to. */
  resources: z.array(ResourceDetails).optional(),
  /** The session where the role is active. Some roles may be temporary and expire when the session expires. */
  session: Session.optional(),
  /** The alternate user identifier. For example, the Active Directory role GUID or the associated LDAP group DN. */
  uid_alt: z.string().optional(),
});

export const IamRole = IamRoleSchema;

/** Value → label mappings for each enum field of IamRole. */
export const IamRoleLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
