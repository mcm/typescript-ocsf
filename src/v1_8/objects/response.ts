import { z } from 'zod';

import type { ContainerType } from './container.js';

/**
 * The Response Elements object describes characteristics of an API response.
 *
 * OCSF Object: Response Elements
 */
export interface ResponseType {
  /** The numeric response sent to a request. */
  code?: number;
  /** When working with containerized applications, the set of containers which write to the standard the output of a particular logging driver. For example, this may be the set of containers involved in handling api requests and responses for a containerized application. */
  containers?: ContainerType[];
  /** The additional data that is associated with the api response. */
  data?: Record<string, unknown>;
  /** Error Code */
  error?: string;
  /** Error Message */
  error_message?: string;
  /** The communication flags that are associated with the api response. */
  flags?: string[];
  /** The description of the event/finding, as defined by the source. */
  message?: string;
}

import { Container } from './container.js';

type ResponseShape = {
  code: z.ZodOptional<z.ZodNumber>;
  containers: z.ZodOptional<z.ZodArray<typeof Container>>;
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  error: z.ZodOptional<z.ZodString>;
  error_message: z.ZodOptional<z.ZodString>;
  flags: z.ZodOptional<z.ZodArray<z.ZodString>>;
  message: z.ZodOptional<z.ZodString>;
};

const ResponseSchema: z.ZodObject<ResponseShape, z.core.$strict> = z.strictObject({
  /** The numeric response sent to a request. */
  code: z.number().int().optional(),
  /** When working with containerized applications, the set of containers which write to the standard the output of a particular logging driver. For example, this may be the set of containers involved in handling api requests and responses for a containerized application. */
  containers: z.array(Container).optional(),
  /** The additional data that is associated with the api response. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** Error Code */
  error: z.string().optional(),
  /** Error Message */
  error_message: z.string().optional(),
  /** The communication flags that are associated with the api response. */
  flags: z.array(z.string()).optional(),
  /** The description of the event/finding, as defined by the source. */
  message: z.string().optional(),
});

export const Response = ResponseSchema;

/** Value → label mappings for each enum field of Response. */
export const ResponseLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
