import { z } from "zod";

/**
 * Create a base Zod object schema with OCSF-standard configuration.
 *
 * All OCSF schemas use `.passthrough()` to preserve unmapped/extra fields,
 * per the OCSF specification's forward-compatibility design.
 *
 * @param shape - The Zod raw shape (field definitions)
 * @returns A Zod object schema with passthrough enabled
 */
export function createOcsfObjectSchema<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape).passthrough();
}
