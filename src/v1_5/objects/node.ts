import { z } from 'zod';

/**
 * Represents a node or a vertex in a graph structure.
 *
 * OCSF Object: Node
 */
export const Node: any = z.object({
  /** Additional data about the node stored as key-value pairs. Can include custom properties specific to the node. */
  data: z.record(z.unknown()).optional(),
  /** A human-readable description of the node's purpose or meaning in the graph. */
  desc: z.string().optional(),
  /** A human-readable name or label for the node. Should be descriptive and unique within the graph context. */
  name: z.string().optional(),
  /** Categorizes the node into a specific class or type. Useful for grouping and filtering nodes. */
  type: z.string().optional(),
  /** A unique string or numeric identifier that distinguishes this node from all others in the graph. Must be unique across all nodes. */
  uid: z.string(),
}).passthrough();

export type NodeType = z.infer<typeof Node>;
