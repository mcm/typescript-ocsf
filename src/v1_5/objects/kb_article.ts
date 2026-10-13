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
  uid: string;
}

import { Timespan } from './timespan.js';
import { Os } from './os.js';
import { Product } from './product.js';

type KbArticleShape = {
  avg_timespan: z.ZodOptional<typeof Timespan>;
  bulletin: z.ZodOptional<z.ZodString>;
  classification: z.ZodOptional<z.ZodString>;
  created_time: z.ZodOptional<z.ZodNumber>;
  install_state: z.ZodOptional<z.ZodString>;
  install_state_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  is_superseded: z.ZodOptional<z.ZodBoolean>;
  os: z.ZodOptional<typeof Os>;
  product: z.ZodOptional<typeof Product>;
  severity: z.ZodOptional<z.ZodString>;
  size: z.ZodOptional<z.ZodNumber>;
  src_url: z.ZodOptional<z.ZodString>;
  title: z.ZodOptional<z.ZodString>;
  uid: z.ZodString;
};

const KbArticleSchema: z.ZodObject<KbArticleShape, z.core.$strict> = z.strictObject({
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
  uid: z.string(),
});

export const KbArticle = KbArticleSchema;

/** Value → label mappings for each enum field of KbArticle. */
export const KbArticleLabels: Readonly<Record<"install_state_id", Readonly<Record<number, string>>>> = {
  install_state_id: {
    0: "Unknown",
    1: "Installed",
    2: "Not Installed",
    3: "Installed Pending Reboot",
    99: "Other",
  },
};
