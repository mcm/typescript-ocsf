import { z } from 'zod';

/**
 * An environment variable.
 *
 * OCSF Object: Environment Variable
 */
export const EnvironmentVariable = z.object({
  /** The name of the environment variable. */
  name: z.string(),
  /** The value of the environment variable. */
  value: z.string(),
}).passthrough() as any;

export type EnvironmentVariableType = z.infer<typeof EnvironmentVariable>;
