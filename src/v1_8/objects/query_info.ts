import { z } from 'zod';

/**
 * The query info object holds information related to data access within a datastore. To access, manipulate, delete, or retrieve data from a datastore, a query must be written using a specific syntax.
 *
 * OCSF Object: Query Information
 */
export interface QueryInfoType {
  /** The query name for a saved or scheduled query. */
  name?: string;
  /** The unique identifier of the query. */
  uid?: string;
  /** The size of the data returned from the query. */
  bytes?: number;
  /** The data returned from the query execution. */
  data?: Record<string, unknown>;
  /** A string representing the query code being run. For example: SELECT * FROM my_table */
  query_string: string;
  /** The time when the query was run. */
  query_time?: number;
}

type QueryInfoShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  bytes: z.ZodOptional<z.ZodNumber>;
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  query_string: z.ZodString;
  query_time: z.ZodOptional<z.ZodNumber>;
};

const QueryInfoSchema: z.ZodObject<QueryInfoShape, z.core.$strict> = z.strictObject({
  /** The query name for a saved or scheduled query. */
  name: z.string().optional(),
  /** The unique identifier of the query. */
  uid: z.string().optional(),
  /** The size of the data returned from the query. */
  bytes: z.number().int().optional(),
  /** The data returned from the query execution. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** A string representing the query code being run. For example: SELECT * FROM my_table */
  query_string: z.string(),
  /** The time when the query was run. */
  query_time: z.number().int().optional(),
});

export const QueryInfo = QueryInfoSchema;

/** Value → label mappings for each enum field of QueryInfo. */
export const QueryInfoLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
