import { z } from "zod";

import { Reputation, type ReputationType } from "./reputation.js";

/**
 * The Enrichment object provides inline enrichment data for specific attributes of interest within an event. It serves as a mechanism to enhance or supplement the information associated with the event by adding additional relevant details or context.
 *
 * OCSF Object: Enrichment
 */
export interface EnrichmentType {
  /** The time when the enrichment data was generated. */
  created_time?: number | undefined;
  /** The enrichment data associated with the attribute and value. The meaning of this data depends on the type the enrichment record. */
  data: Record<string, unknown>;
  /** A long description of the enrichment data. */
  desc?: string | undefined;
  /** The name of the attribute to which the enriched data pertains. */
  name: string;
  /** The enrichment data provider name. */
  provider?: string | undefined;
  /** The reputation of the enrichment data. */
  reputation?: ReputationType | undefined;
  /** A short description of the enrichment data. */
  short_desc?: string | undefined;
  /** The URL of the source of the enrichment data. */
  src_url?: string | undefined;
  /** The enrichment type. For example: location. */
  type?: string | undefined;
  /** The value of the attribute to which the enriched data pertains. */
  value: string;
  [key: string]: unknown;
}

export const Enrichment: z.ZodType<EnrichmentType> = z
  .object({
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
  })
  .passthrough() as any;
