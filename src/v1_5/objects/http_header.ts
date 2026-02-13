import { z } from 'zod';

/**
 * The HTTP Header object represents the headers sent in an HTTP request or response. HTTP headers are key-value pairs that convey additional information about the HTTP message, including details about the content, caching, authentication, encoding, and other aspects of the communication.
 *
 * OCSF Object: HTTP Header
 */
export const HttpHeader = z.object({
  /** The name of the HTTP header. */
  name: z.string(),
  /** The value of the HTTP header. */
  value: z.string(),
}).passthrough();

export type HttpHeaderType = z.infer<typeof HttpHeader>;
