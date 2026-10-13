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
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
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

type TransformationInfoShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  lang: z.ZodOptional<z.ZodString>;
  product: z.ZodOptional<typeof Product>;
  time: z.ZodOptional<z.ZodNumber>;
  url_string: z.ZodOptional<z.ZodString>;
};

const TransformationInfoSchema: z.ZodObject<TransformationInfoShape, z.core.$strict> = z.strictObject({
  /** The name of the transformation or mapping. */
  name: z.string().optional(),
  /** The unique identifier of the mapping or transformation. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
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

/** Value → label mappings for each enum field of TransformationInfo. */
export const TransformationInfoLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
