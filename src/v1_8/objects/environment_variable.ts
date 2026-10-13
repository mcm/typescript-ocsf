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

type EnvironmentVariableShape = {
  name: z.ZodString;
  value: z.ZodString;
};

const EnvironmentVariableSchema: z.ZodObject<EnvironmentVariableShape, z.core.$strict> = z.strictObject({
  /** The name of the environment variable. */
  name: z.string(),
  /** The value of the environment variable. */
  value: z.string(),
});

export const EnvironmentVariable = EnvironmentVariableSchema;

/** Value → label mappings for each enum field of EnvironmentVariable. */
export const EnvironmentVariableLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
