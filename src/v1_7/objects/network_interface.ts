import { z } from 'zod';

import { PortInfo } from './port_info.js';

/**
 * The Network Interface object describes the type and associated attributes of a physical or virtual network interface.
 *
 * OCSF Object: Network Interface
 */
export const NetworkInterface: any = z.object({
  /** The name of the network interface. */
  name: z.string().optional(),
  /** The unique identifier for the network interface. */
  uid: z.string().optional(),
  /** The hostname associated with the network interface. */
  hostname: z.string().optional(),
  /** The IP address associated with the network interface. */
  ip: z.string().optional(),
  /** The MAC address of the network interface. */
  mac: z.string().optional(),
  /** The namespace is useful in merger or acquisition situations. For example, when similar entities exist that you need to keep separate. */
  namespace: z.string().optional(),
  /** The list of open ports on a network interface, including port numbers and associated protocol information. */
  open_ports: z.array(PortInfo).optional(),
  /** The subnet prefix length determines the number of bits used to represent the network part of the IP address. The remaining bits are reserved for identifying individual hosts within that subnet. */
  subnet_prefix: z.number().int().optional(),
  /** The type of network interface. */
  type: z.string().optional(),
  /** The network interface type identifier. */
  type_id: z.number().int().optional(),
}).passthrough();

export type NetworkInterfaceType = z.infer<typeof NetworkInterface>;
