import { z } from 'zod';

/**
 * The Parameter object provides details regarding a parameter of a a function.
 *
 * OCSF Object: Parameter
 */
export interface ParameterType {
  /** The parameter name. */
  name?: string;
  /** The parameter value after function execution. */
  post_value?: string;
  /** The parameter value before function execution. */
  pre_value?: string;
}

const ParameterSchema = z.strictObject({
  /** The parameter name. */
  name: z.string().optional(),
  /** The parameter value after function execution. */
  post_value: z.string().optional(),
  /** The parameter value before function execution. */
  pre_value: z.string().optional(),
});

export const Parameter = ParameterSchema;

/** Value → label mappings for each enum field of Parameter. */
export const ParameterLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
