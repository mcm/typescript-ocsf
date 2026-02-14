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

const NetworkConnectionInfoSchema = z.strictObject({
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
