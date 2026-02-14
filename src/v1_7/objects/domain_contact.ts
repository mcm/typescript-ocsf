import { z } from 'zod';

import type { LocationType } from './location.js';

/**
 * The contact information related to a domain registration, e.g., registrant, administrator, abuse, billing, or technical contact.
 *
 * OCSF Object: Domain Contact
 */
export interface DomainContactType {
  /** The user's primary email address. */
  email_addr?: string;
  /** Location details for the contract such as the city, state/province, country, etc. */
  location?: LocationType;
  /** The individual or organization name for the contact. */
  name?: string;
  /** The number associated with the phone. */
  phone_number?: string;
  /** The Domain Contact type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source */
  type?: string;
  /** The normalized domain contact type ID. */
  type_id: 1 | 2 | 3 | 4 | 5;
  /** The unique identifier of the contact information, typically provided in WHOIS information. */
  uid?: string;
}

import { Location } from './location.js';

const DomainContactSchema: z.ZodType<DomainContactType> = z.strictObject({
  /** The user's primary email address. */
  email_addr: z.string().optional(),
  /** Location details for the contract such as the city, state/province, country, etc. */
  location: Location.optional(),
  /** The individual or organization name for the contact. */
  name: z.string().optional(),
  /** The number associated with the phone. */
  phone_number: z.string().optional(),
  /** The Domain Contact type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source */
  type: z.string().optional(),
  /** The normalized domain contact type ID. */
  type_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  /** The unique identifier of the contact information, typically provided in WHOIS information. */
  uid: z.string().optional(),
});

export const DomainContact = DomainContactSchema;
