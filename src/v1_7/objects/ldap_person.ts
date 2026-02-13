import { z } from 'zod';

import { Location } from './location.js';
import { User } from './user.js';
import { KeyValueObject } from './key_value_object.js';

/**
 * The additional LDAP attributes that describe a person.
 *
 * OCSF Object: LDAP Person
 */
export const LdapPerson = z.object({
  /** The cost center associated with the user. */
  cost_center: z.string().optional(),
  /** The timestamp when the user was created. */
  created_time: z.number().int().optional(),
  /** The timestamp when the user was deleted. In Active Directory (AD), when a user is deleted they are moved to a temporary container and then removed after 30 days. So, this field can be populated even after a user is deleted for the next 30 days. */
  deleted_time: z.number().int().optional(),
  /** The display name of the LDAP person. According to RFC 2798, this is the preferred name of a person to be used when displaying entries. */
  display_name: z.string().optional(),
  /** A list of additional email addresses for the user. */
  email_addrs: z.array(z.string()).optional(),
  /** The employee identifier assigned to the user by the organization. */
  employee_uid: z.string().optional(),
  /** The given or first name of the user. */
  given_name: z.string().optional(),
  /** The timestamp when the user was or will be hired by the organization. */
  hire_time: z.number().int().optional(),
  /** The user's job title. */
  job_title: z.string().optional(),
  /** The labels associated with the user. For example in AD this could be the userType, employeeType. For example: Member, Employee. */
  labels: z.array(z.string()).optional(),
  /** The last time when the user logged in. */
  last_login_time: z.number().int().optional(),
  /** The LDAP and X.500 commonName attribute, typically the full name of the person. For example, John Doe. */
  ldap_cn: z.string().optional(),
  /** The X.500 Distinguished Name (DN) is a structured string that uniquely identifies an entry, such as a user, in an X.500 directory service For example, cn=John Doe,ou=People,dc=example,dc=com. */
  ldap_dn: z.string().optional(),
  /** The timestamp when the user left or will be leaving the organization. */
  leave_time: z.number().int().optional(),
  /** The geographical location associated with a user. This is typically the user's usual work location. */
  location: Location.optional(),
  /** The user's manager. This helps in understanding an org hierarchy. This should only ever be populated once in an event. I.e. there should not be a manager's manager in an event. */
  get manager() { return z.lazy(() => User).optional(); },
  /** The timestamp when the user entry was last modified. */
  modified_time: z.number().int().optional(),
  /** The primary office location associated with the user. This could be any string and isn't a specific address. For example, South East Virtual. */
  office_location: z.string().optional(),
  /** The telephone number of the user. Corresponds to the LDAP Telephone-Number CN. */
  phone_number: z.string().optional(),
  /** The last or family name for the user. */
  surname: z.string().optional(),
  /** The list of tags; {key:value} pairs associated to the user. */
  tags: z.array(KeyValueObject).optional(),
}).passthrough();

export type LdapPersonType = z.infer<typeof LdapPerson>;
