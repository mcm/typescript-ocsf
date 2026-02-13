import { z } from 'zod';

import { Organization } from './organization.js';

/**
 * The entity from which an event or finding was reported.
 *
 * OCSF Object: Reporter
 */
export const Reporter: any = z.object({
  /** The name of the entity from which the event or finding was reported. */
  name: z.string().optional(),
  /** The unique identifier of the entity from which the event or finding was reported. */
  uid: z.string().optional(),
  /** The hostname of the entity from which the event or finding was reported. */
  hostname: z.string().optional(),
  /** The IP address of the entity from which the event or finding was reported. */
  ip: z.string().optional(),
  /** The organization properties of the entity that reported the event or finding. */
  org: Organization.optional(),
}).passthrough();

export type ReporterType = z.infer<typeof Reporter>;
