import { z } from 'zod';

/**
 * An environment variable.
 *
 * OCSF Object: Environment Variable
 */
export interface EnvironmentVariableType {
  /** The name of the environment variable. */
  name: string;
  /** The value of the environment variable. */
  value: string;
}

const EnvironmentVariableSchema = z.strictObject({
  /** The name of the environment variable. */
  name: z.string(),
  /** The value of the environment variable. */
  value: z.string(),
});

export const EnvironmentVariable = EnvironmentVariableSchema;
