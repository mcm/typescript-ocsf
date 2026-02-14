import { z } from 'zod';

/**
 * The TLS Extension object describes additional attributes that extend the base Transport Layer Security (TLS) object.
 *
 * OCSF Object: TLS Extension
 */
export interface TlsExtensionType {
  /** The data contains information specific to the particular extension type. */
  data?: Record<string, unknown>;
  /** The TLS extension type. For example: Server Name. */
  type?: string;
  /** The TLS extension type identifier. See The Transport Layer Security (TLS) extension page. */
  type_id: 0 | 1 | 5 | 10 | 13 | 14 | 15 | 16 | 18 | 19 | 20 | 21 | 41 | 42 | 43 | 44 | 45 | 47 | 48 | 49 | 50 | 51;
}

const TlsExtensionSchema = z.strictObject({
  /** The data contains information specific to the particular extension type. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** The TLS extension type. For example: Server Name. */
  type: z.string().optional(),
  /** The TLS extension type identifier. See The Transport Layer Security (TLS) extension page. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(5), z.literal(10), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(41), z.literal(42), z.literal(43), z.literal(44), z.literal(45), z.literal(47), z.literal(48), z.literal(49), z.literal(50), z.literal(51)]),
});

export const TlsExtension = TlsExtensionSchema;
