import { z } from "zod";

import { Organization, type OrganizationType } from "./organization.js";

/**
 * The entity from which an event or finding was reported.
 *
 * OCSF Object: Reporter
 */
export interface ReporterType {
  /** The name of the entity from which the event or finding was reported. */
  name?: string | undefined;
  /** The unique identifier of the entity from which the event or finding was reported. */
  uid?: string | undefined;
  /** The hostname of the entity from which the event or finding was reported. */
  hostname?: string | undefined;
  /** The IP address of the entity from which the event or finding was reported. */
  ip?: string | undefined;
  /** The organization properties of the entity that reported the event or finding. */
  org?: OrganizationType | undefined;
  [key: string]: unknown;
}

export const Reporter: z.ZodType<ReporterType> = z
  .object({
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
  })
  .passthrough() as any;
