import { z } from "zod";

import { Group, type GroupType } from "./group.js";

/**
 * The database object is used for databases which are typically datastore services that contain an organized collection of structured and unstructured data or a types of data.
 *
 * OCSF Object: Database
 */
export interface DatabaseType {
  /** The database name, ordinarily as assigned by a database administrator. */
  name?: string | undefined;
  /** The unique identifier of the database. */
  uid?: string | undefined;
  /** The time when the database was known to have been created. */
  created_time?: number | undefined;
  /** The description of the database. */
  desc?: string | undefined;
  /** The group names to which the database belongs. */
  groups?: GroupType[] | undefined;
  /** The most recent time when any changes, updates, or modifications were made within the database. */
  modified_time?: number | undefined;
  /** The size of the database in bytes. */
  size?: number | undefined;
  /** The database type. */
  type?: string | undefined;
  /** The normalized identifier of the database type. */
  type_id: number;
  [key: string]: unknown;
}

export const Database: z.ZodType<DatabaseType> = z
  .object({
    /** The database name, ordinarily as assigned by a database administrator. */
    name: z.string().optional(),
    /** The unique identifier of the database. */
    uid: z.string().optional(),
    /** The time when the database was known to have been created. */
    created_time: z.number().int().optional(),
    /** The description of the database. */
    desc: z.string().optional(),
    /** The group names to which the database belongs. */
    groups: z.array(Group).optional(),
    /** The most recent time when any changes, updates, or modifications were made within the database. */
    modified_time: z.number().int().optional(),
    /** The size of the database in bytes. */
    size: z.number().int().optional(),
    /** The database type. */
    type: z.string().optional(),
    /** The normalized identifier of the database type. */
    type_id: z.number().int(),
  })
  .passthrough() as any;
