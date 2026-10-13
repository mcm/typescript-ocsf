import { z } from 'zod';

import type { NetworkEndpointType } from './network_endpoint.js';

/**
 * The Download Info object contains metadata pertaining to a downloaded file.
 *
 * OCSF Object: Download Info
 */
export interface DownloadInfoType {
  /** The URL that referred to src_url. This is typically the URL of a web page containing a download link. */
  referrer?: string;
  /** Information about the network endpoint from which the file was downloaded. */
  src_endpoint?: NetworkEndpointType;
  /** The URL from which the file was downloaded. */
  src_url?: string;
  /** The download type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The download type ID. The values correspond to the five permitted values of the ZoneId property in the Mark of the Web metadata of a downloaded file on Windows. Note however that each numeric value is 1 greater than its ZoneId equivalent. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 99;
}

import { NetworkEndpoint } from './network_endpoint.js';

type DownloadInfoShape = {
  referrer: z.ZodOptional<z.ZodString>;
  src_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  src_url: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<99>]>>;
};

const DownloadInfoSchema: z.ZodObject<DownloadInfoShape, z.core.$strict> = z.strictObject({
  /** The URL that referred to src_url. This is typically the URL of a web page containing a download link. */
  referrer: z.string().optional(),
  /** Information about the network endpoint from which the file was downloaded. */
  src_endpoint: NetworkEndpoint.optional(),
  /** The URL from which the file was downloaded. */
  src_url: z.string().optional(),
  /** The download type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The download type ID. The values correspond to the five permitted values of the ZoneId property in the Mark of the Web metadata of a downloaded file on Windows. Note however that each numeric value is 1 greater than its ZoneId equivalent. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]).optional(),
});

export const DownloadInfo = DownloadInfoSchema;

/** Value → label mappings for each enum field of DownloadInfo. */
export const DownloadInfoLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Local Machine",
    2: "Intranet",
    3: "Trusted",
    4: "Internet",
    5: "Untrusted",
    99: "Other",
  },
};
