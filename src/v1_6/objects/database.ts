import { z } from 'zod';

import type { GroupType } from './group.js';

/**
 * The database object is used for databases which are typically datastore services that contain an organized collection of structured and unstructured data or a types of data.
 *
 * OCSF Object: Database
 */
export interface DatabaseType {
  /** The database name, ordinarily as assigned by a database administrator. */
  name?: string;
  /** The unique identifier of the database. */
  uid?: string;
  /** The time when the database was known to have been created. */
  created_time?: number;
  /** The description of the database. */
  desc?: string;
  /** The group names to which the database belongs. */
  groups?: GroupType[];
  /** The most recent time when any changes, updates, or modifications were made within the database. */
  modified_time?: number;
  /** The size of the database in bytes. */
  size?: number;
  /** The database type. */
  type?: string;
  /** The normalized identifier of the database type. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
}

import { Group } from './group.js';

const DatabaseSchema: z.ZodType<DatabaseType> = z.strictObject({
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
});

export const Database = DatabaseSchema;
