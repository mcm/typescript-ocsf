import { z } from 'zod';

import { Account } from './account.js';
import { Group } from './group.js';
import { LdapPerson } from './ldap_person.js';
import { Organization } from './organization.js';
import { ProgrammaticCredential } from './programmatic_credential.js';

/**
 * The User object describes the characteristics of a user/person or a security principal.
 *
 * OCSF Object: User
 */
export const User = z.object({
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
  get ldap_person(): any { return LdapPerson.optional(); },
  /** Organization and org unit related to the user. */
  org: Organization.optional(),
  /** The telephone number of the user. */
  phone_number: z.string().optional(),
  /** Details about the programmatic credential (API keys, access tokens, certificates, etc) associated to the user. */
  programmatic_credentials: z.array(ProgrammaticCredential).optional(),
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level: z.string().optional(),
  /** The normalized risk level id. */
  risk_level_id: z.number().int().optional(),
  /** The risk score as reported by the event source. */
  risk_score: z.number().int().optional(),
  /** The type of the user. For example, System, AWS IAM User, etc. */
  type: z.string().optional(),
  /** The account type identifier. */
  type_id: z.number().int().optional(),
  /** The alternate user identifier. For example, the Active Directory user GUID or AWS user Principal ID. */
  uid_alt: z.string().optional(),
}).passthrough() as any;

export type UserType = z.infer<typeof User>;
