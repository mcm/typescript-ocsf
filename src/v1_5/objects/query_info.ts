import { z } from 'zod';

/**
 * The query info object holds information related to data access within a datastore. To access, manipulate, delete, or retrieve data from a datastore, a query must be written using a specific syntax.
 *
 * OCSF Object: Query Information
 */
export const QueryInfo = z.object({
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
}).passthrough();

export type QueryInfoType = z.infer<typeof QueryInfo>;
