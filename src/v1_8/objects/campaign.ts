import { z } from 'zod';

/**
 * Campaign represent organized efforts by threat actors to achieve malicious objectives over a period, often characterized by shared tactics, techniques, and procedures (TTPs).
 *
 * OCSF Object: Campaign
 */
export interface CampaignType {
  /** The name of a specific campaign associated with a cyber threat. */
  name: string;
}

type CampaignShape = {
  name: z.ZodString;
};

const CampaignSchema: z.ZodObject<CampaignShape, z.core.$strict> = z.strictObject({
  /** The name of a specific campaign associated with a cyber threat. */
  name: z.string(),
});

export const Campaign = CampaignSchema;

/** Value → label mappings for each enum field of Campaign. */
export const CampaignLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
