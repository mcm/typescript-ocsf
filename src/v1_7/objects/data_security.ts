import { z } from 'zod';

import type { ClassifierDetailsType } from './classifier_details.js';
import type { DiscoveryDetailsType } from './discovery_details.js';
import type { PolicyType } from './policy.js';

/**
 * The Data Security object describes the characteristics, techniques and content of a Data Loss Prevention (DLP), Data Loss Detection (DLD), Data Classification, or similar tools' finding, alert, or detection mechanism(s).
 *
 * OCSF Object: Data Security
 */
export interface DataSecurityType {
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
  /** Details about the policy that triggered the finding. */
  policy?: PolicyType;
  /** Size of the data classified. */
  size?: number;
  /** The source URL pointing towards the full classification job details. */
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
  /** The name of the stage or state that the data was in. E.g., Data-at-Rest, Data-in-Transit, etc. */
  data_lifecycle_state?: string;
  /** The stage or state that the data was in when it was assessed or scanned by a data security tool. */
  data_lifecycle_state_id?: 0 | 1 | 2 | 3 | 99;
  /** Specific pattern, algorithm, fingerprint, or model used for detection. */
  detection_pattern?: string;
  /** The name of the type of data security tool or system that the finding, detection, or alert originated from. E.g., Endpoint, Secure Email Gateway, etc. */
  detection_system?: string;
  /** The type of data security tool or system that the finding, detection, or alert originated from. */
  detection_system_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 99;
  /** A text, binary, file name, or datastore that matched against a detection rule. */
  pattern_match?: string;
}

import { ClassifierDetails } from './classifier_details.js';
import { DiscoveryDetails } from './discovery_details.js';
import { Policy } from './policy.js';

const DataSecuritySchema = z.strictObject({
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
  /** Details about the policy that triggered the finding. */
  policy: Policy.optional(),
  /** Size of the data classified. */
  size: z.number().int().optional(),
  /** The source URL pointing towards the full classification job details. */
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
  /** The name of the stage or state that the data was in. E.g., Data-at-Rest, Data-in-Transit, etc. */
  data_lifecycle_state: z.string().optional(),
  /** The stage or state that the data was in when it was assessed or scanned by a data security tool. */
  data_lifecycle_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** Specific pattern, algorithm, fingerprint, or model used for detection. */
  detection_pattern: z.string().optional(),
  /** The name of the type of data security tool or system that the finding, detection, or alert originated from. E.g., Endpoint, Secure Email Gateway, etc. */
  detection_system: z.string().optional(),
  /** The type of data security tool or system that the finding, detection, or alert originated from. */
  detection_system_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(99)]).optional(),
  /** A text, binary, file name, or datastore that matched against a detection rule. */
  pattern_match: z.string().optional(),
});

export const DataSecurity = DataSecuritySchema;
