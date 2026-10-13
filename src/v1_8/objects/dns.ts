import { z } from 'zod';

/**
 * The Domain Name System (DNS) object represents the shared information associated with the DNS query and answer objects.
 *
 * OCSF Object: DNS
 */
export interface DnsType {
  /** The class of resource records being queried. See RFC1035. For example: IN. */
  class?: string;
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid?: number;
  /** The type of resource records being queried. See RFC1035. For example: A, AAAA, CNAME, MX, and NS. */
  type?: string;
}

type DnsShape = {
  class: z.ZodOptional<z.ZodString>;
  packet_uid: z.ZodOptional<z.ZodNumber>;
  type: z.ZodOptional<z.ZodString>;
};

const DnsSchema: z.ZodObject<DnsShape, z.core.$strict> = z.strictObject({
  /** The class of resource records being queried. See RFC1035. For example: IN. */
  class: z.string().optional(),
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid: z.number().int().optional(),
  /** The type of resource records being queried. See RFC1035. For example: A, AAAA, CNAME, MX, and NS. */
  type: z.string().optional(),
});

export const Dns = DnsSchema;

/** Value → label mappings for each enum field of Dns. */
export const DnsLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
