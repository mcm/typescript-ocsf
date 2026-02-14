import { z } from 'zod';

import type { LocationType } from './location.js';

/**
 * The Unmanned System Operating Area object describes details about a precise area of operations for a UAS flight or mission.
 *
 * OCSF Object: Unmanned System Operating Area
 */
export interface UnmannedSystemOperatingAreaType {
  /** Expressed as either height above takeoff location or height above ground level (AGL) for a UAS current location. This value is provided in meters and must have a minimum resolution of 1 m. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  aerial_height?: string;
  /** The name of the city. */
  city?: string;
  /** The name of the continent. */
  continent?: string;
  /** A two-element array, containing a longitude/latitude pair. The format conforms with GeoJSON. For example: [-73.983, 40.719]. */
  coordinates?: number[];
  /** The ISO 3166-1 Alpha-2 country code.Note: The two letter country code should be capitalized. For example: US or CA. */
  country?: string;
  /** The description of the geographical location. */
  desc?: string;
  /** The aircraft distance above or below the ellipsoid as measured along a line that passes through the aircraft and is normal to the surface of the WGS-84 ellipsoid. This value is provided in meters and must have a minimum resolution of 1 m. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  geodetic_altitude?: string;
  /** Provides quality/containment on geodetic altitude. This is based on ADS-B Geodetic Vertical Accuracy (GVA). Measured in meters. */
  geodetic_vertical_accuracy?: string;
  /** Geohash of the geo-coordinates (latitude and longitude).Geohashing is a geocoding system used to encode geographic coordinates in decimal degrees, to a single string. */
  geohash?: string;
  /** Provides quality/containment on horizontal position. This is based on ADS-B NACp. Measured in meters. */
  horizontal_accuracy?: string;
  /** The indication of whether the location is on premises. */
  is_on_premises?: boolean;
  /** The name of the Internet Service Provider (ISP). */
  isp?: string;
  /** The geographical Latitude coordinate represented in Decimal Degrees (DD). For example: 42.361145. */
  lat?: number;
  /** The geographical Longitude coordinate represented in Decimal Degrees (DD). For example: -71.057083. */
  long?: number;
  /** The postal code of the location. */
  postal_code?: string;
  /** The uncorrected barometric pressure altitude (based on reference standard 29.92 inHg, 1013.25 mb) provides a reference for algorithms that utilize 'altitude deltas' between aircraft. This value is provided in meters and must have a minimum resolution of 1 m.. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  pressure_altitude?: string;
  /** The provider of the geographical location data. */
  provider?: string;
  /** The alphanumeric code that identifies the principal subdivision (e.g. province or state) of the country. For example, 'CH-VD' for the Canton of Vaud, Switzerland */
  region?: string;
  /** Maximum altitude (WGS-84 HAE) for a group or an Intent-Based Network Participant. Measured in meters. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  altitude_ceiling?: string;
  /** Minimum altitude (WGS-84 HAE) for a group or an Intent-Based Network Participant. Measured in meters. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  altitude_floor?: string;
  /** Indicates the number of UAS in the operating area. */
  count?: number;
  /** The date and time at which a group or an Intent-Based Network Participant operation ends. (This field is only applicable to Network Remote ID.) */
  end_time?: number;
  /** A list of Position Location Information (PLI) (latitude/longitude pairs) defining the area where a group or Intent-Based Network Participant operation is taking place. (This field is only applicable to Network Remote ID.) */
  locations?: LocationType[];
  /** Farthest horizontal distance from the reported location at which any UA in a group may be located (meters). Also allows defining the area where an Intent-Based Network Participant operation is taking place. Default: 0 m. */
  radius?: string;
  /** The date and time at which a group or an Intent-Based Network Participant operation starts. (This field is only applicable to Network Remote ID.) */
  start_time?: number;
  /** The type of operating area. For example, Takeoff Location, Fixed Location, Dynamic Location. */
  type?: string;
  /** The operating area type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 99;
}

import { Location } from './location.js';

const UnmannedSystemOperatingAreaSchema: z.ZodType<UnmannedSystemOperatingAreaType> = z.strictObject({
  /** Expressed as either height above takeoff location or height above ground level (AGL) for a UAS current location. This value is provided in meters and must have a minimum resolution of 1 m. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  aerial_height: z.string().optional(),
  /** The name of the city. */
  city: z.string().optional(),
  /** The name of the continent. */
  continent: z.string().optional(),
  /** A two-element array, containing a longitude/latitude pair. The format conforms with GeoJSON. For example: [-73.983, 40.719]. */
  coordinates: z.array(z.number()).optional(),
  /** The ISO 3166-1 Alpha-2 country code.Note: The two letter country code should be capitalized. For example: US or CA. */
  country: z.string().optional(),
  /** The description of the geographical location. */
  desc: z.string().optional(),
  /** The aircraft distance above or below the ellipsoid as measured along a line that passes through the aircraft and is normal to the surface of the WGS-84 ellipsoid. This value is provided in meters and must have a minimum resolution of 1 m. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  geodetic_altitude: z.string().optional(),
  /** Provides quality/containment on geodetic altitude. This is based on ADS-B Geodetic Vertical Accuracy (GVA). Measured in meters. */
  geodetic_vertical_accuracy: z.string().optional(),
  /** Geohash of the geo-coordinates (latitude and longitude).Geohashing is a geocoding system used to encode geographic coordinates in decimal degrees, to a single string. */
  geohash: z.string().optional(),
  /** Provides quality/containment on horizontal position. This is based on ADS-B NACp. Measured in meters. */
  horizontal_accuracy: z.string().optional(),
  /** The indication of whether the location is on premises. */
  is_on_premises: z.boolean().optional(),
  /** The name of the Internet Service Provider (ISP). */
  isp: z.string().optional(),
  /** The geographical Latitude coordinate represented in Decimal Degrees (DD). For example: 42.361145. */
  lat: z.number().optional(),
  /** The geographical Longitude coordinate represented in Decimal Degrees (DD). For example: -71.057083. */
  long: z.number().optional(),
  /** The postal code of the location. */
  postal_code: z.string().optional(),
  /** The uncorrected barometric pressure altitude (based on reference standard 29.92 inHg, 1013.25 mb) provides a reference for algorithms that utilize 'altitude deltas' between aircraft. This value is provided in meters and must have a minimum resolution of 1 m.. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  pressure_altitude: z.string().optional(),
  /** The provider of the geographical location data. */
  provider: z.string().optional(),
  /** The alphanumeric code that identifies the principal subdivision (e.g. province or state) of the country. For example, 'CH-VD' for the Canton of Vaud, Switzerland */
  region: z.string().optional(),
  /** Maximum altitude (WGS-84 HAE) for a group or an Intent-Based Network Participant. Measured in meters. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  altitude_ceiling: z.string().optional(),
  /** Minimum altitude (WGS-84 HAE) for a group or an Intent-Based Network Participant. Measured in meters. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  altitude_floor: z.string().optional(),
  /** Indicates the number of UAS in the operating area. */
  count: z.number().int().optional(),
  /** The date and time at which a group or an Intent-Based Network Participant operation ends. (This field is only applicable to Network Remote ID.) */
  end_time: z.number().int().optional(),
  /** A list of Position Location Information (PLI) (latitude/longitude pairs) defining the area where a group or Intent-Based Network Participant operation is taking place. (This field is only applicable to Network Remote ID.) */
  locations: z.array(Location).optional(),
  /** Farthest horizontal distance from the reported location at which any UA in a group may be located (meters). Also allows defining the area where an Intent-Based Network Participant operation is taking place. Default: 0 m. */
  radius: z.string().optional(),
  /** The date and time at which a group or an Intent-Based Network Participant operation starts. (This field is only applicable to Network Remote ID.) */
  start_time: z.number().int().optional(),
  /** The type of operating area. For example, Takeoff Location, Fixed Location, Dynamic Location. */
  type: z.string().optional(),
  /** The operating area type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
});

export const UnmannedSystemOperatingArea = UnmannedSystemOperatingAreaSchema;
