import { z } from 'zod';

import { Session } from './session.js';

/**
 * The Network Connection Information object describes characteristics of an OSI Transport Layer communication, including TCP and UDP.
 *
 * OCSF Object: Network Connection Information
 */
export const NetworkConnectionInfo = z.object({
  /** The boundary of the connection, normalized to the caption of 'boundary_id'. In the case of 'Other', it is defined by the event source. For cloud connections, this translates to the traffic-boundary(same VPC, through IGW, etc.). For traditional networks, this is described as Local, Internal, or External. */
  boundary: z.string().optional(),
  /** The normalized identifier of the boundary of the connection. For cloud connections, this translates to the traffic-boundary (same VPC, through IGW, etc.). For traditional networks, this is described as Local, Internal, or External. */
  boundary_id: z.number().int().optional(),
  /** The Community ID of the network connection. */
  community_uid: z.string().optional(),
  /** The direction of the initiated connection, traffic, or email, normalized to the caption of the direction_id value. In the case of 'Other', it is defined by the event source. */
  direction: z.string().optional(),
  /** The normalized identifier of the direction of the initiated connection, traffic, or email. */
  direction_id: z.number().int(),
  /** The Connection Flag History summarizes events in a network connection. For example flags ShAD representing SYN, SYN/ACK, ACK and Data exchange. */
  flag_history: z.string().optional(),
  /** The IP protocol name in lowercase, as defined by the Internet Assigned Numbers Authority (IANA). For example: tcp or udp. */
  protocol_name: z.string().optional(),
  /** The IP protocol number, as defined by the Internet Assigned Numbers Authority (IANA). For example: 6 for TCP and 17 for UDP. */
  protocol_num: z.number().int().optional(),
  /** The Internet Protocol version. */
  protocol_ver: z.string().optional(),
  /** The Internet Protocol version identifier. */
  protocol_ver_id: z.number().int().optional(),
  /** The authenticated user or service session. */
  session: Session.optional(),
  /** The network connection TCP header flags (i.e., control bits). */
  tcp_flags: z.number().int().optional(),
  /** The unique identifier of the connection. */
  uid: z.string().optional(),
}).passthrough() as any;

export type NetworkConnectionInfoType = z.infer<typeof NetworkConnectionInfo>;
