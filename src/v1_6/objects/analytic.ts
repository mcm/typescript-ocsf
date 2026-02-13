import { z } from 'zod';

/**
 * The Analytic object contains details about the analytic technique used to analyze and derive insights from the data or information that led to the creation of a finding or conclusion.
 *
 * OCSF Object: Analytic
 */
export const Analytic = z.strictObject({
  /** The name of the analytic that generated the finding. */
  name: z.string().optional(),
  /** The unique identifier of the analytic that generated the finding. */
  uid: z.string().optional(),
  /** The algorithm used by the underlying analytic to generate the finding. */
  algorithm: z.string().optional(),
  /** The analytic category. */
  category: z.string().optional(),
  /** The description of the analytic that generated the finding. */
  desc: z.string().optional(),
  /** Other analytics related to this analytic. */
  get related_analytics() { return z.lazy(() => z.array(Analytic)).optional(); },
  /** The Analytic state. */
  state: z.string().optional(),
  /** The Analytic state identifier. */
  state_id: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  /** The analytic type. */
  type: z.string().optional(),
  /** The analytic type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(99)]),
  /** The analytic version. For example: 1.1. */
  version: z.string().optional(),
});

export type AnalyticType = z.infer<typeof Analytic>;
