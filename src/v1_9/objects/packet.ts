import { z } from 'zod';

/**
 * The Packet object represents a single captured network packet and its associated metadata. It describes where the packet came from, how it is stored or encoded, and how it can be located within a capture file or stream. This object does not interpret protocol content; it only represents the captured packet data and its positioning information.
 *
 * OCSF Object: Packet
 */
export interface PacketType {
  /** The human-readable name of the encoding used to represent the packet data in the value field. This should match the caption associated with encoding_id. If encoding_id is 99 (Other), this field contains the original data source–specific encoding value. */
  encoding?: string;
  /** The normalized identifier of the encoding method used to represent the packet data as a string. */
  encoding_id?: 0 | 1 | 2 | 3 | 99;
  /** The ending byte position of this packet within a capture file or stream. */
  end_offset?: number;
  /** The human-readable name of the packet capture file format in which the packet is stored. This should match the caption associated with format_id. If format_id is 99 (Other), this field contains the original data source–specific format value. */
  format?: string;
  /** The normalized identifier of the packet capture format. */
  format_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The relative order number of this packet within its capture context (such as a PCAP file, network session, or reconstructed stream). This represents chronological capture order, distinct from both protocol-level sequencing (such as TCP sequence numbers). */
  sequence_number?: number;
  /** The human-readable name describing how or where the packet was obtained. This should match the caption associated with source_id. If source_id is 99 (Other), this field contains the original data source–specific value. */
  source?: string;
  /** A normalized numeric identifier that specifies how the packet was obtained or generated. */
  source_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The starting byte position of this packet within a capture file or stream. */
  start_offset?: number;
  /** The actual packet data, represented as a string. The format of this string is determined by the specified encoding_id (e.g., Base64, Hexadecimal, or URL Encoded). */
  value: string;
}

type PacketShape = {
  encoding: z.ZodOptional<z.ZodString>;
  encoding_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  end_offset: z.ZodOptional<z.ZodNumber>;
  format: z.ZodOptional<z.ZodString>;
  format_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  sequence_number: z.ZodOptional<z.ZodNumber>;
  source: z.ZodOptional<z.ZodString>;
  source_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<99>]>>;
  start_offset: z.ZodOptional<z.ZodNumber>;
  value: z.ZodString;
};

const PacketSchema: z.ZodObject<PacketShape, z.core.$strict> = z.strictObject({
  /** The human-readable name of the encoding used to represent the packet data in the value field. This should match the caption associated with encoding_id. If encoding_id is 99 (Other), this field contains the original data source–specific encoding value. */
  encoding: z.string().optional(),
  /** The normalized identifier of the encoding method used to represent the packet data as a string. */
  encoding_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The ending byte position of this packet within a capture file or stream. */
  end_offset: z.number().int().optional(),
  /** The human-readable name of the packet capture file format in which the packet is stored. This should match the caption associated with format_id. If format_id is 99 (Other), this field contains the original data source–specific format value. */
  format: z.string().optional(),
  /** The normalized identifier of the packet capture format. */
  format_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The relative order number of this packet within its capture context (such as a PCAP file, network session, or reconstructed stream). This represents chronological capture order, distinct from both protocol-level sequencing (such as TCP sequence numbers). */
  sequence_number: z.number().int().optional(),
  /** The human-readable name describing how or where the packet was obtained. This should match the caption associated with source_id. If source_id is 99 (Other), this field contains the original data source–specific value. */
  source: z.string().optional(),
  /** A normalized numeric identifier that specifies how the packet was obtained or generated. */
  source_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]).optional(),
  /** The starting byte position of this packet within a capture file or stream. */
  start_offset: z.number().int().optional(),
  /** The actual packet data, represented as a string. The format of this string is determined by the specified encoding_id (e.g., Base64, Hexadecimal, or URL Encoded). */
  value: z.string(),
});

export const Packet = PacketSchema;

/** Value → label mappings for each enum field of Packet. */
export const PacketLabels: Readonly<Record<"encoding_id" | "format_id" | "source_id", Readonly<Record<number, string>>>> = {
  encoding_id: {
    0: "Unknown",
    1: "Base64",
    2: "Hexadecimal",
    3: "URL Encoded",
    99: "Other",
  },
  format_id: {
    0: "Unknown",
    1: "PCAP",
    2: "PCAPNG",
    3: "Snoop",
    4: "ERF",
    5: "NetMon",
    6: "5Views",
    99: "Other",
  },
  source_id: {
    0: "Unknown",
    1: "Wire",
    2: "Stream",
    3: "Decoder",
    4: "TAP",
    5: "SPAN",
    6: "Endpoint",
    7: "Virtual",
    99: "Other",
  },
};
