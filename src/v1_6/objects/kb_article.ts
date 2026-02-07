import { z } from "zod";

import { Os, type OsType } from "./os.js";
import { Product, type ProductType } from "./product.js";
import { Timespan, type TimespanType } from "./timespan.js";

/**
 * The KB Article object contains metadata that describes the patch or update.
 *
 * OCSF Object: KB Article
 */
export interface KbArticleType {
  /** The average time to patch. */
  avg_timespan?: TimespanType | undefined;
  /** The kb article bulletin identifier. */
  bulletin?: string | undefined;
  /** The vendors classification of the kb article. */
  classification?: string | undefined;
  /** The date the kb article was released by the vendor. */
  created_time?: number | undefined;
  /** The install state of the kb article. */
  install_state?: string | undefined;
  /** The normalized install state ID of the kb article. */
  install_state_id?: number | undefined;
  /** The kb article has been replaced by another. */
  is_superseded?: boolean | undefined;
  /** The operating system the kb article applies. */
  os?: OsType | undefined;
  /** The product details the kb article applies. */
  product?: ProductType | undefined;
  /** The severity of the kb article. */
  severity?: string | undefined;
  /** The size in bytes for the kb article. */
  size?: number | undefined;
  /** The kb article link from the source vendor. */
  src_url?: string | undefined;
  /** The title of the kb article. */
  title?: string | undefined;
  /** The unique identifier for the kb article. */
  uid?: string | undefined;
  [key: string]: unknown;
}

export const KbArticle: z.ZodType<KbArticleType> = z
  .object({
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
  })
  .passthrough() as any;
