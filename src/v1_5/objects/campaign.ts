import { z } from "zod";

/**
 * Campaign represent organized efforts by threat actors to achieve malicious objectives over a period, often characterized by shared tactics, techniques, and procedures (TTPs).
 *
 * OCSF Object: Campaign
 */
export interface CampaignType {
  /** The name of a specific campaign associated with a cyber threat. */
  name: string;
  [key: string]: unknown;
}

export const Campaign: z.ZodType<CampaignType> = z
  .object({
    /** The name of a specific campaign associated with a cyber threat. */
    name: z.string(),
  })
  .passthrough() as any;
