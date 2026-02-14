import { z } from 'zod';

import type { ProductType } from './product.js';

/**
 * The transformation_info object represents the mapping or transformation used.
 *
 * OCSF Object: Transformation Info
 */
export interface TransformationInfoType {
  /** The name of the transformation or mapping. */
  name?: string;
  /** The unique identifier of the mapping or transformation. */
  uid?: string;
  /** The transformation language used to transform the data. */
  lang?: string;
  /** The product or instance used to make the transformation */
  product?: ProductType;
  /** Time of the transformation. */
  time?: number;
  /** The Uniform Resource Locator String where the mapping or transformation exists. */
  url_string?: string;
}

import { Product } from './product.js';

const TransformationInfoSchema = z.strictObject({
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
});

export const TransformationInfo = TransformationInfoSchema;
