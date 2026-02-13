import { z } from 'zod';

import { Feature } from './feature.js';

/**
 * The Product object describes characteristics of a software product.
 *
 * OCSF Object: Product
 */
export const Product = z.strictObject({
  /** The name of the product. */
  name: z.string().optional(),
  /** The unique identifier of the product. */
  uid: z.string().optional(),
  /** The Common Platform Enumeration (CPE) name as described by (NIST) For example: cpe:/a:apple:safari:16.2. */
  cpe_name: z.string().optional(),
  /** The feature that reported the event. */
  feature: Feature.optional(),
  /** The two letter lower case language codes, as defined by ISO 639-1. For example: en (English), de (German), or fr (French). */
  lang: z.string().optional(),
  /** The installation path of the product. */
  path: z.string().optional(),
  /** The URL pointing towards the product. */
  url_string: z.string().optional(),
  /** The name of the vendor of the product. */
  vendor_name: z.string().optional(),
  /** The version of the product, as defined by the event source. For example: 2013.1.3-beta. */
  version: z.string().optional(),
});

export type ProductType = z.infer<typeof Product>;
