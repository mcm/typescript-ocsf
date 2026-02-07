import { z } from "zod";

/**
 * Represents a node or a vertex in a graph structure.
 *
 * OCSF Object: Node
 */
export interface NodeType {
  /** Additional data about the node stored as key-value pairs. Can include custom properties specific to the node. */
  data?: Record<string, unknown> | undefined;
  /** A human-readable description of the node's purpose or meaning in the graph. */
  desc?: string | undefined;
  /** A human-readable name or label for the node. Should be descriptive and unique within the graph context. */
  name?: string | undefined;
  /** Categorizes the node into a specific class or type. Useful for grouping and filtering nodes. */
  type?: string | undefined;
  /** A unique string or numeric identifier that distinguishes this node from all others in the graph. Must be unique across all nodes. */
  uid: string;
  [key: string]: unknown;
}

export const Node: z.ZodType<NodeType> = z
  .object({
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
  })
  .passthrough() as any;
