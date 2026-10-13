import { z } from 'zod';

/**
 * Represents a connection or relationship between two nodes in a graph.
 *
 * OCSF Object: Edge
 */
export interface EdgeType {
  /** The human-readable name or label for the edge. */
  name?: string;
  /** Unique identifier of the edge. */
  uid?: string;
  /** Additional data about the edge such as weight, distance, or custom properties. */
  data?: Record<string, unknown>;
  /** Indicates whether the edge is (true) or undirected (false). */
  is_directed?: boolean;
  /** The type of relationship between nodes (e.g. is-attached-to , depends-on, etc). */
  relation?: string;
  /** The unique identifier of the node where the edge originates. */
  source: string;
  /** The unique identifier of the node where the edge terminates. */
  target: string;
}

type EdgeShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  is_directed: z.ZodOptional<z.ZodBoolean>;
  relation: z.ZodOptional<z.ZodString>;
  source: z.ZodString;
  target: z.ZodString;
};

const EdgeSchema: z.ZodObject<EdgeShape, z.core.$strict> = z.strictObject({
  /** The human-readable name or label for the edge. */
  name: z.string().optional(),
  /** Unique identifier of the edge. */
  uid: z.string().optional(),
  /** Additional data about the edge such as weight, distance, or custom properties. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** Indicates whether the edge is (true) or undirected (false). */
  is_directed: z.boolean().optional(),
  /** The type of relationship between nodes (e.g. is-attached-to , depends-on, etc). */
  relation: z.string().optional(),
  /** The unique identifier of the node where the edge originates. */
  source: z.string(),
  /** The unique identifier of the node where the edge terminates. */
  target: z.string(),
});

export const Edge = EdgeSchema;

/** Value → label mappings for each enum field of Edge. */
export const EdgeLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
