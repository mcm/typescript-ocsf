import { z } from "zod";

import { Agent, type AgentType } from "./agent.js";
import { AutonomousSystem, type AutonomousSystemType } from "./autonomous_system.js";
import { DeviceHwInfo, type DeviceHwInfoType } from "./device_hw_info.js";
import { Location, type LocationType } from "./location.js";
import { NetworkProxy, type NetworkProxyType } from "./network_proxy.js";
import { Os, type OsType } from "./os.js";
import { User, type UserType } from "./user.js";

/**
 * The Network Endpoint object describes characteristics of a network endpoint. These can be a source or destination of a network connection.
 *
 * OCSF Object: Network Endpoint
 */
export interface NetworkEndpointType {
  /** The short name of the endpoint. */
  name?: string | undefined;
  /** The unique identifier. See specific usage. */
  uid?: string | undefined;
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list?: AgentType[] | undefined;
  /** The name of the domain that the endpoint belongs to or that corresponds to the endpoint. */
  domain?: string | undefined;
  /** The fully qualified name of the endpoint. */
  hostname?: string | undefined;
  /** The endpoint hardware information. */
  hw_info?: DeviceHwInfoType | undefined;
  /** The unique identifier of a VM instance. */
  instance_uid?: string | undefined;
  /** The name of the network interface (e.g. eth2). */
  interface_name?: string | undefined;
  /** The unique identifier of the network interface. */
  interface_uid?: string | undefined;
  /** The IP address of the endpoint, in either IPv4 or IPv6 format. */
  ip?: string | undefined;
  /** The geographical location of the endpoint. */
  location?: LocationType | undefined;
  /** The Media Access Control (MAC) address of the endpoint. */
  mac?: string | undefined;
  /** The endpoint operating system. */
  os?: OsType | undefined;
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner?: UserType | undefined;
  /** The unique identifier of a virtual subnet. */
  subnet_uid?: string | undefined;
  /** The network endpoint type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type?: string | undefined;
  /** The network endpoint type ID. */
  type_id?: number | undefined;
  /** The Virtual LAN identifier. */
  vlan_uid?: string | undefined;
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid?: string | undefined;
  /** The network zone or LAN segment. */
  zone?: string | undefined;
  /** The Autonomous System details associated with an IP address. */
  autonomous_system?: AutonomousSystemType | undefined;
  /** The intermediate IP Addresses. For example, the IP addresses in the HTTP X-Forwarded-For header. */
  intermediate_ips?: string[] | undefined;
  /** The name of the Internet Service Provider (ISP). */
  isp?: string | undefined;
  /** The organization name of the Internet Service Provider (ISP). This represents the parent organization or company that owns/operates the ISP. For example, Comcast Corporation would be the ISP org for Xfinity internet service. This attribute helps identify the ultimate provider when ISPs operate under different brand names. */
  isp_org?: string | undefined;
  /** Indicates whether the endpoint resides inside the customer’s network, outside on the Internet, or if its location relative to the customer’s network cannot be determined. The value is normalized to the caption of the network_scope_id. */
  network_scope?: string | undefined;
  /** The normalized identifier of the endpoint’s network scope. The normalized network scope identifier indicates whether the endpoint resides inside the customer’s network, outside on the Internet, or if its location relative to the customer’s network cannot be determined. */
  network_scope_id?: number | undefined;
  /** The port used for communication within the network connection. */
  port?: number | undefined;
  /** The network proxy information pertaining to a specific endpoint. This can be used to describe information pertaining to network address translation (NAT). */
  proxy_endpoint?: NetworkProxyType | undefined;
  /** The service name in service-to-service connections. For example, AWS VPC logs the pkt-src-aws-service and pkt-dst-aws-service fields identify the connection is coming from or going to an AWS service. */
  svc_name?: string | undefined;
  [key: string]: unknown;
}

export const NetworkEndpoint: z.ZodType<NetworkEndpointType> = z
  .object({
    /** The short name of the endpoint. */
    name: z.string().optional(),
    /** The unique identifier. See specific usage. */
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
    owner: z.lazy(() => User).optional(),
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
    /** Indicates whether the endpoint resides inside the customer’s network, outside on the Internet, or if its location relative to the customer’s network cannot be determined. The value is normalized to the caption of the network_scope_id. */
    network_scope: z.string().optional(),
    /** The normalized identifier of the endpoint’s network scope. The normalized network scope identifier indicates whether the endpoint resides inside the customer’s network, outside on the Internet, or if its location relative to the customer’s network cannot be determined. */
    network_scope_id: z.number().int().optional(),
    /** The port used for communication within the network connection. */
    port: z.number().int().optional(),
    /** The network proxy information pertaining to a specific endpoint. This can be used to describe information pertaining to network address translation (NAT). */
    proxy_endpoint: NetworkProxy.optional(),
    /** The service name in service-to-service connections. For example, AWS VPC logs the pkt-src-aws-service and pkt-dst-aws-service fields identify the connection is coming from or going to an AWS service. */
    svc_name: z.string().optional(),
  })
  .passthrough() as any;
