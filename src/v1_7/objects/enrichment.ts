import { z } from 'zod';

import type { ReputationType } from './reputation.js';

/**
 * The Enrichment object provides inline enrichment data for specific attributes of interest within an event. It serves as a mechanism to enhance or supplement the information associated with the event by adding additional relevant details or context.
 *
 * OCSF Object: Enrichment
 */
export interface EnrichmentType {
  /** The time when the enrichment data was generated. */
  created_time?: number;
  /** The enrichment data associated with the attribute and value. The meaning of this data depends on the type the enrichment record. */
  data: Record<string, unknown>;
  /** A long description of the enrichment data. */
  desc?: string;
  /** The name of the attribute to which the enriched data pertains. */
  name: string;
  /** The enrichment data provider name. */
  provider?: string;
  /** The reputation of the enrichment data. */
  reputation?: ReputationType;
  /** A short description of the enrichment data. */
  short_desc?: string;
  /** The URL of the source of the enrichment data. */
  src_url?: string;
  /** The enrichment type. For example: location. */
  type?: string;
  /** The value of the attribute to which the enriched data pertains. */
  value: string;
}

import { Reputation } from './reputation.js';

const EnrichmentSchema: z.ZodType<EnrichmentType> = z.strictObject({
  /** The time when the enrichment data was generated. */
  created_time: z.number().int().optional(),
  /** The enrichment data associated with the attribute and value. The meaning of this data depends on the type the enrichment record. */
  data: z.record(z.string(), z.unknown()),
  /** A long description of the enrichment data. */
  desc: z.string().optional(),
  /** The name of the attribute to which the enriched data pertains. */
  name: z.string(),
  /** The enrichment data provider name. */
  provider: z.string().optional(),
  /** The reputation of the enrichment data. */
  reputation: Reputation.optional(),
  /** A short description of the enrichment data. */
  short_desc: z.string().optional(),
  /** The URL of the source of the enrichment data. */
  src_url: z.string().optional(),
  /** The enrichment type. For example: location. */
  type: z.string().optional(),
  /** The value of the attribute to which the enriched data pertains. */
  value: z.string(),
});

export const Enrichment = EnrichmentSchema;
