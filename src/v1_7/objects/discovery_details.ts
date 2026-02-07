import { z } from "zod";

import { OccurrenceDetails, type OccurrenceDetailsType } from "./occurrence_details.js";

/**
 * The Discovery Details object describes results of a discovery task/job.
 *
 * OCSF Object: Discovery Details
 */
export interface DiscoveryDetailsType {
  /** The number of discovered entities of the specified type. */
  count?: number | undefined;
  /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
  occurrence_details?: OccurrenceDetailsType | undefined;
  /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
  occurrences?: OccurrenceDetailsType[] | undefined;
  /** The specific type of information that was discovered. e.g. name, phone_number, etc. */
  type?: string | undefined;
  /** Optionally, the specific value of discovered information. */
  value?: string | undefined;
  [key: string]: unknown;
}

export const DiscoveryDetails: z.ZodType<DiscoveryDetailsType> = z
  .object({
    /** The number of discovered entities of the specified type. */
    count: z.number().int().optional(),
    /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
    occurrence_details: OccurrenceDetails.optional(),
    /** Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated. */
    occurrences: z.array(OccurrenceDetails).optional(),
    /** The specific type of information that was discovered. e.g. name, phone_number, etc. */
    type: z.string().optional(),
    /** Optionally, the specific value of discovered information. */
    value: z.string().optional(),
  })
  .passthrough() as any;
