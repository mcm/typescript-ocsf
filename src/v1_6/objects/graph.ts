import { z } from 'zod';

import { Edge } from './edge.js';
import { Node } from './node.js';

/**
 * A graph data structure representation with nodes and edges.
 *
 * OCSF Object: Graph
 */
export const Graph = z.strictObject({
  /** The graph name - a human readable identifier for the graph. */
  name: z.string().optional(),
  /** Unique identifier of the graph - a unique ID to reference this specific graph. */
  uid: z.string().optional(),
  /** The graph description - provides additional details about the graph's purpose and contents. */
  desc: z.string().optional(),
  /** The edges/connections between nodes in the graph - contains the collection of edge objects defining relationships between nodes. */
  edges: z.array(Edge).optional(),
  /** Indicates if the graph is directed (true) or undirected (false). */
  is_directed: z.boolean().optional(),
  /** The nodes/vertices of the graph - contains the collection of node objects that make up the graph. */
  nodes: z.array(Node),
  /** The graph query language, normalized to the caption of the query_language_id value. */
  query_language: z.string().optional(),
  /** The normalized identifier of a graph query language that can be used to interact with the graph. */
  query_language_id: z.number().int().optional(),
  /** The graph type. Typically useful to represent the specific type of graph that is used. */
  type: z.string().optional(),
});

export type GraphType = z.infer<typeof Graph>;
