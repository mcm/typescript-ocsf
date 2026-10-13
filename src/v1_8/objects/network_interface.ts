import { z } from 'zod';

import type { PortInfoType } from './port_info.js';

/**
 * The Network Interface object describes the type and associated attributes of a physical or virtual network interface.
 *
 * OCSF Object: Network Interface
 */
export interface NetworkInterfaceType {
  /** The name of the network interface. */
  name?: string;
  /** The unique identifier for the network interface. */
  uid?: string;
  /** The hostname associated with the network interface. */
  hostname?: string;
  /** The IP address associated with the network interface. */
  ip?: string;
  /** The MAC address of the network interface. */
  mac?: string;
  /** The namespace is useful in merger or acquisition situations. For example, when similar entities exist that you need to keep separate. */
  namespace?: string;
  /** The list of open ports on a network interface, including port numbers and associated protocol information. */
  open_ports?: PortInfoType[];
  /** The subnet prefix length determines the number of bits used to represent the network part of the IP address. The remaining bits are reserved for identifying individual hosts within that subnet. */
  subnet_prefix?: number;
  /** The type of network interface. */
  type?: string;
  /** The network interface type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 99;
}

import { PortInfo } from './port_info.js';

type NetworkInterfaceShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  hostname: z.ZodOptional<z.ZodString>;
  ip: z.ZodOptional<z.ZodString>;
  mac: z.ZodOptional<z.ZodString>;
  namespace: z.ZodOptional<z.ZodString>;
  open_ports: z.ZodOptional<z.ZodArray<typeof PortInfo>>;
  subnet_prefix: z.ZodOptional<z.ZodNumber>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
};

const NetworkInterfaceSchema: z.ZodObject<NetworkInterfaceShape, z.core.$strict> = z.strictObject({
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
});

export const NetworkInterface = NetworkInterfaceSchema;

/** Value → label mappings for each enum field of NetworkInterface. */
export const NetworkInterfaceLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Wired",
    2: "Wireless",
    3: "Mobile",
    4: "Tunnel",
    99: "Other",
  },
};
