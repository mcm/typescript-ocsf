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
  /** Model used for creating embeddings (if applicable). For example: text-embedding-ada-002 or all-MiniLM-L6-v2. */
  embedding_model?: string;
  /** The group names to which the database belongs. */
  groups?: GroupType[];
  /** The most recent time when any changes, updates, or modifications were made within the database. */
  modified_time?: number;
  /** The size of the database in bytes. */
  size?: number;
  /** The database type. */
  type?: string;
  /** The normalized identifier of the database type. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;
}

import { Group } from './group.js';

type DatabaseShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  created_time: z.ZodOptional<z.ZodNumber>;
  desc: z.ZodOptional<z.ZodString>;
  embedding_model: z.ZodOptional<z.ZodString>;
  groups: z.ZodOptional<z.ZodArray<typeof Group>>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  size: z.ZodOptional<z.ZodNumber>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<99>]>;
};

const DatabaseSchema: z.ZodObject<DatabaseShape, z.core.$strict> = z.strictObject({
  /** The database name, ordinarily as assigned by a database administrator. */
  name: z.string().optional(),
  /** The unique identifier of the database. */
  uid: z.string().optional(),
  /** The time when the database was known to have been created. */
  created_time: z.number().int().optional(),
  /** The description of the database. */
  desc: z.string().optional(),
  /** Model used for creating embeddings (if applicable). For example: text-embedding-ada-002 or all-MiniLM-L6-v2. */
  embedding_model: z.string().optional(),
  /** The group names to which the database belongs. */
  groups: z.array(Group).optional(),
  /** The most recent time when any changes, updates, or modifications were made within the database. */
  modified_time: z.number().int().optional(),
  /** The size of the database in bytes. */
  size: z.number().int().optional(),
  /** The database type. */
  type: z.string().optional(),
  /** The normalized identifier of the database type. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(99)]),
});

export const Database = DatabaseSchema;

/** Value → label mappings for each enum field of Database. */
export const DatabaseLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Relational",
    2: "Network",
    3: "Object Oriented",
    4: "Centralized",
    5: "Operational",
    6: "NoSQL",
    7: "Vector",
    8: "Knowledge Graph",
    99: "Other",
  },
};
