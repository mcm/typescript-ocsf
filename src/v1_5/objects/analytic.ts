import { z } from "zod";

/**
 * The Analytic object contains details about the analytic technique used to analyze and derive insights from the data or information that led to the creation of a finding or conclusion.
 *
 * OCSF Object: Analytic
 */
export interface AnalyticType {
  /** The name of the analytic that generated the finding. */
  name?: string | undefined;
  /** The unique identifier of the analytic that generated the finding. */
  uid?: string | undefined;
  /** The algorithm used by the underlying analytic to generate the finding. */
  algorithm?: string | undefined;
  /** The analytic category. */
  category?: string | undefined;
  /** The description of the analytic that generated the finding. */
  desc?: string | undefined;
  /** Other analytics related to this analytic. */
  related_analytics?: AnalyticType[] | undefined;
  /** The analytic type. */
  type?: string | undefined;
  /** The analytic type ID. */
  type_id: number;
  /** The analytic version. For example: 1.1. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Analytic: z.ZodType<AnalyticType> = z.lazy(() =>
  z
    .object({
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
      related_analytics: z.array(z.lazy(() => Analytic)).optional(),
      /** The analytic type. */
      type: z.string().optional(),
      /** The analytic type ID. */
      type_id: z.number().int(),
      /** The analytic version. For example: 1.1. */
      version: z.string().optional(),
    })
    .passthrough(),
) as any;
