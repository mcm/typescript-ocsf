import { z } from "zod";

/**
 * The Geo Location object describes a geographical location, usually associated with an IP address.
 *
 * OCSF Object: Geo Location
 */
export interface LocationType {
  /** Expressed as either height above takeoff location or height above ground level (AGL) for a UAS current location. This value is provided in meters and must have a minimum resolution of 1 m. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  aerial_height?: string | undefined;
  /** The name of the city. */
  city?: string | undefined;
  /** The name of the continent. */
  continent?: string | undefined;
  /** A two-element array, containing a longitude/latitude pair. The format conforms with GeoJSON. For example: [-73.983, 40.719]. */
  coordinates?: number[] | undefined;
  /** The ISO 3166-1 Alpha-2 country code.Note: The two letter country code should be capitalized. For example: US or CA. */
  country?: string | undefined;
  /** The description of the geographical location. */
  desc?: string | undefined;
  /** The aircraft distance above or below the ellipsoid as measured along a line that passes through the aircraft and is normal to the surface of the WGS-84 ellipsoid. This value is provided in meters and must have a minimum resolution of 1 m. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  geodetic_altitude?: string | undefined;
  /** Provides quality/containment on geodetic altitude. This is based on ADS-B Geodetic Vertical Accuracy (GVA). Measured in meters. */
  geodetic_vertical_accuracy?: string | undefined;
  /** Geohash of the geo-coordinates (latitude and longitude).Geohashing is a geocoding system used to encode geographic coordinates in decimal degrees, to a single string. */
  geohash?: string | undefined;
  /** Provides quality/containment on horizontal position. This is based on ADS-B NACp. Measured in meters. */
  horizontal_accuracy?: string | undefined;
  /** The indication of whether the location is on premises. */
  is_on_premises?: boolean | undefined;
  /** The name of the Internet Service Provider (ISP). */
  isp?: string | undefined;
  /** The geographical Latitude coordinate represented in Decimal Degrees (DD). For example: 42.361145. */
  lat?: number | undefined;
  /** The geographical Longitude coordinate represented in Decimal Degrees (DD). For example: -71.057083. */
  long?: number | undefined;
  /** The postal code of the location. */
  postal_code?: string | undefined;
  /** The uncorrected barometric pressure altitude (based on reference standard 29.92 inHg, 1013.25 mb) provides a reference for algorithms that utilize 'altitude deltas' between aircraft. This value is provided in meters and must have a minimum resolution of 1 m.. Special Values: Invalid, No Value, or Unknown: -1000 m. */
  pressure_altitude?: string | undefined;
  /** The provider of the geographical location data. */
  provider?: string | undefined;
  /** The alphanumeric code that identifies the principal subdivision (e.g. province or state) of the country. For example, 'CH-VD' for the Canton of Vaud, Switzerland */
  region?: string | undefined;
  [key: string]: unknown;
}

export const Location: z.ZodType<LocationType> = z
  .object({
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
  })
  .passthrough() as any;
