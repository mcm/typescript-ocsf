import { z } from 'zod';

import type { TimespanType } from './timespan.js';
import type { OsType } from './os.js';
import type { ProductType } from './product.js';

/**
 * The KB Article object contains metadata that describes the patch or update.
 *
 * OCSF Object: KB Article
 */
export interface KbArticleType {
  /** The average time to patch. */
  avg_timespan?: TimespanType;
  /** The kb article bulletin identifier. */
  bulletin?: string;
  /** The vendors classification of the kb article. */
  classification?: string;
  /** The date the kb article was released by the vendor. */
  created_time?: number;
  /** The install state of the kb article. */
  install_state?: string;
  /** The normalized install state ID of the kb article. */
  install_state_id?: 0 | 1 | 2 | 3 | 99;
  /** The kb article has been replaced by another. */
  is_superseded?: boolean;
  /** The operating system the kb article applies. */
  os?: OsType;
  /** The product details the kb article applies. */
  product?: ProductType;
  /** The severity of the kb article. */
  severity?: string;
  /** The size in bytes for the kb article. */
  size?: number;
  /** The kb article link from the source vendor. */
  src_url?: string;
  /** The title of the kb article. */
  title?: string;
  /** The unique identifier for the kb article. */
  uid?: string;
}

import { Timespan } from './timespan.js';
import { Os } from './os.js';
import { Product } from './product.js';

const KbArticleSchema = z.strictObject({
  /** The average time to patch. */
  avg_timespan: Timespan.optional(),
  /** The kb article bulletin identifier. */
  bulletin: z.string().optional(),
  /** The vendors classification of the kb article. */
  classification: z.string().optional(),
  /** The date the kb article was released by the vendor. */
  created_time: z.number().int().optional(),
  /** The install state of the kb article. */
  install_state: z.string().optional(),
  /** The normalized install state ID of the kb article. */
  install_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The kb article has been replaced by another. */
  is_superseded: z.boolean().optional(),
  /** The operating system the kb article applies. */
  os: Os.optional(),
  /** The product details the kb article applies. */
  product: Product.optional(),
  /** The severity of the kb article. */
  severity: z.string().optional(),
  /** The size in bytes for the kb article. */
  size: z.number().int().optional(),
  /** The kb article link from the source vendor. */
  src_url: z.string().optional(),
  /** The title of the kb article. */
  title: z.string().optional(),
  /** The unique identifier for the kb article. */
  uid: z.string().optional(),
});

export const KbArticle = KbArticleSchema;
