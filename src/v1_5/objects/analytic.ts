import { z } from 'zod';

/**
 * The Analytic object contains details about the analytic technique used to analyze and derive insights from the data or information that led to the creation of a finding or conclusion.
 *
 * OCSF Object: Analytic
 */
export interface AnalyticType {
  /** The name of the analytic that generated the finding. */
  name?: string;
  /** The unique identifier of the analytic that generated the finding. */
  uid?: string;
  /** The algorithm used by the underlying analytic to generate the finding. */
  algorithm?: string;
  /** The analytic category. */
  category?: string;
  /** The description of the analytic that generated the finding. */
  desc?: string;
  /** Other analytics related to this analytic. */
  related_analytics?: AnalyticType[];
  /** The analytic type. */
  type?: string;
  /** The analytic type ID. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 99;
  /** The analytic version. For example: 1.1. */
  version?: string;
}

const AnalyticSchema = z.strictObject({
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
  /** The analytic type. */
  type: z.string().optional(),
  /** The analytic type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(99)]),
  /** The analytic version. For example: 1.1. */
  version: z.string().optional(),
});

export const Analytic = AnalyticSchema;

/** Value → label mappings for each enum field of Analytic. */
export const AnalyticLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Rule",
    2: "Behavioral",
    3: "Statistical",
    4: "Learning (ML/DL)",
    5: "Fingerprinting",
    6: "Tagging",
    7: "Keyword Match",
    8: "Regular Expressions",
    9: "Exact Data Match",
    10: "Partial Data Match",
    11: "Indexed Data Match",
    99: "Other",
  },
};
