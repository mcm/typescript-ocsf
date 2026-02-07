import { z } from "zod";

/**
 * The DNS Answer object represents a specific response provided by the Domain Name System (DNS) when querying for information about a domain or performing a DNS operation. It encapsulates the relevant details and data returned by the DNS server in response to a query.
 *
 * OCSF Object: DNS Answer
 */
export interface DnsAnswerType {
  /** The class of DNS data contained in this resource record. See RFC1035. For example: IN. */
  class?: string | undefined;
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid?: number | undefined;
  /** The type of data contained in this resource record. See RFC1035. For example: CNAME. */
  type?: string | undefined;
  /** The list of DNS answer header flag IDs. */
  flag_ids?: number[] | undefined;
  /** The list of DNS answer header flags. */
  flags?: string[] | undefined;
  /** The data describing the DNS resource. The meaning of this data depends on the type and class of the resource record. */
  rdata: string;
  /** The time interval that the resource record may be cached. Zero value means that the resource record can only be used for the transaction in progress, and should not be cached. */
  ttl?: number | undefined;
  [key: string]: unknown;
}

export const DnsAnswer: z.ZodType<DnsAnswerType> = z
  .object({
    /** The class of DNS data contained in this resource record. See RFC1035. For example: IN. */
    class: z.string().optional(),
    /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
    packet_uid: z.number().int().optional(),
    /** The type of data contained in this resource record. See RFC1035. For example: CNAME. */
    type: z.string().optional(),
    /** The list of DNS answer header flag IDs. */
    flag_ids: z.array(z.number().int()).optional(),
    /** The list of DNS answer header flags. */
    flags: z.array(z.string()).optional(),
    /** The data describing the DNS resource. The meaning of this data depends on the type and class of the resource record. */
    rdata: z.string(),
    /** The time interval that the resource record may be cached. Zero value means that the resource record can only be used for the transaction in progress, and should not be cached. */
    ttl: z.number().int().optional(),
  })
  .passthrough() as any;
