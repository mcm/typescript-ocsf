import { z } from 'zod';

/**
 * The Uniform Resource Locator (URL) object describes the characteristics of a URL.
 *
 * OCSF Object: Uniform Resource Locator
 */
export interface UrlType {
  /** The Website categorization names, as defined by category_ids enum values. */
  categories?: string[];
  /** The Website categorization identifiers. */
  category_ids?: number[];
  /** The domain portion of the URL. For example: example.com in https://sub.example.com. */
  domain?: string;
  /** The URL host as extracted from the URL. For example: www.example.com from www.example.com/download/trouble. */
  hostname?: string;
  /** The URL path as extracted from the URL. For example: /download/trouble from www.example.com/download/trouble. */
  path?: string;
  /** The URL port. For example: 80. */
  port?: number;
  /** The query portion of the URL. For example: the query portion of the URL http://www.example.com/search?q=bad&sort=date is q=bad&sort=date. */
  query_string?: string;
  /** The context in which a resource was retrieved in a web request. */
  resource_type?: string;
  /** The scheme portion of the URL. For example: http, https, ftp, or sftp. */
  scheme?: string;
  /** The subdomain portion of the URL. For example: sub in https://sub.example.com or sub2.sub1 in https://sub2.sub1.example.com. */
  subdomain?: string;
  /** The URL string. See RFC 1738. For example: http://www.example.com/download/trouble.exe. Note: The URL path should not populate the URL string. */
  url_string?: string;
}

const UrlSchema: z.ZodType<UrlType> = z.strictObject({
  /** The Website categorization names, as defined by category_ids enum values. */
  categories: z.array(z.string()).optional(),
  /** The Website categorization identifiers. */
  category_ids: z.array(z.number().int()).optional(),
  /** The domain portion of the URL. For example: example.com in https://sub.example.com. */
  domain: z.string().optional(),
  /** The URL host as extracted from the URL. For example: www.example.com from www.example.com/download/trouble. */
  hostname: z.string().optional(),
  /** The URL path as extracted from the URL. For example: /download/trouble from www.example.com/download/trouble. */
  path: z.string().optional(),
  /** The URL port. For example: 80. */
  port: z.number().int().optional(),
  /** The query portion of the URL. For example: the query portion of the URL http://www.example.com/search?q=bad&sort=date is q=bad&sort=date. */
  query_string: z.string().optional(),
  /** The context in which a resource was retrieved in a web request. */
  resource_type: z.string().optional(),
  /** The scheme portion of the URL. For example: http, https, ftp, or sftp. */
  scheme: z.string().optional(),
  /** The subdomain portion of the URL. For example: sub in https://sub.example.com or sub2.sub1 in https://sub2.sub1.example.com. */
  subdomain: z.string().optional(),
  /** The URL string. See RFC 1738. For example: http://www.example.com/download/trouble.exe. Note: The URL path should not populate the URL string. */
  url_string: z.string().optional(),
});

export const Url = UrlSchema;
