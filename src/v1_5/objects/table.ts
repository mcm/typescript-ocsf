import { z } from 'zod';

import type { GroupType } from './group.js';

/**
 * The table object represents a table within a structured relational database or datastore, which contains columns and rows of data that are able to be create, updated, deleted and queried.
 *
 * OCSF Object: Table
 */
export interface TableType {
  /** The table name, ordinarily as assigned by a database administrator. */
  name?: string;
  /** The unique identifier of the table. */
  uid?: string;
  /** The time when the table was known to have been created. */
  created_time?: number;
  /** The description of the table. */
  desc?: string;
  /** The group names to which the table belongs. */
  groups?: GroupType[];
  /** The most recent time when any changes, updates, or modifications were made within the table. */
  modified_time?: number;
  /** The size of the data table in bytes. */
  size?: number;
}

import { Group } from './group.js';

type TableShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  created_time: z.ZodOptional<z.ZodNumber>;
  desc: z.ZodOptional<z.ZodString>;
  groups: z.ZodOptional<z.ZodArray<typeof Group>>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  size: z.ZodOptional<z.ZodNumber>;
};

const TableSchema: z.ZodObject<TableShape, z.core.$strict> = z.strictObject({
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

export const Table = TableSchema;

/** Value → label mappings for each enum field of Table. */
export const TableLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
