import { z } from 'zod';

import { Group } from './group.js';

/**
 * The table object represents a table within a structured relational database or datastore, which contains columns and rows of data that are able to be create, updated, deleted and queried.
 *
 * OCSF Object: Table
 */
export const Table = z.strictObject({
  /** The table name, ordinarily as assigned by a database administrator. */
  name: z.string().optional(),
  /** The unique identifier of the table. */
  uid: z.string().optional(),
  /** The time when the table was known to have been created. */
  created_time: z.number().int().optional(),
  /** The description of the table. */
  desc: z.string().optional(),
  /** The group names to which the table belongs. */
  groups: z.array(Group).optional(),
  /** The most recent time when any changes, updates, or modifications were made within the table. */
  modified_time: z.number().int().optional(),
  /** The size of the data table in bytes. */
  size: z.number().int().optional(),
});

export type TableType = z.infer<typeof Table>;
