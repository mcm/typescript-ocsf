import { z } from 'zod';

import type { DisplayType } from './display.js';
import type { KeyboardInfoType } from './keyboard_info.js';

/**
 * The Device Hardware Information object contains details and specifications of the physical components that make up a device. This information provides an overview of the hardware capabilities, configuration, and characteristics of the device.
 *
 * OCSF Object: Device Hardware Info
 */
export interface DeviceHwInfoType {
  /** The BIOS date. For example: 03/31/16. */
  bios_date?: string;
  /** The BIOS manufacturer. For example: LENOVO. */
  bios_manufacturer?: string;
  /** The BIOS version. For example: LENOVO G5ETA2WW (2.62). */
  bios_ver?: string;
  /** The chassis type describes the system enclosure or physical form factor. Such as the following examples for Windows Windows Chassis Types */
  chassis?: string;
  /** The CPU architecture, normalized to the caption of the cpu_architecture_id value. In the case of Other, it is defined by the source. */
  cpu_architecture?: string;
  /** The normalized identifier of the CPU architecture. */
  cpu_architecture_id?: 0 | 1 | 2 | 3 | 99;
  /** The cpu architecture, the number of bits used for addressing in memory. For example: 32 or 64. */
  cpu_bits?: number;
  /** The number of processor cores in all installed processors. For Example: 42. */
  cpu_cores?: number;
  /** The number of physical processors on a system. For example: 1. */
  cpu_count?: number;
  /** The speed of the processor in Mhz. For Example: 4200. */
  cpu_speed?: number;
  /** The processor type. For example: x86 Family 6 Model 37 Stepping 5. */
  cpu_type?: string;
  /** The desktop display affiliated with the event */
  desktop_display?: DisplayType;
  /** The keyboard detailed information. */
  keyboard_info?: KeyboardInfoType;
  /** The total amount of installed RAM, in Megabytes. For example: 2048. */
  ram_size?: number;
  /** The device manufacturer serial number. */
  serial_number?: string;
  /** The device manufacturer assigned universally unique hardware identifier. For SMBIOS compatible devices such as those running Linux and Windows, it is the UUID member of the System Information structure in the SMBIOS information. For macOS devices, it is the Hardware UUID (also known as IOPlatformUUID in the I/O Registry). */
  uuid?: string;
  /** The device manufacturer. */
  vendor_name?: string;
}

import { Display } from './display.js';
import { KeyboardInfo } from './keyboard_info.js';

const DeviceHwInfoSchema = z.strictObject({
  /** The BIOS date. For example: 03/31/16. */
  bios_date: z.string().optional(),
  /** The BIOS manufacturer. For example: LENOVO. */
  bios_manufacturer: z.string().optional(),
  /** The BIOS version. For example: LENOVO G5ETA2WW (2.62). */
  bios_ver: z.string().optional(),
  /** The chassis type describes the system enclosure or physical form factor. Such as the following examples for Windows Windows Chassis Types */
  chassis: z.string().optional(),
  /** The CPU architecture, normalized to the caption of the cpu_architecture_id value. In the case of Other, it is defined by the source. */
  cpu_architecture: z.string().optional(),
  /** The normalized identifier of the CPU architecture. */
  cpu_architecture_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The cpu architecture, the number of bits used for addressing in memory. For example: 32 or 64. */
  cpu_bits: z.number().int().optional(),
  /** The number of processor cores in all installed processors. For Example: 42. */
  cpu_cores: z.number().int().optional(),
  /** The number of physical processors on a system. For example: 1. */
  cpu_count: z.number().int().optional(),
  /** The speed of the processor in Mhz. For Example: 4200. */
  cpu_speed: z.number().int().optional(),
  /** The processor type. For example: x86 Family 6 Model 37 Stepping 5. */
  cpu_type: z.string().optional(),
  /** The desktop display affiliated with the event */
  desktop_display: Display.optional(),
  /** The keyboard detailed information. */
  keyboard_info: KeyboardInfo.optional(),
  /** The total amount of installed RAM, in Megabytes. For example: 2048. */
  ram_size: z.number().int().optional(),
  /** The device manufacturer serial number. */
  serial_number: z.string().optional(),
  /** The device manufacturer assigned universally unique hardware identifier. For SMBIOS compatible devices such as those running Linux and Windows, it is the UUID member of the System Information structure in the SMBIOS information. For macOS devices, it is the Hardware UUID (also known as IOPlatformUUID in the I/O Registry). */
  uuid: z.string().optional(),
  /** The device manufacturer. */
  vendor_name: z.string().optional(),
});

export const DeviceHwInfo = DeviceHwInfoSchema;
