import { z } from "zod";

/**
 * The TLS Extension object describes additional attributes that extend the base Transport Layer Security (TLS) object.
 *
 * OCSF Object: TLS Extension
 */
export interface TlsExtensionType {
  /** The data contains information specific to the particular extension type. */
  data?: Record<string, unknown> | undefined;
  /** The TLS extension type. For example: Server Name. */
  type?: string | undefined;
  /** The TLS extension type identifier. See The Transport Layer Security (TLS) extension page. */
  type_id: number;
  [key: string]: unknown;
}

export const TlsExtension: z.ZodType<TlsExtensionType> = z
  .object({
    /** The data contains information specific to the particular extension type. */
    data: z.record(z.unknown()).optional(),
    /** The TLS extension type. For example: Server Name. */
    type: z.string().optional(),
    /** The TLS extension type identifier. See The Transport Layer Security (TLS) extension page. */
    type_id: z.number().int(),
  })
  .passthrough() as any;
