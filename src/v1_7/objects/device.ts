import { z } from 'zod';

import type { AgentType } from './agent.js';
import type { DeviceHwInfoType } from './device_hw_info.js';
import type { LocationType } from './location.js';
import type { OsType } from './os.js';
import type { UserType } from './user.js';
import type { GroupType } from './group.js';
import type { ImageType } from './image.js';
import type { NetworkInterfaceType } from './network_interface.js';
import type { OrganizationType } from './organization.js';

/**
 * The Device object represents an addressable computer system or host, which is typically connected to a computer network and participates in the transmission or processing of data within the computer network.
 *
 * OCSF Object: Device
 */
export interface DeviceType {
  /** The alternate device name, ordinarily as assigned by an administrator. Note: The Name could be any other string that helps to identify the device, such as a phone number; for example 310-555-1234. */
  name?: string;
  /** The unique identifier of the device. For example the Windows TargetSID or AWS EC2 ARN. */
  uid?: string;
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list?: AgentType[];
  /** The network domain where the device resides. For example: work.example.com. */
  domain?: string;
  /** The device hostname. */
  hostname?: string;
  /** The endpoint hardware information. */
  hw_info?: DeviceHwInfoType;
  /** The unique identifier of a VM instance. */
  instance_uid?: string;
  /** The name of the network interface (e.g. eth2). */
  interface_name?: string;
  /** The unique identifier of the network interface. */
  interface_uid?: string;
  /** The device IP address, in either IPv4 or IPv6 format. */
  ip?: string;
  /** The geographical location of the device. */
  location?: LocationType;
  /** The Media Access Control (MAC) address of the endpoint. */
  mac?: string;
  /** The endpoint operating system. */
  os?: OsType;
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner?: UserType;
  /** The unique identifier of a virtual subnet. */
  subnet_uid?: string;
  /** The device type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type?: string;
  /** The device type ID. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 99;
  /** The Virtual LAN identifier. */
  vlan_uid?: string;
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid?: string;
  /** The network zone or LAN segment. */
  zone?: string;
  /** The unique identifier of the cloud autoscale configuration. */
  autoscale_uid?: string;
  /** The time the system was booted. */
  boot_time?: number;
  /** A unique identifier of the device that changes after every reboot. For example, the value of /proc/sys/kernel/random/boot_id from Linux's procfs. */
  boot_uid?: string;
  /** The time when the device was known to have been created. */
  created_time?: number;
  /** The description of the device, ordinarily as reported by the operating system. */
  desc?: string;
  /** An Embedded Identity Document, is a unique serial number that identifies an eSIM-enabled device. */
  eid?: string;
  /** The initial discovery time of the device. */
  first_seen_time?: number;
  /** The group names to which the device belongs. For example: ["Windows Laptops", "Engineering"]. */
  groups?: GroupType[];
  /** The name of the hypervisor running on the device. For example, Xen, VMware, Hyper-V, VirtualBox, etc. */
  hypervisor?: string;
  /** The Integrated Circuit Card Identification of a mobile device. Typically it is a unique 18 to 22 digit number that identifies a SIM card. */
  iccid?: string;
  /** The image used as a template to run the virtual machine. */
  image?: ImageType;
  /** The International Mobile Equipment Identity that is associated with the device. */
  imei?: string;
  /** The International Mobile Equipment Identity values that are associated with the device. */
  imei_list?: string[];
  /** Indicates whether the device or resource has a backup enabled, such as an automated snapshot or a cloud backup. For example, this is indicated by the cloudBackupEnabled value within JAMF Pro mobile devices or the registration of an AWS ARN with the AWS Backup service. */
  is_backed_up?: boolean;
  /** The event occurred on a compliant device. */
  is_compliant?: boolean;
  /** The event occurred on a managed device. */
  is_managed?: boolean;
  /** Indicates whether the device has an active mobile account. For example, this is indicated by the itunesStoreAccountActive value within JAMF Pro mobile devices. */
  is_mobile_account_active?: boolean;
  /** The event occurred on a personal device. */
  is_personal?: boolean;
  /** The event occurred on a shared device. */
  is_shared?: boolean;
  /** The event occurred on a supervised device. Devices that are supervised are typically mobile devices managed by a Mobile Device Management solution and are restricted from specific behaviors such as Apple AirDrop. */
  is_supervised?: boolean;
  /** The event occurred on a trusted device. */
  is_trusted?: boolean;
  /** The most recent discovery time of the device. */
  last_seen_time?: number;
  /** The Mobile Equipment Identifier. It's a unique number that identifies a Code Division Multiple Access (CDMA) mobile device. */
  meid?: string;
  /** The model of the device. For example ThinkPad X1 Carbon. */
  model?: string;
  /** The time when the device was last known to have been modified. */
  modified_time?: number;
  /** The physical or virtual network interfaces that are associated with the device, one for each unique MAC address/IP address/hostname/name combination.Note: The first element of the array is the network information that pertains to the event. */
  network_interfaces?: NetworkInterfaceType[];
  /** Organization and org unit related to the device. */
  org?: OrganizationType;
  /** The operating system assigned Machine ID. In Windows, this is the value stored at the registry path: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography\MachineGuid. In Linux, this is stored in the file: /etc/machine-id. */
  os_machine_uuid?: string;
  /** The region where the virtual machine is located. For example, an AWS Region. */
  region?: string;
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level?: string;
  /** The normalized risk level id. */
  risk_level_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The risk score as reported by the event source. */
  risk_score?: number;
  /** The subnet mask. */
  subnet?: string;
  /** The Apple assigned Unique Device Identifier (UDID). For iOS, iPadOS, tvOS, watchOS and visionOS devices, this is the UDID. For macOS devices, it is the Provisioning UDID. For example: 00008020-008D4548007B4F26 */
  udid?: string;
  /** An alternate unique identifier of the device if any. For example the ActiveDirectory DN. */
  uid_alt?: string;
  /** The vendor for the device. For example Dell or Lenovo. */
  vendor_name?: string;
}

