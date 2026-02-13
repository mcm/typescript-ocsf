import { z } from 'zod';

import { AutonomousSystem } from './autonomous_system.js';
import { DomainContact } from './domain_contact.js';

/**
 * The resources of a WHOIS record for a given domain. This can include domain names, IP address blocks, autonomous system information, and/or contact and registration information for a domain.
 *
 * OCSF Object: WHOIS
 */
export const Whois = z.strictObject({
  /** The autonomous system information associated with a domain. */
  autonomous_system: AutonomousSystem.optional(),
  /** When the domain was registered or WHOIS entry was created. */
  created_time: z.number().int().optional(),
  /** The normalized value of dnssec_status_id. */
  dnssec_status: z.string().optional(),
  /** Describes the normalized status of DNS Security Extensions (DNSSEC) for a domain. */
  dnssec_status_id: z.number().int().optional(),
  /** The domain name corresponding to the WHOIS record. */
  domain: z.string().optional(),
  /** An array of Domain Contact objects. */
  domain_contacts: z.array(DomainContact).optional(),
  /** The email address for the registrar's abuse contact */
  email_addr: z.string().optional(),
  /** The name of the Internet Service Provider (ISP). */
  isp: z.string().optional(),
  /** The organization name of the Internet Service Provider (ISP). This represents the parent organization or company that owns/operates the ISP. For example, Comcast Corporation would be the ISP org for Xfinity internet service. This attribute helps identify the ultimate provider when ISPs operate under different brand names. */
  isp_org: z.string().optional(),
  /** When the WHOIS record was last updated or seen at. */
  last_seen_time: z.number().int().optional(),
  /** A collection of name servers related to a domain registration or other record. */
  name_servers: z.array(z.string()).optional(),
  /** The phone number for the registrar's abuse contact */
  phone_number: z.string().optional(),
  /** The domain registrar. */
  registrar: z.string().optional(),
  /** The status of a domain and its ability to be transferred, e.g., clientTransferProhibited. */
  status: z.string().optional(),
  /** An array of subdomain strings. Can be used to collect several subdomains such as those from Domain Generation Algorithms (DGAs). */
  subdomains: z.array(z.string()).optional(),
  /** The IP address block (CIDR) associated with a domain. */
  subnet: z.string().optional(),
});

export type WhoisType = z.infer<typeof Whois>;
