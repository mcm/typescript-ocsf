import { z } from 'zod';

import type { ClassifierDetailsType } from './classifier_details.js';
import type { DiscoveryDetailsType } from './discovery_details.js';
import type { PolicyType } from './policy.js';

/**
 * The Data Classification object includes information about data classification levels and data category types.
 *
 * OCSF Object: Data Classification
 */
export interface DataClassificationType {
  /** The name of the data classification category that data matched into, e.g. Financial, Personal, Governmental, etc. */
  category?: string;
  /** The normalized identifier of the data classification category. */
  category_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** Describes details about the classifier used for data classification. */
  classifier_details?: ClassifierDetailsType;
  /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
  confidentiality?: string;
  /** The normalized identifier of the file content confidentiality indicator. */
  confidentiality_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** Details about the data discovered by classification job. */
  discovery_details?: DiscoveryDetailsType[];
  /** Details about the data policy that governs data handling and security measures related to classification. */
  policy?: PolicyType;
  /** Size of the data classified. */
  size?: number;
  /** The source URL pointing towards the full classifcation job details. */
  src_url?: string;
  /** The resultant status of the classification job normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string;
  /** The contextual description of the status, status_id value. */
  status_details?: string[];
  /** The normalized status identifier of the classification job. */
  status_id?: 0 | 1 | 2 | 3 | 99;
  /** The total count of discovered entities, by the classification job. */
  total?: number;
  /** The unique identifier of the classification job. */
  uid?: string;
}

import { ClassifierDetails } from './classifier_details.js';
import { DiscoveryDetails } from './discovery_details.js';
import { Policy } from './policy.js';

type DataClassificationShape = {
  category: z.ZodOptional<z.ZodString>;
  category_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  classifier_details: z.ZodOptional<typeof ClassifierDetails>;
  confidentiality: z.ZodOptional<z.ZodString>;
  confidentiality_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  discovery_details: z.ZodOptional<z.ZodArray<typeof DiscoveryDetails>>;
  policy: z.ZodOptional<typeof Policy>;
  size: z.ZodOptional<z.ZodNumber>;
  src_url: z.ZodOptional<z.ZodString>;
  status: z.ZodOptional<z.ZodString>;
  status_details: z.ZodOptional<z.ZodArray<z.ZodString>>;
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  total: z.ZodOptional<z.ZodNumber>;
  uid: z.ZodOptional<z.ZodString>;
};

const DataClassificationSchema: z.ZodObject<DataClassificationShape, z.core.$strict> = z.strictObject({
  /** The name of the data classification category that data matched into, e.g. Financial, Personal, Governmental, etc. */
  category: z.string().optional(),
  /** The normalized identifier of the data classification category. */
  category_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** Describes details about the classifier used for data classification. */
  classifier_details: ClassifierDetails.optional(),
  /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
  confidentiality: z.string().optional(),
  /** The normalized identifier of the file content confidentiality indicator. */
  confidentiality_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
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
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The total count of discovered entities, by the classification job. */
  total: z.number().int().optional(),
  /** The unique identifier of the classification job. */
  uid: z.string().optional(),
});

export const DataClassification = DataClassificationSchema;

/** Value → label mappings for each enum field of DataClassification. */
export const DataClassificationLabels: Readonly<Record<"category_id" | "confidentiality_id" | "status_id", Readonly<Record<number, string>>>> = {
  category_id: {
    0: "Unknown",
    1: "Personal",
    2: "Governmental",
    3: "Financial",
    4: "Business",
    5: "Military and Law Enforcement",
    6: "Security",
    99: "Other",
  },
  confidentiality_id: {
    0: "Unknown",
    1: "Not Confidential",
    2: "Confidential",
    3: "Secret",
    4: "Top Secret",
    5: "Private",
    6: "Restricted",
    99: "Other",
  },
  status_id: {
    0: "Unknown",
    1: "Complete",
    2: "Partial",
    3: "Fail",
    99: "Other",
  },
};
