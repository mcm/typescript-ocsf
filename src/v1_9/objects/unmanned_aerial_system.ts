import { z } from 'zod';

import type { LocationType } from './location.js';
import type { DeviceHwInfoType } from './device_hw_info.js';

/**
 * The Unmanned Aerial System object describes the characteristics, Position Location Information (PLI), and other metadata of Unmanned Aerial Systems (UAS) and other unmanned and drone systems used in Remote ID. Remote ID is defined in the Standard Specification for Remote ID and Tracking (ASTM Designation: F3411-22a).
 *
 * OCSF Object: Unmanned Aerial System
 */
export interface UnmannedAerialSystemType {
  /** The name of the unmanned system as reported by tracking or sensing hardware. */
  name?: string;
  /** The primary identification identifier for an unmanned system. This can be a Serial Number (in CTA-2063-A format, the Registration ID (provided by the CAA, a UTM, or a unique Session ID. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The detailed geographical location usually associated with an IP address. */
  location?: LocationType;
  /** The model name of the aircraft or unmanned system. */
  model?: string;
  /** The serial number of the unmanned system. This is expressed in CTA-2063-A format. */
  serial_number?: string;
  /** Ground speed of flight. This value is provided in meters per second with a minimum resolution of 0.25 m/s. Special Values: Invalid, No Value, or Unknown: 255 m/s. */
  speed?: string;
  /** Provides quality/containment on horizontal ground speed. Measured in meters/second. */
  speed_accuracy?: string;
  /** Direction of flight expressed as a “True North-based” ground track angle. This value is provided in clockwise degrees with a minimum resolution of 1 degree. If aircraft is not moving horizontally, use the “Unknown” value */
  track_direction?: string;
  /** A secondary identification identifier for an unmanned system. This can be a Serial Number (in CTA-2063-A format, the Registration ID (provided by the CAA, a UTM, or a unique Session ID. */
  uid_alt?: string;
  /** Vertical speed upward relative to the WGS-84 datum, measured in meters per second. Special Values: Invalid, No Value, or Unknown: 63 m/s. */
  vertical_speed?: string;
  /** The endpoint hardware information. */
  hw_info?: DeviceHwInfoType;
  /** The type of the UAS. For example, Helicopter, Gyroplane, Rocket, etc. */
  type?: string;
  /** The UAS type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 99;
  /** The Unmanned Aircraft System Traffic Management (UTM) provided universal unique ID (UUID) traceable to a non-obfuscated ID where this UTM UUID acts as a 'session id' to protect exposure of operationally sensitive information. */
  uuid?: string;
}

import { Location } from './location.js';
import { DeviceHwInfo } from './device_hw_info.js';

type UnmannedAerialSystemShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  location: z.ZodOptional<typeof Location>;
  model: z.ZodOptional<z.ZodString>;
  serial_number: z.ZodOptional<z.ZodString>;
  speed: z.ZodOptional<z.ZodString>;
  speed_accuracy: z.ZodOptional<z.ZodString>;
  track_direction: z.ZodOptional<z.ZodString>;
  uid_alt: z.ZodOptional<z.ZodString>;
  vertical_speed: z.ZodOptional<z.ZodString>;
  hw_info: z.ZodOptional<typeof DeviceHwInfo>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<99>]>>;
  uuid: z.ZodOptional<z.ZodString>;
};

const UnmannedAerialSystemSchema: z.ZodObject<UnmannedAerialSystemShape, z.core.$strict> = z.strictObject({
  /** The name of the unmanned system as reported by tracking or sensing hardware. */
  name: z.string().optional(),
  /** The primary identification identifier for an unmanned system. This can be a Serial Number (in CTA-2063-A format, the Registration ID (provided by the CAA, a UTM, or a unique Session ID. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The detailed geographical location usually associated with an IP address. */
  location: Location.optional(),
  /** The model name of the aircraft or unmanned system. */
  model: z.string().optional(),
  /** The serial number of the unmanned system. This is expressed in CTA-2063-A format. */
  serial_number: z.string().optional(),
  /** Ground speed of flight. This value is provided in meters per second with a minimum resolution of 0.25 m/s. Special Values: Invalid, No Value, or Unknown: 255 m/s. */
  speed: z.string().optional(),
  /** Provides quality/containment on horizontal ground speed. Measured in meters/second. */
  speed_accuracy: z.string().optional(),
  /** Direction of flight expressed as a “True North-based” ground track angle. This value is provided in clockwise degrees with a minimum resolution of 1 degree. If aircraft is not moving horizontally, use the “Unknown” value */
  track_direction: z.string().optional(),
  /** A secondary identification identifier for an unmanned system. This can be a Serial Number (in CTA-2063-A format, the Registration ID (provided by the CAA, a UTM, or a unique Session ID. */
  uid_alt: z.string().optional(),
  /** Vertical speed upward relative to the WGS-84 datum, measured in meters per second. Special Values: Invalid, No Value, or Unknown: 63 m/s. */
  vertical_speed: z.string().optional(),
  /** The endpoint hardware information. */
  hw_info: DeviceHwInfo.optional(),
  /** The type of the UAS. For example, Helicopter, Gyroplane, Rocket, etc. */
  type: z.string().optional(),
  /** The UAS type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(99)]).optional(),
  /** The Unmanned Aircraft System Traffic Management (UTM) provided universal unique ID (UUID) traceable to a non-obfuscated ID where this UTM UUID acts as a 'session id' to protect exposure of operationally sensitive information. */
  uuid: z.string().optional(),
});

export const UnmannedAerialSystem = UnmannedAerialSystemSchema;

/** Value → label mappings for each enum field of UnmannedAerialSystem. */
export const UnmannedAerialSystemLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown/Undeclared",
    1: "Airplane",
    2: "Helicopter",
    3: "Gyroplane",
    4: "Hybrid Lift",
    5: "Ornithopter",
    6: "Glider",
    7: "Kite",
    8: "Free Balloon",
    9: "Captive Balloon",
    10: "Airship",
    11: "Free Fall/Parachute",
    12: "Rocket",
    13: "Tethered Powered Aircraft",
    14: "Ground Obstacle",
    99: "Other",
  },
};
