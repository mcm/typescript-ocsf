import { z } from 'zod';

import { Timespan } from './timespan.js';
import { Os } from './os.js';
import { Product } from './product.js';

/**
 * The KB Article object contains metadata that describes the patch or update.
 *
 * OCSF Object: KB Article
 */
export const KbArticle = z.strictObject({
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
  install_state_id: z.number().int().optional(),
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

export type KbArticleType = z.infer<typeof KbArticle>;
