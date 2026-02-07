import { z } from "zod";

import { HttpHeader, type HttpHeaderType } from "./http_header.js";
import { Url, type UrlType } from "./url.js";

/**
 * The HTTP Request object represents the attributes of a request made to a web server. It encapsulates the details and metadata associated with an HTTP request, including the request method, headers, URL, query parameters, body content, and other relevant information.
 *
 * OCSF Object: HTTP Request
 */
export interface HttpRequestType {
  /** The arguments sent along with the HTTP request. */
  args?: string | undefined;
  /** The actual length of the HTTP request body, in number of bytes, independent of a potentially existing Content-Length header. */
  body_length?: number | undefined;
  /** Additional HTTP headers of an HTTP request or response. */
  http_headers?: HttpHeaderType[] | undefined;
  /** The HTTP request method indicates the desired action to be performed for a given resource. */
  http_method?: string | undefined;
  /** The length of the entire HTTP request, in number of bytes. */
  length?: number | undefined;
  /** The request header that identifies the address of the previous web page, which is linked to the current web page or resource being requested. */
  referrer?: string | undefined;
  /** The unique identifier of the http request. */
  uid?: string | undefined;
  /** The URL object that pertains to the request. */
  url?: UrlType | undefined;
  /** The request header that identifies the operating system and web browser. */
  user_agent?: string | undefined;
  /** The Hypertext Transfer Protocol (HTTP) version. */
  version?: string | undefined;
  /** The X-Forwarded-For header identifying the originating IP address(es) of a client connecting to a web server through an HTTP proxy or a load balancer. */
  x_forwarded_for?: string[] | undefined;
  [key: string]: unknown;
}

export const HttpRequest: z.ZodType<HttpRequestType> = z
  .object({
    /** The arguments sent along with the HTTP request. */
    args: z.string().optional(),
    /** The actual length of the HTTP request body, in number of bytes, independent of a potentially existing Content-Length header. */
    body_length: z.number().int().optional(),
    /** Additional HTTP headers of an HTTP request or response. */
    http_headers: z.array(HttpHeader).optional(),
    /** The HTTP request method indicates the desired action to be performed for a given resource. */
    http_method: z.string().optional(),
    /** The length of the entire HTTP request, in number of bytes. */
    length: z.number().int().optional(),
    /** The request header that identifies the address of the previous web page, which is linked to the current web page or resource being requested. */
    referrer: z.string().optional(),
    /** The unique identifier of the http request. */
    uid: z.string().optional(),
    /** The URL object that pertains to the request. */
    url: Url.optional(),
    /** The request header that identifies the operating system and web browser. */
    user_agent: z.string().optional(),
    /** The Hypertext Transfer Protocol (HTTP) version. */
    version: z.string().optional(),
    /** The X-Forwarded-For header identifying the originating IP address(es) of a client connecting to a web server through an HTTP proxy or a load balancer. */
    x_forwarded_for: z.array(z.string()).optional(),
  })
  .passthrough() as any;
