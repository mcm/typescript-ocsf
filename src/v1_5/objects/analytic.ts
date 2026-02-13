import { z } from 'zod';

/**
 * The Analytic object contains details about the analytic technique used to analyze and derive insights from the data or information that led to the creation of a finding or conclusion.
 *
 * OCSF Object: Analytic
 */
export const Analytic: any = z.object({
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
  get related_analytics(): any { return z.array(Analytic).optional(); },
  /** The analytic type. */
  type: z.string().optional(),
  /** The analytic type ID. */
  type_id: z.number().int(),
  /** The analytic version. For example: 1.1. */
  version: z.string().optional(),
}).passthrough();

export type AnalyticType = z.infer<typeof Analytic>;
