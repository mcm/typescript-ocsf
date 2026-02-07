import { z } from "zod";

/**
 * The Domain Name System (DNS) object represents the shared information associated with the DNS query and answer objects.
 *
 * OCSF Object: DNS
 */
export interface DnsType {
  /** The class of resource records being queried. See RFC1035. For example: IN. */
  class?: string | undefined;
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid?: number | undefined;
  /** The type of resource records being queried. See RFC1035. For example: A, AAAA, CNAME, MX, and NS. */
  type?: string | undefined;
  [key: string]: unknown;
}

export const Dns: z.ZodType<DnsType> = z
  .object({
    /** The class of resource records being queried. See RFC1035. For example: IN. */
    class: z.string().optional(),
    /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
    packet_uid: z.number().int().optional(),
    /** The type of resource records being queried. See RFC1035. For example: A, AAAA, CNAME, MX, and NS. */
    type: z.string().optional(),
  })
  .passthrough() as any;
