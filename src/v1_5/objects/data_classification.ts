import { z } from "zod";

import { ClassifierDetails, type ClassifierDetailsType } from "./classifier_details.js";
import { DiscoveryDetails, type DiscoveryDetailsType } from "./discovery_details.js";
import { Policy, type PolicyType } from "./policy.js";

/**
 * The Data Classification object includes information about data classification levels and data category types.
 *
 * OCSF Object: Data Classification
 */
export interface DataClassificationType {
  /** The name of the data classification category that data matched into, e.g. Financial, Personal, Governmental, etc. */
  category?: string | undefined;
  /** The normalized identifier of the data classification category. */
  category_id?: number | undefined;
  /** Describes details about the classifier used for data classification. */
  classifier_details?: ClassifierDetailsType | undefined;
  /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
  confidentiality?: string | undefined;
  /** The normalized identifier of the file content confidentiality indicator. */
  confidentiality_id?: number | undefined;
  /** Details about the data discovered by classification job. */
  discovery_details?: DiscoveryDetailsType[] | undefined;
  /** Details about the data policy that governs data handling and security measures related to classification. */
  policy?: PolicyType | undefined;
  /** Size of the data classified. */
  size?: number | undefined;
  /** The source URL pointing towards the full classifcation job details. */
  src_url?: string | undefined;
  /** The resultant status of the classification job normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string | undefined;
  /** The contextual description of the status, status_id value. */
  status_details?: string[] | undefined;
  /** The normalized status identifier of the classification job. */
  status_id?: number | undefined;
  /** The total count of discovered entities, by the classification job. */
  total?: number | undefined;
  /** The unique identifier of the classification job. */
  uid?: string | undefined;
  [key: string]: unknown;
}

export const DataClassification: z.ZodType<DataClassificationType> = z
  .object({
    /** The name of the data classification category that data matched into, e.g. Financial, Personal, Governmental, etc. */
    category: z.string().optional(),
    /** The normalized identifier of the data classification category. */
    category_id: z.number().int().optional(),
    /** Describes details about the classifier used for data classification. */
    classifier_details: ClassifierDetails.optional(),
    /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
    confidentiality: z.string().optional(),
    /** The normalized identifier of the file content confidentiality indicator. */
    confidentiality_id: z.number().int().optional(),
    /** Details about the data discovered by classification job. */
    discovery_details: z.array(DiscoveryDetails).optional(),
    /** Details about the data policy that governs data handling and security measures related to classification. */
    policy: Policy.optional(),
    /** Size of the data classified. */
    size: z.number().int().optional(),
    /** The source URL pointing towards the full classifcation job details. */
    src_url: z.string().optional(),
    /** The resultant status of the classification job normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
    status: z.string().optional(),
    /** The contextual description of the status, status_id value. */
    status_details: z.array(z.string()).optional(),
    /** The normalized status identifier of the classification job. */
    status_id: z.number().int().optional(),
    /** The total count of discovered entities, by the classification job. */
    total: z.number().int().optional(),
    /** The unique identifier of the classification job. */
    uid: z.string().optional(),
  })
  .passthrough() as any;
