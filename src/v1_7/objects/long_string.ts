import { z } from "zod";

/**
 * This object is a used to capture strings which may be truncated by a security product due to their length.
 *
 * OCSF Object: Long String
 */
export interface LongStringType {
  /** Indicates that value has been truncated. May be omitted if truncation has not occurred. */
  is_truncated?: boolean | undefined;
  /** The size in bytes of the string represented by value before truncation. Should be omitted if truncation has not occurred. */
  untruncated_size?: number | undefined;
  /** The string value, truncated if is_truncated is true. */
  value: string;
  [key: string]: unknown;
}

export const LongString: z.ZodType<LongStringType> = z
  .object({
    /** Indicates that value has been truncated. May be omitted if truncation has not occurred. */
    is_truncated: z.boolean().optional(),
    /** The size in bytes of the string represented by value before truncation. Should be omitted if truncation has not occurred. */
    untruncated_size: z.number().int().optional(),
    /** The string value, truncated if is_truncated is true. */
    value: z.string(),
  })
  .passthrough() as any;
