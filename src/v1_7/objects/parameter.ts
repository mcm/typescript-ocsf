import { z } from "zod";

/**
 * The Parameter object provides details regarding a parameter of a a function.
 *
 * OCSF Object: Parameter
 */
export interface ParameterType {
  /** The parameter name. */
  name?: string | undefined;
  /** The parameter value after function execution. */
  post_value?: string | undefined;
  /** The parameter value before function execution. */
  pre_value?: string | undefined;
  [key: string]: unknown;
}

export const Parameter: z.ZodType<ParameterType> = z
  .object({
    /** The parameter name. */
    name: z.string().optional(),
    /** The parameter value after function execution. */
    post_value: z.string().optional(),
    /** The parameter value before function execution. */
    pre_value: z.string().optional(),
  })
  .passthrough() as any;
