import { z } from 'zod';

import type { HttpHeaderType } from './http_header.js';

/**
 * The HTTP Response object contains detailed information about the response sent from a web server to the requester. It encompasses attributes and metadata that describe the response status, headers, body content, and other relevant information.
 *
 * OCSF Object: HTTP Response
 */
export interface HttpResponseType {
  /** The actual length of the HTTP response body, in number of bytes, independent of a potentially existing Content-Length header. */
  body_length?: number;
  /** The Hypertext Transfer Protocol (HTTP) status code returned from the web server to the client. For example, 200. */
  code: number;
  /** The request header that identifies the original media type of the resource (prior to any content encoding applied for sending). */
  content_type?: string;
  /** Additional HTTP headers of an HTTP request or response. */
  http_headers?: HttpHeaderType[];
  /** The HTTP response latency measured in milliseconds. */
  latency?: number;
  /** The length of the entire HTTP response, in number of bytes. */
  length?: number;
  /** The description of the event/finding, as defined by the source. */
  message?: string;
  /** The response status. For example: A successful HTTP status of 'OK' which corresponds to a code of 200. */
  status?: string;
}

import { HttpHeader } from './http_header.js';

const HttpResponseSchema = z.strictObject({
  /** The actual length of the HTTP response body, in number of bytes, independent of a potentially existing Content-Length header. */
  body_length: z.number().int().optional(),
  /** The Hypertext Transfer Protocol (HTTP) status code returned from the web server to the client. For example, 200. */
  code: z.number().int(),
  /** The request header that identifies the original media type of the resource (prior to any content encoding applied for sending). */
  content_type: z.string().optional(),
  /** Additional HTTP headers of an HTTP request or response. */
  http_headers: z.array(HttpHeader).optional(),
  /** The HTTP response latency measured in milliseconds. */
  latency: z.number().int().optional(),
  /** The length of the entire HTTP response, in number of bytes. */
  length: z.number().int().optional(),
  /** The description of the event/finding, as defined by the source. */
  message: z.string().optional(),
  /** The response status. For example: A successful HTTP status of 'OK' which corresponds to a code of 200. */
  status: z.string().optional(),
});

export const HttpResponse = HttpResponseSchema;
