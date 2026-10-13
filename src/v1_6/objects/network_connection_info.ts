import { z } from 'zod';

import type { SessionType } from './session.js';

/**
 * The Network Connection Information object describes characteristics of an OSI Transport Layer communication, including TCP and UDP.
 *
 * OCSF Object: Network Connection Information
 */
export interface NetworkConnectionInfoType {
  /** The boundary of the connection, normalized to the caption of 'boundary_id'. In the case of 'Other', it is defined by the event source. For cloud connections, this translates to the traffic-boundary(same VPC, through IGW, etc.). For traditional networks, this is described as Local, Internal, or External. */
  boundary?: string;
  /** The normalized identifier of the boundary of the connection. For cloud connections, this translates to the traffic-boundary (same VPC, through IGW, etc.). For traditional networks, this is described as Local, Internal, or External. */
  boundary_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 99;
  /** The Community ID of the network connection. */
  community_uid?: string;
  /** The direction of the initiated connection, traffic, or email, normalized to the caption of the direction_id value. In the case of 'Other', it is defined by the event source. */
  direction?: string;
  /** The normalized identifier of the direction of the initiated connection, traffic, or email. */
  direction_id: 0 | 1 | 2 | 3 | 99;
  /** The Connection Flag History summarizes events in a network connection. For example flags ShAD representing SYN, SYN/ACK, ACK and Data exchange. */
  flag_history?: string;
  /** The IP protocol name in lowercase, as defined by the Internet Assigned Numbers Authority (IANA). For example: tcp or udp. */
  protocol_name?: string;
  /** The IP protocol number, as defined by the Internet Assigned Numbers Authority (IANA). For example: 6 for TCP and 17 for UDP. */
  protocol_num?: number;
  /** The Internet Protocol version. */
  protocol_ver?: string;
  /** The Internet Protocol version identifier. */
  protocol_ver_id?: 0 | 4 | 6 | 99;
  /** The authenticated user or service session. */
  session?: SessionType;
  /** The network connection TCP header flags (i.e., control bits). */
  tcp_flags?: number;
  /** The unique identifier of the connection. */
  uid?: string;
}

import { Session } from './session.js';

type NetworkConnectionInfoShape = {
  boundary: z.ZodOptional<z.ZodString>;
  boundary_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<99>]>>;
  community_uid: z.ZodOptional<z.ZodString>;
  direction: z.ZodOptional<z.ZodString>;
  direction_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>;
  flag_history: z.ZodOptional<z.ZodString>;
  protocol_name: z.ZodOptional<z.ZodString>;
  protocol_num: z.ZodOptional<z.ZodNumber>;
  protocol_ver: z.ZodOptional<z.ZodString>;
  protocol_ver_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<4>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  session: z.ZodOptional<typeof Session>;
  tcp_flags: z.ZodOptional<z.ZodNumber>;
  uid: z.ZodOptional<z.ZodString>;
};

const NetworkConnectionInfoSchema: z.ZodObject<NetworkConnectionInfoShape, z.core.$strict> = z.strictObject({
  /** The boundary of the connection, normalized to the caption of 'boundary_id'. In the case of 'Other', it is defined by the event source. For cloud connections, this translates to the traffic-boundary(same VPC, through IGW, etc.). For traditional networks, this is described as Local, Internal, or External. */
  boundary: z.string().optional(),
  /** The normalized identifier of the boundary of the connection. For cloud connections, this translates to the traffic-boundary (same VPC, through IGW, etc.). For traditional networks, this is described as Local, Internal, or External. */
  boundary_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(99)]).optional(),
  /** The Community ID of the network connection. */
  community_uid: z.string().optional(),
  /** The direction of the initiated connection, traffic, or email, normalized to the caption of the direction_id value. In the case of 'Other', it is defined by the event source. */
  direction: z.string().optional(),
  /** The normalized identifier of the direction of the initiated connection, traffic, or email. */
  direction_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]),
  /** The Connection Flag History summarizes events in a network connection. For example flags ShAD representing SYN, SYN/ACK, ACK and Data exchange. */
  flag_history: z.string().optional(),
  /** The IP protocol name in lowercase, as defined by the Internet Assigned Numbers Authority (IANA). For example: tcp or udp. */
  protocol_name: z.string().optional(),
  /** The IP protocol number, as defined by the Internet Assigned Numbers Authority (IANA). For example: 6 for TCP and 17 for UDP. */
  protocol_num: z.number().int().optional(),
  /** The Internet Protocol version. */
  protocol_ver: z.string().optional(),
  /** The Internet Protocol version identifier. */
  protocol_ver_id: z.union([z.literal(0), z.literal(4), z.literal(6), z.literal(99)]).optional(),
  /** The authenticated user or service session. */
  session: Session.optional(),
  /** The network connection TCP header flags (i.e., control bits). */
  tcp_flags: z.number().int().optional(),
  /** The unique identifier of the connection. */
  uid: z.string().optional(),
});

export const NetworkConnectionInfo = NetworkConnectionInfoSchema;

/** Value → label mappings for each enum field of NetworkConnectionInfo. */
export const NetworkConnectionInfoLabels: Readonly<Record<"boundary_id" | "direction_id" | "protocol_ver_id", Readonly<Record<number, string>>>> = {
  boundary_id: {
    0: "Unknown",
    1: "Localhost",
    2: "Internal",
    3: "External",
    4: "Same VPC",
    5: "Internet/VPC Gateway",
    6: "Virtual Private Gateway",
    7: "Intra-region VPC",
    8: "Inter-region VPC",
    9: "Local Gateway",
    10: "Gateway VPC",
    11: "Internet Gateway",
    99: "Other",
  },
  direction_id: {
    0: "Unknown",
    1: "Inbound",
    2: "Outbound",
    3: "Lateral",
    99: "Other",
  },
  protocol_ver_id: {
    0: "Unknown",
    4: "Internet Protocol version 4 (IPv4)",
    6: "Internet Protocol version 6 (IPv6)",
    99: "Other",
  },
};
