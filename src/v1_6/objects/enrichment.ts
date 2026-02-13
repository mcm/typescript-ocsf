import { z } from 'zod';

import { Reputation } from './reputation.js';

/**
 * The Enrichment object provides inline enrichment data for specific attributes of interest within an event. It serves as a mechanism to enhance or supplement the information associated with the event by adding additional relevant details or context.
 *
 * OCSF Object: Enrichment
 */
export const Enrichment: any = z.object({
  /** The time when the enrichment data was generated. */
  created_time: z.number().int().optional(),
  /** The enrichment data associated with the attribute and value. The meaning of this data depends on the type the enrichment record. */
  data: z.record(z.unknown()),
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
}).passthrough();

export type EnrichmentType = z.infer<typeof Enrichment>;
