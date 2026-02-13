import { z } from 'zod';

/**
 * The DNS query object represents a specific request made to the Domain Name System (DNS) to retrieve information about a domain or perform a DNS operation. This object encapsulates the necessary attributes and methods to construct and send DNS queries, specify the query type (e.g., A, AAAA, MX).
 *
 * OCSF Object: DNS Query
 */
export const DnsQuery = z.strictObject({
  /** The class of resource records being queried. See RFC1035. For example: IN. */
  class: z.string().optional(),
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid: z.number().int().optional(),
  /** The type of resource records being queried. See RFC1035. For example: A, AAAA, CNAME, MX, and NS. */
  type: z.string().optional(),
  /** The hostname or domain being queried. For example: www.example.com */
  hostname: z.string(),
  /** The DNS opcode specifies the type of the query message. */
  opcode: z.string().optional(),
  /** The DNS opcode ID specifies the normalized query message type as defined in RFC-5395. */
  opcode_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
});

export type DnsQueryType = z.infer<typeof DnsQuery>;
