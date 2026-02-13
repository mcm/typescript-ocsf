import { z } from 'zod';

/**
 * The TLS Extension object describes additional attributes that extend the base Transport Layer Security (TLS) object.
 *
 * OCSF Object: TLS Extension
 */
export const TlsExtension = z.strictObject({
  /** The data contains information specific to the particular extension type. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** The TLS extension type. For example: Server Name. */
  type: z.string().optional(),
  /** The TLS extension type identifier. See The Transport Layer Security (TLS) extension page. */
  type_id: z.number().int(),
});

export type TlsExtensionType = z.infer<typeof TlsExtension>;
