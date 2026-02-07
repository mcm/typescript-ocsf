import { z } from "zod";

import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";

/**
 * The Image object provides a description of a specific Virtual Machine (VM) or Container image.
 *
 * OCSF Object: Image
 */
export interface ImageType {
  /** The image name. For example: elixir. */
  name?: string | undefined;
  /** The unique image ID. For example: 77af4d6b9913. */
  uid: string;
  /** The list of labels associated to the image. */
  labels?: string[] | undefined;
  /** The full path to the image file. */
  path?: string | undefined;
  /** The image tag. For example: 1.11-alpine. */
  tag?: string | undefined;
  /** The list of tags; {key:value} pairs associated to the image. */
  tags?: KeyValueObjectType[] | undefined;
  [key: string]: unknown;
}

export const Image: z.ZodType<ImageType> = z
  .object({
    /** The image name. For example: elixir. */
    name: z.string().optional(),
    /** The unique image ID. For example: 77af4d6b9913. */
    uid: z.string(),
    /** The list of labels associated to the image. */
    labels: z.array(z.string()).optional(),
    /** The full path to the image file. */
    path: z.string().optional(),
    /** The image tag. For example: 1.11-alpine. */
    tag: z.string().optional(),
    /** The list of tags; {key:value} pairs associated to the image. */
    tags: z.array(KeyValueObject).optional(),
  })
  .passthrough() as any;