import { Agent } from './agent.js';
import { DeviceHwInfo } from './device_hw_info.js';
import { Location } from './location.js';
import { Os } from './os.js';
import { User } from './user.js';
import { Group } from './group.js';
import { Image } from './image.js';
import { NetworkInterface } from './network_interface.js';
import { Organization } from './organization.js';

const DeviceSchema: z.ZodType<DeviceType> = z.strictObject({
  /** The alternate device name, ordinarily as assigned by an administrator. Note: The Name could be any other string that helps to identify the device, such as a phone number; for example 310-555-1234. */
  name: z.string().optional(),
  /** The unique identifier of the device. For example the Windows TargetSID or AWS EC2 ARN. */
  uid: z.string().optional(),
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list: z.array(Agent).optional(),
  /** The network domain where the device resides. For example: work.example.com. */
  domain: z.string().optional(),
  /** The device hostname. */
  hostname: z.string().optional(),
  /** The endpoint hardware information. */
  hw_info: DeviceHwInfo.optional(),
  /** The unique identifier of a VM instance. */
  instance_uid: z.string().optional(),
  /** The name of the network interface (e.g. eth2). */
  interface_name: z.string().optional(),
  /** The unique identifier of the network interface. */
  interface_uid: z.string().optional(),
  /** The device IP address, in either IPv4 or IPv6 format. */
  ip: z.string().optional(),
  /** The geographical location of the device. */
  location: Location.optional(),
  /** The Media Access Control (MAC) address of the endpoint. */
  mac: z.string().optional(),
  /** The endpoint operating system. */
  os: Os.optional(),
  /** The identity of the service or user account that owns the endpoint or was last logged into it. */
  owner: User.optional(),
  /** The unique identifier of a virtual subnet. */
  subnet_uid: z.string().optional(),
  /** The device type. For example: unknown, server, desktop, laptop, tablet, mobile, virtual, browser, or other. */
  type: z.string().optional(),
  /** The device type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(99)]),
  /** The Virtual LAN identifier. */
  vlan_uid: z.string().optional(),
  /** The unique identifier of the Virtual Private Cloud (VPC). */
  vpc_uid: z.string().optional(),
  /** The network zone or LAN segment. */
  zone: z.string().optional(),
  /** The unique identifier of the cloud autoscale configuration. */
  autoscale_uid: z.string().optional(),
  /** The time the system was booted. */
  boot_time: z.number().int().optional(),
  /** A unique identifier of the device that changes after every reboot. For example, the value of /proc/sys/kernel/random/boot_id from Linux's procfs. */
  boot_uid: z.string().optional(),
  /** The time when the device was known to have been created. */
  created_time: z.number().int().optional(),
  /** The description of the device, ordinarily as reported by the operating system. */
  desc: z.string().optional(),
  /** An Embedded Identity Document, is a unique serial number that identifies an eSIM-enabled device. */
  eid: z.string().optional(),
  /** The initial discovery time of the device. */
  first_seen_time: z.number().int().optional(),
  /** The group names to which the device belongs. For example: ["Windows Laptops", "Engineering"]. */
  groups: z.array(Group).optional(),
  /** The name of the hypervisor running on the device. For example, Xen, VMware, Hyper-V, VirtualBox, etc. */
  hypervisor: z.string().optional(),
  /** The Integrated Circuit Card Identification of a mobile device. Typically it is a unique 18 to 22 digit number that identifies a SIM card. */
  iccid: z.string().optional(),
  /** The image used as a template to run the virtual machine. */
  image: Image.optional(),
  /** The International Mobile Equipment Identity that is associated with the device. */
  imei: z.string().optional(),
  /** The International Mobile Equipment Identity values that are associated with the device. */
  imei_list: z.array(z.string()).optional(),
  /** Indicates whether the device or resource has a backup enabled, such as an automated snapshot or a cloud backup. For example, this is indicated by the cloudBackupEnabled value within JAMF Pro mobile devices or the registration of an AWS ARN with the AWS Backup service. */
  is_backed_up: z.boolean().optional(),
  /** The event occurred on a compliant device. */
  is_compliant: z.boolean().optional(),
  /** The event occurred on a managed device. */
  is_managed: z.boolean().optional(),
  /** Indicates whether the device has an active mobile account. For example, this is indicated by the itunesStoreAccountActive value within JAMF Pro mobile devices. */
  is_mobile_account_active: z.boolean().optional(),
  /** The event occurred on a personal device. */
  is_personal: z.boolean().optional(),
  /** The event occurred on a shared device. */
  is_shared: z.boolean().optional(),
  /** The event occurred on a supervised device. Devices that are supervised are typically mobile devices managed by a Mobile Device Management solution and are restricted from specific behaviors such as Apple AirDrop. */
  is_supervised: z.boolean().optional(),
  /** The event occurred on a trusted device. */
  is_trusted: z.boolean().optional(),
  /** The most recent discovery time of the device. */
  last_seen_time: z.number().int().optional(),
  /** The Mobile Equipment Identifier. It's a unique number that identifies a Code Division Multiple Access (CDMA) mobile device. */
  meid: z.string().optional(),
  /** The model of the device. For example ThinkPad X1 Carbon. */
  model: z.string().optional(),
  /** The time when the device was last known to have been modified. */
  modified_time: z.number().int().optional(),
  /** The physical or virtual network interfaces that are associated with the device, one for each unique MAC address/IP address/hostname/name combination.Note: The first element of the array is the network information that pertains to the event. */
  network_interfaces: z.array(NetworkInterface).optional(),
  /** Organization and org unit related to the device. */
  org: Organization.optional(),
  /** The operating system assigned Machine ID. In Windows, this is the value stored at the registry path: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography\MachineGuid. In Linux, this is stored in the file: /etc/machine-id. */
  os_machine_uuid: z.string().optional(),
  /** The region where the virtual machine is located. For example, an AWS Region. */
  region: z.string().optional(),
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level: z.string().optional(),
  /** The normalized risk level id. */
  risk_level_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The risk score as reported by the event source. */
  risk_score: z.number().int().optional(),
  /** The subnet mask. */
  subnet: z.string().optional(),
  /** The Apple assigned Unique Device Identifier (UDID). For iOS, iPadOS, tvOS, watchOS and visionOS devices, this is the UDID. For macOS devices, it is the Provisioning UDID. For example: 00008020-008D4548007B4F26 */
  udid: z.string().optional(),
  /** An alternate unique identifier of the device if any. For example the ActiveDirectory DN. */
  uid_alt: z.string().optional(),
  /** The vendor for the device. For example Dell or Lenovo. */
  vendor_name: z.string().optional(),
});

export const Device = DeviceSchema;
