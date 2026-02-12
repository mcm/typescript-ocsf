import { z } from 'zod';

/**
 * An autonomous system (AS) is a collection of connected Internet Protocol (IP) routing prefixes under the control of one or more network operators on behalf of a single administrative entity or domain that presents a common, clearly defined routing policy to the internet.
 *
 * OCSF Object: Autonomous System
 */
export const AutonomousSystem = z.object({
  /** Organization name for the Autonomous System. */
  name: z.string().optional(),
  /** Unique number that the AS is identified by. */
  number: z.number().int().optional(),
}).passthrough() as any;

export type AutonomousSystemType = z.infer<typeof AutonomousSystem>;
