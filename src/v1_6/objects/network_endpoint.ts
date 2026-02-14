import { z } from 'zod';

import type { AgentType } from './agent.js';
import type { DeviceHwInfoType } from './device_hw_info.js';
import type { LocationType } from './location.js';
import type { OsType } from './os.js';
import type { UserType } from './user.js';
import type { AutonomousSystemType } from './autonomous_system.js';
import type { NetworkProxyType } from './network_proxy.js';

/**
 * The Network Endpoint object describes characteristics of a network endpoint. These can be a source or destination of a network connection.
 *
 * OCSF Object: Network Endpoint
 */
export interface NetworkEndpointType {
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
  /** The endpoint operating system. */
  os?: OsType;
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner?: UserType;
  /** The unique identifier of a virtual subnet. */
  subnet_uid?: string;
  /** The network endpoint type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type?: string;
  /** The network endpoint type ID. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 99;
  /** The Virtual LAN identifier. */
  vlan_uid?: string;
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid?: string;
  /** The network zone or LAN segment. */
  zone?: string;
  /** The Autonomous System details associated with an IP address. */
  autonomous_system?: AutonomousSystemType;
  /** The intermediate IP Addresses. For example, the IP addresses in the HTTP X-Forwarded-For header. */
  intermediate_ips?: string[];
  /** The name of the Internet Service Provider (ISP). */
  isp?: string;
  /** The organization name of the Internet Service Provider (ISP). This represents the parent organization or company that owns/operates the ISP. For example, Comcast Corporation would be the ISP org for Xfinity internet service. This attribute helps identify the ultimate provider when ISPs operate under different brand names. */
  isp_org?: string;
  /** The port used for communication within the network connection. */
  port?: number;
  /** The network proxy information pertaining to a specific endpoint. This can be used to describe information pertaining to network address translation (NAT). */
  proxy_endpoint?: NetworkProxyType;
  /** The service name in service-to-service connections. For example, AWS VPC logs the pkt-src-aws-service and pkt-dst-aws-service fields identify the connection is coming from or going to an AWS service. */
  svc_name?: string;
}

import { Agent } from './agent.js';
import { DeviceHwInfo } from './device_hw_info.js';
import { Location } from './location.js';
import { Os } from './os.js';
import { User } from './user.js';
import { AutonomousSystem } from './autonomous_system.js';
import { NetworkProxy } from './network_proxy.js';

const NetworkEndpointSchema: z.ZodType<NetworkEndpointType> = z.strictObject({
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
  /** The endpoint operating system. */
  os: Os.optional(),
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner: User.optional(),
  /** The unique identifier of a virtual subnet. */
  subnet_uid: z.string().optional(),
  /** The network endpoint type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type: z.string().optional(),
  /** The network endpoint type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(99)]).optional(),
  /** The Virtual LAN identifier. */
  vlan_uid: z.string().optional(),
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid: z.string().optional(),
  /** The network zone or LAN segment. */
  zone: z.string().optional(),
  /** The Autonomous System details associated with an IP address. */
  autonomous_system: AutonomousSystem.optional(),
  /** The intermediate IP Addresses. For example, the IP addresses in the HTTP X-Forwarded-For header. */
  intermediate_ips: z.array(z.string()).optional(),
  /** The name of the Internet Service Provider (ISP). */
  isp: z.string().optional(),
  /** The organization name of the Internet Service Provider (ISP). This represents the parent organization or company that owns/operates the ISP. For example, Comcast Corporation would be the ISP org for Xfinity internet service. This attribute helps identify the ultimate provider when ISPs operate under different brand names. */
  isp_org: z.string().optional(),
  /** The port used for communication within the network connection. */
  port: z.number().int().optional(),
  /** The network proxy information pertaining to a specific endpoint. This can be used to describe information pertaining to network address translation (NAT). */
  proxy_endpoint: NetworkProxy.optional(),
  /** The service name in service-to-service connections. For example, AWS VPC logs the pkt-src-aws-service and pkt-dst-aws-service fields identify the connection is coming from or going to an AWS service. */
  svc_name: z.string().optional(),
});

export const NetworkEndpoint = NetworkEndpointSchema;
