import { z } from 'zod';

/**
 * Represents a connection or relationship between two nodes in a graph.
 *
 * OCSF Object: Edge
 */
export const Edge: any = z.object({
  /** The human-readable name or label for the edge. */
  name: z.string().optional(),
  /** Unique identifier of the edge. */
  uid: z.string().optional(),
  /** Additional data about the edge such as weight, distance, or custom properties. */
  data: z.record(z.unknown()).optional(),
  /** Indicates whether the edge is (true) or undirected (false). */
  is_directed: z.boolean().optional(),
  /** The type of relationship between nodes (e.g. is-attached-to , depends-on, etc). */
  relation: z.string().optional(),
  /** The unique identifier of the node where the edge originates. */
  source: z.string(),
  /** The unique identifier of the node where the edge terminates. */
  target: z.string(),
}).passthrough();

export type EdgeType = z.infer<typeof Edge>;
