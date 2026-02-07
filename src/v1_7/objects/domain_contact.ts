import { z } from "zod";

import { Location, type LocationType } from "./location.js";

/**
 * The contact information related to a domain registration, e.g., registrant, administrator, abuse, billing, or technical contact.
 *
 * OCSF Object: Domain Contact
 */
export interface DomainContactType {
  /** The user's primary email address. */
  email_addr?: string | undefined;
  /** Location details for the contract such as the city, state/province, country, etc. */
  location?: LocationType | undefined;
  /** The individual or organization name for the contact. */
  name?: string | undefined;
  /** The number associated with the phone. */
  phone_number?: string | undefined;
  /** The Domain Contact type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source */
  type?: string | undefined;
  /** The normalized domain contact type ID. */
  type_id: number;
  /** The unique identifier of the contact information, typically provided in WHOIS information. */
  uid?: string | undefined;
  [key: string]: unknown;
}

export const DomainContact: z.ZodType<DomainContactType> = z
  .object({
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
    type_id: z.number().int(),
    /** The unique identifier of the contact information, typically provided in WHOIS information. */
    uid: z.string().optional(),
  })
  .passthrough() as any;
