import { z } from "zod";

import { Product, type ProductType } from "./product.js";

/**
 * The transformation_info object represents the mapping or transformation used.
 *
 * OCSF Object: Transformation Info
 */
export interface TransformationInfoType {
  /** The name of the transformation or mapping. */
  name?: string | undefined;
  /** The unique identifier of the mapping or transformation. */
  uid?: string | undefined;
  /** The transformation language used to transform the data. */
  lang?: string | undefined;
  /** The product or instance used to make the transformation */
  product?: ProductType | undefined;
  /** Time of the transformation. */
  time?: number | undefined;
  /** The Uniform Resource Locator String where the mapping or transformation exists. */
  url_string?: string | undefined;
  [key: string]: unknown;
}

export const TransformationInfo: z.ZodType<TransformationInfoType> = z
  .object({
    /** The name of the transformation or mapping. */
    name: z.string().optional(),
    /** The unique identifier of the mapping or transformation. */
    uid: z.string().optional(),
    /** The transformation language used to transform the data. */
    lang: z.string().optional(),
    /** The product or instance used to make the transformation */
    product: Product.optional(),
    /** Time of the transformation. */
    time: z.number().int().optional(),
    /** The Uniform Resource Locator String where the mapping or transformation exists. */
    url_string: z.string().optional(),
  })
  .passthrough() as any;
