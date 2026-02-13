import { z } from 'zod';

/**
 * The Subject Alternative name (SAN) object describes a SAN secured by a digital certificate
 *
 * OCSF Object: Subject Alternative Name
 */
export const San = z.object({
  /** Name of SAN (e.g. The actual IP Address or domain.) */
  name: z.string(),
  /** Type descriptor of SAN (e.g. IP Address/domain/etc.) */
  type: z.string(),
}).passthrough();

export type SanType = z.infer<typeof San>;
