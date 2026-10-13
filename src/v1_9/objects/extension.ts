import { z } from 'zod';

/**
 * The OCSF Schema Extension object provides detailed information about the schema extension used to construct the event. The schema extensions are registered in the <code>extensions.md</code> file.
 *
 * OCSF Object: Schema Extension
 */
export interface ExtensionType {
  /** The schema extension name. For example: dev. */
  name?: string;
  /** The schema extension unique identifier. For example: 999. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The schema extension version. For example: 1.0.0-alpha.2. */
  version: string;
}

type ExtensionShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  version: z.ZodString;
};

const ExtensionSchema: z.ZodObject<ExtensionShape, z.core.$strict> = z.strictObject({
  /** The schema extension name. For example: dev. */
  name: z.string().optional(),
  /** The schema extension unique identifier. For example: 999. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The schema extension version. For example: 1.0.0-alpha.2. */
  version: z.string(),
});

export const Extension = ExtensionSchema;

/** Value → label mappings for each enum field of Extension. */
export const ExtensionLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
