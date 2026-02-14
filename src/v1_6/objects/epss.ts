import { z } from 'zod';

/**
 * The Exploit Prediction Scoring System (EPSS) object describes the estimated probability a vulnerability will be exploited. EPSS is a community-driven effort to combine descriptive information about vulnerabilities (CVEs) with evidence of actual exploitation in-the-wild. (<a target='_blank' href='https://www.first.org/epss/'>EPSS</a>).
 *
 * OCSF Object: EPSS
 */
export interface EpssType {
  /** The timestamp indicating when the EPSS score was calculated. */
  created_time?: number;
  /** The EPSS score's percentile representing relative importance and ranking of the score in the larger EPSS dataset. */
  percentile?: number;
  /** The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days (following score publication). */
  score: string;
  /** The version of the EPSS model used to calculate the score. */
  version?: string;
}

const EpssSchema: z.ZodType<EpssType> = z.strictObject({
  /** The timestamp indicating when the EPSS score was calculated. */
  created_time: z.number().int().optional(),
  /** The EPSS score's percentile representing relative importance and ranking of the score in the larger EPSS dataset. */
  percentile: z.number().optional(),
  /** The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days (following score publication). */
  score: z.string(),
  /** The version of the EPSS model used to calculate the score. */
  version: z.string().optional(),
});

export const Epss = EpssSchema;
