import { z } from 'zod';

import { Parameter } from './parameter.js';

/**
 * The Function Invocation object provides details regarding the invocation of a function.
 *
 * OCSF Object: Function Invocation
 */
export const FunctionInvocation = z.object({
  /** The error indication returned from the function. This may differ from the return value (e.g. when errno is used). */
  error: z.string().optional(),
  /** The parameters passed into a function invocation. */
  parameters: z.array(Parameter).optional(),
  /** The value returned from a function. */
  return_value: z.string().optional(),
}).passthrough();

export type FunctionInvocationType = z.infer<typeof FunctionInvocation>;
