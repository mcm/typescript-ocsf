import { z } from 'zod';

import type { EdgeType } from './edge.js';
import type { NodeType } from './node.js';

/**
 * A graph data structure representation with nodes and edges.
 *
 * OCSF Object: Graph
 */
export interface GraphType {
  /** The graph name - a human readable identifier for the graph. */
  name?: string;
  /** Unique identifier of the graph - a unique ID to reference this specific graph. */
  uid?: string;
  /** The graph description - provides additional details about the graph's purpose and contents. */
  desc?: string;
  /** The edges/connections between nodes in the graph - contains the collection of edge objects defining relationships between nodes. */
  edges?: EdgeType[];
  /** Indicates if the graph is directed (true) or undirected (false). */
  is_directed?: boolean;
  /** The nodes/vertices of the graph - contains the collection of node objects that make up the graph. */
  nodes: NodeType[];
  /** The graph query language, normalized to the caption of the query_language_id value. */
  query_language?: string;
  /** The normalized identifier of a graph query language that can be used to interact with the graph. */
  query_language_id?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** The graph type. Typically useful to represent the specific type of graph that is used. */
  type?: string;
}

import { Edge } from './edge.js';
import { Node } from './node.js';

const GraphSchema: z.ZodType<GraphType> = z.strictObject({
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
  query_language_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7)]).optional(),
  /** The graph type. Typically useful to represent the specific type of graph that is used. */
  type: z.string().optional(),
});

export const Graph = GraphSchema;
