import { z } from 'zod';

/**
 * The HTTP Cookie object, also known as a web cookie or browser cookie, contains details and values pertaining to a small piece of data that a server sends to a user's web browser. This data is then stored by the browser and sent back to the server with subsequent requests, allowing the server to remember and track certain information about the user's browsing session or preferences.
 *
 * OCSF Object: HTTP Cookie
 */
export const HttpCookie: any = z.object({
  /** The domain name for the server from which the http_cookie is served. */
  domain: z.string().optional(),
  /** The expiration time of the HTTP cookie. */
  expiration_time: z.number().int().optional(),
  /** A cookie attribute to make it inaccessible via JavaScript */
  http_only: z.boolean().optional(),
  /** This attribute prevents the cookie from being accessed via JavaScript. */
  is_http_only: z.boolean().optional(),
  /** The cookie attribute indicates that cookies are sent to the server only when the request is encrypted using the HTTPS protocol. */
  is_secure: z.boolean().optional(),
  /** The HTTP cookie name. */
  name: z.string(),
  /** The path of the HTTP cookie. */
  path: z.string().optional(),
  /** The cookie attribute that lets servers specify whether/when cookies are sent with cross-site requests. Values are: Strict, Lax or None */
  samesite: z.string().optional(),
  /** The cookie attribute to only send cookies to the server with an encrypted request over the HTTPS protocol. */
  secure: z.boolean().optional(),
  /** The HTTP cookie value. */
  value: z.string(),
}).passthrough();

export type HttpCookieType = z.infer<typeof HttpCookie>;
