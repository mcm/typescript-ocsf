import { z } from 'zod';

import { Group } from './group.js';

/**
 * The database object is used for databases which are typically datastore services that contain an organized collection of structured and unstructured data or a types of data.
 *
 * OCSF Object: Database
 */
export const Database = z.strictObject({
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
});

export type DatabaseType = z.infer<typeof Database>;
