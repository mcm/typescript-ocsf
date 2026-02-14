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

const SanSchema = z.strictObject({
  /** Name of SAN (e.g. The actual IP Address or domain.) */
  name: z.string(),
  /** Type descriptor of SAN (e.g. IP Address/domain/etc.) */
  type: z.string(),
});

export const San = SanSchema;
