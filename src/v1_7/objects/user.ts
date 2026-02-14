import { z } from 'zod';

import type { AccountType } from './account.js';
import type { GroupType } from './group.js';
import type { LdapPersonType } from './ldap_person.js';
import type { OrganizationType } from './organization.js';
import type { ProgrammaticCredentialType } from './programmatic_credential.js';

/**
 * The User object describes the characteristics of a user/person or a security principal.
 *
 * OCSF Object: User
 */
export interface UserType {
  /** The username. For example, janedoe1. */
  name?: string;
  /** The unique user identifier. For example, the Windows user SID, ActiveDirectory DN or AWS user ARN. */
  uid?: string;
  /** The user's account or the account associated with the user. */
  account?: AccountType;
  /** The unique identifier of the user's credential. For example, AWS Access Key ID. */
  credential_uid?: string;
  /** The display name of the user, as reported by the product. */
  display_name?: string;
  /** The domain where the user is defined. For example: the LDAP or Active Directory domain. */
  domain?: string;
  /** The user's primary email address. */
  email_addr?: string;
  /** The user's forwarding email address. */
  forward_addr?: string;
  /** The full name of the user, as reported by the product. */
  full_name?: string;
  /** The administrative groups to which the user belongs. */
  groups?: GroupType[];
  /** The user has a multi-factor or secondary-factor device assigned. */
  has_mfa?: boolean;
  /** The additional LDAP attributes that describe a person. */
  ldap_person?: LdapPersonType;
  /** Organization and org unit related to the user. */
  org?: OrganizationType;
  /** The telephone number of the user. */
  phone_number?: string;
  /** Details about the programmatic credential (API keys, access tokens, certificates, etc) associated to the user. */
  programmatic_credentials?: ProgrammaticCredentialType[];
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level?: string;
  /** The normalized risk level id. */
  risk_level_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The risk score as reported by the event source. */
  risk_score?: number;
  /** The type of the user. For example, System, AWS IAM User, etc. */
  type?: string;
  /** The account type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The alternate user identifier. For example, the Active Directory user GUID or AWS user Principal ID. */
  uid_alt?: string;
}

import { Account } from './account.js';
import { Group } from './group.js';
import { LdapPerson } from './ldap_person.js';
import { Organization } from './organization.js';
import { ProgrammaticCredential } from './programmatic_credential.js';

const UserSchema = z.strictObject({
  /** The username. For example, janedoe1. */
  name: z.string().optional(),
  /** The unique user identifier. For example, the Windows user SID, ActiveDirectory DN or AWS user ARN. */
  uid: z.string().optional(),
  /** The user's account or the account associated with the user. */
  account: Account.optional(),
  /** The unique identifier of the user's credential. For example, AWS Access Key ID. */
  credential_uid: z.string().optional(),
  /** The display name of the user, as reported by the product. */
  display_name: z.string().optional(),
  /** The domain where the user is defined. For example: the LDAP or Active Directory domain. */
  domain: z.string().optional(),
  /** The user's primary email address. */
  email_addr: z.string().optional(),
  /** The user's forwarding email address. */
  forward_addr: z.string().optional(),
  /** The full name of the user, as reported by the product. */
  full_name: z.string().optional(),
  /** The administrative groups to which the user belongs. */
  groups: z.array(Group).optional(),
  /** The user has a multi-factor or secondary-factor device assigned. */
  has_mfa: z.boolean().optional(),
  /** The additional LDAP attributes that describe a person. */
  get ldap_person() { return z.lazy(() => LdapPerson).optional(); },
  /** Organization and org unit related to the user. */
  org: Organization.optional(),
  /** The telephone number of the user. */
  phone_number: z.string().optional(),
  /** Details about the programmatic credential (API keys, access tokens, certificates, etc) associated to the user. */
  programmatic_credentials: z.array(ProgrammaticCredential).optional(),
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level: z.string().optional(),
  /** The normalized risk level id. */
  risk_level_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The risk score as reported by the event source. */
  risk_score: z.number().int().optional(),
  /** The type of the user. For example, System, AWS IAM User, etc. */
  type: z.string().optional(),
  /** The account type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The alternate user identifier. For example, the Active Directory user GUID or AWS user Principal ID. */
  uid_alt: z.string().optional(),
});

export const User = UserSchema;
