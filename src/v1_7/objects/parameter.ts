import { z } from 'zod';

/**
 * The Parameter object provides details regarding a parameter of a a function.
 *
 * OCSF Object: Parameter
 */
export const Parameter: any = z.object({
  /** The parameter name. */
  name: z.string().optional(),
  /** The parameter value after function execution. */
  post_value: z.string().optional(),
  /** The parameter value before function execution. */
  pre_value: z.string().optional(),
}).passthrough();

export type ParameterType = z.infer<typeof Parameter>;
