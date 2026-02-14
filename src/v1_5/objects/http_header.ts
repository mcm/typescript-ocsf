import { z } from 'zod';

/**
 * The HTTP Header object represents the headers sent in an HTTP request or response. HTTP headers are key-value pairs that convey additional information about the HTTP message, including details about the content, caching, authentication, encoding, and other aspects of the communication.
 *
 * OCSF Object: HTTP Header
 */
export interface HttpHeaderType {
  /** The name of the HTTP header. */
  name: string;
  /** The value of the HTTP header. */
  value: string;
}

const HttpHeaderSchema = z.strictObject({
  /** The name of the HTTP header. */
  name: z.string(),
  /** The value of the HTTP header. */
  value: z.string(),
});

export const HttpHeader = HttpHeaderSchema;
