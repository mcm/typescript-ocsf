import { z } from 'zod';

/**
 * The Port Information object describes a port and its associated protocol details.
 *
 * OCSF Object: Port Information
 */
export interface PortInfoType {
  /** The port number. For example: 80, 443, 22. */
  port: number;
  /** The IP protocol name in lowercase, as defined by the Internet Assigned Numbers Authority (IANA). For example: tcp or udp. */
  protocol_name?: string;
  /** The IP protocol number, as defined by the Internet Assigned Numbers Authority (IANA). For example: 6 for TCP and 17 for UDP. */
  protocol_num?: number;
}

const PortInfoSchema: z.ZodType<PortInfoType> = z.strictObject({
  /** The port number. For example: 80, 443, 22. */
  port: z.number().int(),
  /** The IP protocol name in lowercase, as defined by the Internet Assigned Numbers Authority (IANA). For example: tcp or udp. */
  protocol_name: z.string().optional(),
  /** The IP protocol number, as defined by the Internet Assigned Numbers Authority (IANA). For example: 6 for TCP and 17 for UDP. */
  protocol_num: z.number().int().optional(),
});

export const PortInfo = PortInfoSchema;
