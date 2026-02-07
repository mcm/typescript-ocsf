import { z } from "zod";

import { Certificate, type CertificateType } from "./certificate.js";
import { Fingerprint, type FingerprintType } from "./fingerprint.js";
import { San, type SanType } from "./san.js";
import { TlsExtension, type TlsExtensionType } from "./tls_extension.js";

/**
 * The Transport Layer Security (TLS) object describes the negotiated TLS protocol used for secure communications over an establish network connection.
 *
 * OCSF Object: Transport Layer Security (TLS)
 */
export interface TlsType {
  /** The integer value of TLS alert if present. The alerts are defined in the TLS specification in RFC-2246. */
  alert?: number | undefined;
  /** The certificate object containing information about the digital certificate. */
  certificate?: CertificateType | undefined;
  /** The Chain of Certificate Serial Numbers field provides a chain of Certificate Issuer Serial Numbers leading to the Root Certificate Issuer. */
  certificate_chain?: string[] | undefined;
  /** The negotiated cipher suite. */
  cipher?: string | undefined;
  /** The client cipher suites that were exchanged during the TLS handshake negotiation. */
  client_ciphers?: string[] | undefined;
  /** The list of TLS extensions. */
  extension_list?: TlsExtensionType[] | undefined;
  /** The amount of total time for the TLS handshake to complete after the TCP connection is established, including client-side delays, in milliseconds. */
  handshake_dur?: number | undefined;
  /** The MD5 hash of a JA3 string. */
  ja3_hash?: FingerprintType | undefined;
  /** The MD5 hash of a JA3S string. */
  ja3s_hash?: FingerprintType | undefined;
  /** The length of the encryption key. */
  key_length?: number | undefined;
  /** The list of subject alternative names that are secured by a specific certificate. */
  sans?: SanType[] | undefined;
  /** The server cipher suites that were exchanged during the TLS handshake negotiation. */
  server_ciphers?: string[] | undefined;
  /** The Server Name Indication (SNI) extension sent by the client. */
  sni?: string | undefined;
  /** The list of TLS extensions. */
  tls_extension_list?: TlsExtensionType[] | undefined;
  /** The TLS protocol version. */
  version: string;
  [key: string]: unknown;
}

export const Tls: z.ZodType<TlsType> = z
  .object({
    /** The integer value of TLS alert if present. The alerts are defined in the TLS specification in RFC-2246. */
    alert: z.number().int().optional(),
    /** The certificate object containing information about the digital certificate. */
    certificate: Certificate.optional(),
    /** The Chain of Certificate Serial Numbers field provides a chain of Certificate Issuer Serial Numbers leading to the Root Certificate Issuer. */
    certificate_chain: z.array(z.string()).optional(),
    /** The negotiated cipher suite. */
    cipher: z.string().optional(),
    /** The client cipher suites that were exchanged during the TLS handshake negotiation. */
    client_ciphers: z.array(z.string()).optional(),
    /** The list of TLS extensions. */
    extension_list: z.array(TlsExtension).optional(),
    /** The amount of total time for the TLS handshake to complete after the TCP connection is established, including client-side delays, in milliseconds. */
    handshake_dur: z.number().int().optional(),
    /** The MD5 hash of a JA3 string. */
    ja3_hash: Fingerprint.optional(),
    /** The MD5 hash of a JA3S string. */
    ja3s_hash: Fingerprint.optional(),
    /** The length of the encryption key. */
    key_length: z.number().int().optional(),
    /** The list of subject alternative names that are secured by a specific certificate. */
    sans: z.array(San).optional(),
    /** The server cipher suites that were exchanged during the TLS handshake negotiation. */
    server_ciphers: z.array(z.string()).optional(),
    /** The Server Name Indication (SNI) extension sent by the client. */
    sni: z.string().optional(),
    /** The list of TLS extensions. */
    tls_extension_list: z.array(TlsExtension).optional(),
    /** The TLS protocol version. */
    version: z.string(),
  })
  .passthrough() as any;
