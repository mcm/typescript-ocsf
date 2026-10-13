import { z } from 'zod';

/**
 * The DNS Query object represents a specific request made to the Domain Name System (DNS) to retrieve information about a domain or perform a DNS operation.
 *
 * OCSF Object: DNS Query
 */
export interface DnsQueryType {
  /** The class of resource records being queried. See RFC 1035. For example: IN. */
  class?: string;
  /** The hostname or domain being queried. For example: www.example.com */
  hostname: string;
  /** The DNS opcode specifies the type of the query message. */
  opcode?: string;
  /** The DNS opcode ID specifies the normalized query message type as defined in RFC 5395. */
  opcode_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid?: number;
  /** The type of resource records being queried. See RFC 1035. For example: A, AAAA, CNAME, MX, and NS. */
  type?: string;
}

type DnsQueryShape = {
  class: z.ZodOptional<z.ZodString>;
  hostname: z.ZodString;
  opcode: z.ZodOptional<z.ZodString>;
  opcode_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  packet_uid: z.ZodOptional<z.ZodNumber>;
  type: z.ZodOptional<z.ZodString>;
};

const DnsQuerySchema: z.ZodObject<DnsQueryShape, z.core.$strict> = z.strictObject({
  /** The class of resource records being queried. See RFC 1035. For example: IN. */
  class: z.string().optional(),
  /** The hostname or domain being queried. For example: www.example.com */
  hostname: z.string(),
  /** The DNS opcode specifies the type of the query message. */
  opcode: z.string().optional(),
  /** The DNS opcode ID specifies the normalized query message type as defined in RFC 5395. */
  opcode_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The DNS packet identifier assigned by the program that generated the query. The identifier is copied to the response. */
  packet_uid: z.number().int().optional(),
  /** The type of resource records being queried. See RFC 1035. For example: A, AAAA, CNAME, MX, and NS. */
  type: z.string().optional(),
});

export const DnsQuery = DnsQuerySchema;

/** Value → label mappings for each enum field of DnsQuery. */
export const DnsQueryLabels: Readonly<Record<"opcode_id", Readonly<Record<number, string>>>> = {
  opcode_id: {
    0: "Query",
    1: "Inverse Query",
    2: "Status",
    3: "Reserved",
    4: "Notify",
    5: "Update",
    6: "DSO Message",
    99: "Other",
  },
};
