import { z } from 'zod';

import { Location } from './location.js';

/**
 * The Aircraft object represents any aircraft or otherwise airborne asset such as an unmanned system, airplane, balloon, spacecraft, or otherwise. The Aircraft object is intended to normalized data captured or otherwise logged from active radar, passive radar, multi-spectral systems, or the Automatic Dependant Broadcast - Surveillance (ADS-B), and/or Mode S systems.
 *
 * OCSF Object: Aircraft
 */
export const Aircraft = z.object({
  /** The name of the aircraft, such as the such as the flight name or callsign. */
  name: z.string().optional(),
  /** The primary identification identifier for an aircraft, such as the 24-bit International Civil Aviation Organization (ICAO) identifier of the aircraft, as 6 hex digits. */
  uid: z.string().optional(),
  /** The detailed geographical location usually associated with an IP address. */
  location: Location.optional(),
  /** The model name of the aircraft or unmanned system. */
  model: z.string().optional(),
  /** The serial number of the aircraft. */
  serial_number: z.string().optional(),
  /** Ground speed of flight. This value is provided in meters per second with a minimum resolution of 0.25 m/s. Special Values: Invalid, No Value, or Unknown: 255 m/s. */
  speed: z.string().optional(),
  /** Provides quality/containment on horizontal ground speed. Measured in meters/second. */
  speed_accuracy: z.string().optional(),
  /** Direction of flight expressed as a “True North-based” ground track angle. This value is provided in clockwise degrees with a minimum resolution of 1 degree. If aircraft is not moving horizontally, use the “Unknown” value */
  track_direction: z.string().optional(),
  /** A secondary identification identifier for an aircraft, such as the 4-digit squawk (octal representation). */
  uid_alt: z.string().optional(),
  /** Vertical speed upward relative to the WGS-84 datum, measured in meters per second. Special Values: Invalid, No Value, or Unknown: 63 m/s. */
  vertical_speed: z.string().optional(),
}).passthrough();

export type AircraftType = z.infer<typeof Aircraft>;
