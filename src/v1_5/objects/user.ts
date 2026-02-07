import { z } from "zod";

import { Account, type AccountType } from "./account.js";
import { Group, type GroupType } from "./group.js";
import { LdapPerson, type LdapPersonType } from "./ldap_person.js";
import { Organization, type OrganizationType } from "./organization.js";

/**
 * The User object describes the characteristics of a user/person or a security principal.
 *
 * OCSF Object: User
 */
export interface UserType {
  /** The username. For example, janedoe1. */
  name?: string | undefined;
  /** The unique user identifier. For example, the Windows user SID, ActiveDirectory DN or AWS user ARN. */
  uid?: string | undefined;
  /** The user's account or the account associated with the user. */
  account?: AccountType | undefined;
  /** The unique identifier of the user's credential. For example, AWS Access Key ID. */
  credential_uid?: string | undefined;
  /** The display name of the user, as reported by the product. */
  display_name?: string | undefined;
  /** The domain where the user is defined. For example: the LDAP or Active Directory domain. */
  domain?: string | undefined;
  /** The user's primary email address. */
  email_addr?: string | undefined;
  /** The user's forwarding email address. */
  forward_addr?: string | undefined;
  /** The full name of the user, as reported by the product. */
  full_name?: string | undefined;
  /** The administrative groups to which the user belongs. */
  groups?: GroupType[] | undefined;
  /** The user has a multi-factor or secondary-factor device assigned. */
  has_mfa?: boolean | undefined;
  /** The additional LDAP attributes that describe a person. */
  ldap_person?: LdapPersonType | undefined;
  /** Organization and org unit related to the user. */
  org?: OrganizationType | undefined;
  /** The telephone number of the user. */
  phone_number?: string | undefined;
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level?: string | undefined;
  /** The normalized risk level id. */
  risk_level_id?: number | undefined;
  /** The risk score as reported by the event source. */
  risk_score?: number | undefined;
  /** The type of the user. For example, System, AWS IAM User, etc. */
  type?: string | undefined;
  /** The account type identifier. */
  type_id?: number | undefined;
  /** The alternate user identifier. For example, the Active Directory user GUID or AWS user Principal ID. */
  uid_alt?: string | undefined;
  [key: string]: unknown;
}

export const User: z.ZodType<UserType> = z.lazy(() =>
  z
    .object({
      /** The username. For example, janedoe1. */
      name: z.string().optional(),
      /** The unique user identifier. For example, the Windows user SID, ActiveDirectory DN or AWS user ARN. */
      uid: z.string().optional(),
      /** The user's account or the account associated with the user. */
      account: z.lazy(() => Account).optional(),
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
      groups: z.array(z.lazy(() => Group)).optional(),
      /** The user has a multi-factor or secondary-factor device assigned. */
      has_mfa: z.boolean().optional(),
      /** The additional LDAP attributes that describe a person. */
      ldap_person: z.lazy(() => LdapPerson).optional(),
      /** Organization and org unit related to the user. */
      org: z.lazy(() => Organization).optional(),
      /** The telephone number of the user. */
      phone_number: z.string().optional(),
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
    })
    .passthrough(),
) as any;
