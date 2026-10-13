import { z } from 'zod';

/**
 * Represents a node or a vertex in a graph structure.
 *
 * OCSF Object: Node
 */
export interface NodeType {
  /** Additional data about the node stored as key-value pairs. Can include custom properties specific to the node. */
  data?: Record<string, unknown>;
  /** A human-readable description of the node's purpose or meaning in the graph. */
  desc?: string;
  /** A human-readable name or label for the node. Should be descriptive and unique within the graph context. */
  name?: string;
  /** Categorizes the node into a specific class or type. Useful for grouping and filtering nodes. */
  type?: string;
  /** A unique string or numeric identifier that distinguishes this node from all others in the graph. Must be unique across all nodes. */
  uid: string;
}

type NodeShape = {
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  desc: z.ZodOptional<z.ZodString>;
  name: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  uid: z.ZodString;
};

const NodeSchema: z.ZodObject<NodeShape, z.core.$strict> = z.strictObject({
  /** Additional data about the node stored as key-value pairs. Can include custom properties specific to the node. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** A human-readable description of the node's purpose or meaning in the graph. */
  desc: z.string().optional(),
  /** A human-readable name or label for the node. Should be descriptive and unique within the graph context. */
  name: z.string().optional(),
  /** Categorizes the node into a specific class or type. Useful for grouping and filtering nodes. */
  type: z.string().optional(),
  /** A unique string or numeric identifier that distinguishes this node from all others in the graph. Must be unique across all nodes. */
  uid: z.string(),
});

export const Node = NodeSchema;

/** Value → label mappings for each enum field of Node. */
export const NodeLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
