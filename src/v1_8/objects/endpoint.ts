import { z } from 'zod';

import type { AgentType } from './agent.js';
import type { DeviceHwInfoType } from './device_hw_info.js';
import type { LocationType } from './location.js';
import type { OsType } from './os.js';
import type { UserType } from './user.js';
import type { GroupType } from './group.js';

/**
 * The Endpoint object describes a physical or virtual device that connects to and exchanges information with a computer network. Some examples of endpoints are mobile devices, desktop computers, virtual machines, embedded devices, and servers. Internet-of-Things devices—like cameras, lighting, refrigerators, security systems, smart speakers, and thermostats—are also endpoints.
 *
 * OCSF Object: Endpoint
 */
export interface EndpointType {
  /** The short name of the endpoint. */
  name?: string;
  /** The unique identifier of the endpoint. */
  uid?: string;
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list?: AgentType[];
  /** The name of the domain that the endpoint belongs to or that corresponds to the endpoint. */
  domain?: string;
  /** The fully qualified name of the endpoint. */
  hostname?: string;
  /** The endpoint hardware information. */
  hw_info?: DeviceHwInfoType;
  /** The unique identifier of a VM instance. */
  instance_uid?: string;
  /** The name of the network interface (e.g. eth2). */
  interface_name?: string;
  /** The unique identifier of the network interface. */
  interface_uid?: string;
  /** The IP address of the endpoint, in either IPv4 or IPv6 format. */
  ip?: string;
  /** The geographical location of the endpoint. */
  location?: LocationType;
  /** The Media Access Control (MAC) address of the endpoint. */
  mac?: string;
  /** The vendor or manufacturer of the endpoint's network interface controller (NIC), as identified from the MAC address. */
  mac_vendor?: string;
  /** The endpoint operating system. */
  os?: OsType;
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner?: UserType;
  /** The pool of desktops or virtual machines to which the endpoint belongs. */
  pool?: GroupType;
  /** The unique identifier of a virtual subnet. */
  subnet_uid?: string;
  /** The endpoint type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type?: string;
  /** The endpoint type ID. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 99;
  /** The Virtual LAN identifier. */
  vlan_uid?: string;
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid?: string;
  /** The network zone or LAN segment. */
  zone?: string;
}

import { Agent } from './agent.js';
import { DeviceHwInfo } from './device_hw_info.js';
import { Location } from './location.js';
import { Os } from './os.js';
import { User } from './user.js';
import { Group } from './group.js';

type EndpointShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  agent_list: z.ZodOptional<z.ZodArray<typeof Agent>>;
  domain: z.ZodOptional<z.ZodString>;
  hostname: z.ZodOptional<z.ZodString>;
  hw_info: z.ZodOptional<typeof DeviceHwInfo>;
  instance_uid: z.ZodOptional<z.ZodString>;
  interface_name: z.ZodOptional<z.ZodString>;
  interface_uid: z.ZodOptional<z.ZodString>;
  ip: z.ZodOptional<z.ZodString>;
  location: z.ZodOptional<typeof Location>;
  mac: z.ZodOptional<z.ZodString>;
  mac_vendor: z.ZodOptional<z.ZodString>;
  os: z.ZodOptional<typeof Os>;
  owner: z.ZodOptional<typeof User>;
  pool: z.ZodOptional<typeof Group>;
  subnet_uid: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<15>, z.ZodLiteral<99>]>>;
  vlan_uid: z.ZodOptional<z.ZodString>;
  vpc_uid: z.ZodOptional<z.ZodString>;
  zone: z.ZodOptional<z.ZodString>;
};

const EndpointSchema: z.ZodObject<EndpointShape, z.core.$strict> = z.strictObject({
  /** The short name of the endpoint. */
  name: z.string().optional(),
  /** The unique identifier of the endpoint. */
  uid: z.string().optional(),
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list: z.array(Agent).optional(),
  /** The name of the domain that the endpoint belongs to or that corresponds to the endpoint. */
  domain: z.string().optional(),
  /** The fully qualified name of the endpoint. */
  hostname: z.string().optional(),
  /** The endpoint hardware information. */
  hw_info: DeviceHwInfo.optional(),
  /** The unique identifier of a VM instance. */
  instance_uid: z.string().optional(),
  /** The name of the network interface (e.g. eth2). */
  interface_name: z.string().optional(),
  /** The unique identifier of the network interface. */
  interface_uid: z.string().optional(),
  /** The IP address of the endpoint, in either IPv4 or IPv6 format. */
  ip: z.string().optional(),
  /** The geographical location of the endpoint. */
  location: Location.optional(),
  /** The Media Access Control (MAC) address of the endpoint. */
  mac: z.string().optional(),
  /** The vendor or manufacturer of the endpoint's network interface controller (NIC), as identified from the MAC address. */
  mac_vendor: z.string().optional(),
  /** The endpoint operating system. */
  os: Os.optional(),
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner: User.optional(),
  /** The pool of desktops or virtual machines to which the endpoint belongs. */
  pool: Group.optional(),
  /** The unique identifier of a virtual subnet. */
  subnet_uid: z.string().optional(),
  /** The endpoint type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type: z.string().optional(),
  /** The endpoint type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(99)]).optional(),
  /** The Virtual LAN identifier. */
  vlan_uid: z.string().optional(),
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid: z.string().optional(),
  /** The network zone or LAN segment. */
  zone: z.string().optional(),
});

export const Endpoint = EndpointSchema;

/** Value → label mappings for each enum field of Endpoint. */
export const EndpointLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Server",
    2: "Desktop",
    3: "Laptop",
    4: "Tablet",
    5: "Mobile",
    6: "Virtual",
    7: "IOT",
    8: "Browser",
    9: "Firewall",
    10: "Switch",
    11: "Hub",
    12: "Router",
    13: "IDS",
    14: "IPS",
    15: "Load Balancer",
    99: "Other",
  },
};
