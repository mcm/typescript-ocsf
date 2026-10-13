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

/** Value → label mappings for each enum field of TlsExtension. */
export const TlsExtensionLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "server_name",
    1: "maximum_fragment_length",
    5: "status_request",
    10: "supported_groups",
    13: "signature_algorithms",
    14: "use_srtp",
    15: "heartbeat",
    16: "application_layer_protocol_negotiation",
    18: "signed_certificate_timestamp",
    19: "client_certificate_type",
    20: "server_certificate_type",
    21: "padding",
    41: "pre_shared_key",
    42: "early_data",
    43: "supported_versions",
    44: "cookie",
    45: "psk_key_exchange_modes",
    47: "certificate_authorities",
    48: "oid_filters",
    49: "post_handshake_auth",
    50: "signature_algorithms_cert",
    51: "key_share",
  },
};
