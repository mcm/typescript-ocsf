import { z } from 'zod';

import type { ParameterType } from './parameter.js';

/**
 * The Function Invocation object provides details regarding the invocation of a function.
 *
 * OCSF Object: Function Invocation
 */
export interface FunctionInvocationType {
  /** The error indication returned from the function. This may differ from the return value (e.g. when errno is used). */
  error?: string;
  /** The parameters passed into a function invocation. */
  parameters?: ParameterType[];
  /** The value returned from a function. */
  return_value?: string;
}

import { Parameter } from './parameter.js';

const FunctionInvocationSchema = z.strictObject({
  /** The error indication returned from the function. This may differ from the return value (e.g. when errno is used). */
  error: z.string().optional(),
  /** The parameters passed into a function invocation. */
  parameters: z.array(Parameter).optional(),
  /** The value returned from a function. */
  return_value: z.string().optional(),
});

export const FunctionInvocation = FunctionInvocationSchema;
