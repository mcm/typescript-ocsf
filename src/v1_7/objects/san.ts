import { z } from 'zod';

/**
 * The Subject Alternative name (SAN) object describes a SAN secured by a digital certificate
 *
 * OCSF Object: Subject Alternative Name
 */
export interface SanType {
  /** Name of SAN (e.g. The actual IP Address or domain.) */
  name: string;
  /** Type descriptor of SAN (e.g. IP Address/domain/etc.) */
  type: string;
}

type SanShape = {
  name: z.ZodString;
  type: z.ZodString;
};

const SanSchema: z.ZodObject<SanShape, z.core.$strict> = z.strictObject({
  /** Name of SAN (e.g. The actual IP Address or domain.) */
  name: z.string(),
  /** Type descriptor of SAN (e.g. IP Address/domain/etc.) */
  type: z.string(),
});

export const San = SanSchema;

/** Value → label mappings for each enum field of San. */
export const SanLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
