import { z } from 'zod';

import { Agent } from './agent.js';
import { DeviceHwInfo } from './device_hw_info.js';
import { Location } from './location.js';
import { Os } from './os.js';
import { User } from './user.js';
import { AutonomousSystem } from './autonomous_system.js';

/**
 * The network proxy endpoint object describes a proxy server, which acts as an intermediary between a client requesting a resource and the server providing that resource.
 *
 * OCSF Object: Network Proxy Endpoint
 */
export const NetworkProxy = z.object({
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
  type_id: z.number().int().optional(),
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
  get proxy_endpoint(): any { return NetworkProxy.optional(); },
  /** The service name in service-to-service connections. For example, AWS VPC logs the pkt-src-aws-service and pkt-dst-aws-service fields identify the connection is coming from or going to an AWS service. */
  svc_name: z.string().optional(),
}).passthrough() as any;

export type NetworkProxyType = z.infer<typeof NetworkProxy>;
