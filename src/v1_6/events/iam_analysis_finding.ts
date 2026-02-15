import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { DeviceType } from '../objects/device.js';
import type { FindingInfoType } from '../objects/finding_info.js';
import type { VendorAttributesType } from '../objects/vendor_attributes.js';
import type { AccessAnalysisResultType } from '../objects/access_analysis_result.js';
import type { ApplicationType } from '../objects/application.js';
import type { IdentityActivityMetricsType } from '../objects/identity_activity_metrics.js';
import type { PermissionAnalysisResultType } from '../objects/permission_analysis_result.js';
import type { RemediationType } from '../objects/remediation.js';
import type { ResourceDetailsType } from '../objects/resource_details.js';
import type { UserType } from '../objects/user.js';

/**
 * This finding represents an IAM analysis result, which evaluates IAM policies, access patterns, and IAM configurations for potential security risks. The analysis can focus on either an identity (user, role, service account) or a resource to assess permissions, access patterns, and security posture within the IAM domain. <br><strong>Note:</strong> Use <code>permission_analysis_results</code> for identity-centric analysis (evaluating what an identity can do) and <code>access_analysis_result</code> for resource-centric analysis (evaluating who can access a resource). These complement each other for comprehensive IAM security assessment.<br><strong>Note:</strong> If the Finding is an incident, i.e. requires incident workflow, also apply the <code>incident</code> profile or aggregate this finding into an <code>Incident Finding</code>.
 *
 * OCSF Class UID: 2008
 * Category: IAM Analysis Finding
 * @see https://schema.ocsf.io/1.6.0/classes/iam_analysis_finding
 */
export interface IamAnalysisFindingType {
  /** The normalized identifier of the finding activity. */
  activity_id?: 0 | 1 | 2 | 3 | 99;
  /** The finding activity name, as defined by the activity_id. */
  activity_name?: string;
  /** The event category name, as defined by category_uid value. */
  category_name?: string;
  /** The category unique identifier of the event. */
  category_uid: number;
  /** The event class name, as defined by class_uid value. */
  class_name?: string;
  /** The unique identifier of a class. A class describes the attributes available in an event. */
  class_uid: number;
  /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
  count?: number;
  /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
  duration?: number;
  /** The time of the most recent event included in the finding. */
  end_time?: number;
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments?: EnrichmentType[];
  /** The description of the event/finding, as defined by the source. */
  message?: string;
  /** The metadata associated with the event or a finding. */
  metadata: MetadataType;
  /** The observables associated with the event or a finding. */
  observables?: ObservableType[];
  /** The raw event/finding data as received from the source. */
  raw_data?: string;
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash?: FingerprintType;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The time of the least recent event included in the finding. */
  start_time?: number;
  /** The normalized status of the Finding set by the consumer normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status?: string;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string;
  /** The normalized status identifier of the Finding, set by the consumer. */
  status_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The normalized event occurrence time or the finding creation time. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset?: number;
  /** The event/finding type name, as defined by the type_uid. */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: number;
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped?: Record<string, unknown>;
  /** A user provided comment about the finding. */
  comment?: string;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence?: string;
  /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The confidence score as reported by the event source. */
  confidence_score?: number;
  /** Describes the affected device/host. If applicable, it can be used in conjunction with Resource(s). e.g. Specific details about an AWS EC2 instance, that is affected by the Finding. */
  device?: DeviceType;
  /** Describes the supporting information about a generated finding. */
  finding_info: FindingInfoType;
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes?: VendorAttributesType;
  /** Describes access relationships and pathways between identities, resources, focusing on who can access what and through which mechanisms. This evaluates access levels (read/write/admin), access types (direct, cross-account, public, federated), and the conditions under which access is granted. Use this for resource-centric security assessments such as external access discovery, public exposure analysis, etc. */
  access_analysis_result?: AccessAnalysisResultType;
  /** Details about applications, services, or systems that are accessible based on the IAM analysis. For identity-centric analysis, this represents applications the identity can access. For resource-centric analysis, this represents applications that can access the resource. */
  applications?: ApplicationType[];
  /** Describes usage activity and other metrics of an Identity i.e. AWS IAM User, GCP IAM Principal, etc. */
  identity_activity_metrics?: IdentityActivityMetricsType;
  /** Describes analysis results of permissions, policies directly associated with an identity (user, role, or service account). This evaluates what permissions an identity has been granted through attached policies, which privileges are actively used versus unused, and identifies potential over-privileged access. Use this for identity-centric security assessments such as privilege audits, dormant permission discovery, and least-privilege compliance analysis. */
  permission_analysis_results?: PermissionAnalysisResultType[];
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation?: RemediationType;
  /** Details about resources involved in the IAM analysis. For identity-centric analysis, this represents resources the identity can access. For resource-centric analysis, this represents the resource being analyzed and related resources in the access chain. */
  resources?: ResourceDetailsType[];
  /** Details about the identity (user, role, service account, or other principal) that is the subject of the IAM analysis. This provides context about the identity being evaluated for security risks and access patterns. */
  user?: UserType;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { Device } from '../objects/device.js';
import { FindingInfo } from '../objects/finding_info.js';
import { VendorAttributes } from '../objects/vendor_attributes.js';
import { AccessAnalysisResult } from '../objects/access_analysis_result.js';
import { Application } from '../objects/application.js';
import { IdentityActivityMetrics } from '../objects/identity_activity_metrics.js';
import { PermissionAnalysisResult } from '../objects/permission_analysis_result.js';
import { Remediation } from '../objects/remediation.js';
import { ResourceDetails } from '../objects/resource_details.js';
import { User } from '../objects/user.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Update",
  3: "Close",
  99: "Other",
};

const SEVERITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Informational",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Critical",
  6: "Fatal",
  99: "Other",
};

const STATUS_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
  5: "Archived",
  6: "Deleted",
  99: "Other",
};

const CONFIDENCE_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "confidence_id", labelField: "confidence", labels: CONFIDENCE_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 2,
  classUid: 2008,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

const IamAnalysisFindingSchema = z.strictObject({
  /** The normalized identifier of the finding activity. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The finding activity name, as defined by the activity_id. */
  activity_name: z.string().optional(),
  /** The event category name, as defined by category_uid value. */
  category_name: z.string().optional(),
  /** The category unique identifier of the event. */
  category_uid: z.number().int(),
  /** The event class name, as defined by class_uid value. */
  class_name: z.string().optional(),
  /** The unique identifier of a class. A class describes the attributes available in an event. */
  class_uid: z.number().int(),
  /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
  count: z.number().int().optional(),
  /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
  duration: z.number().int().optional(),
  /** The time of the most recent event included in the finding. */
  end_time: z.number().int().optional(),
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments: z.array(Enrichment).optional(),
  /** The description of the event/finding, as defined by the source. */
  message: z.string().optional(),
  /** The metadata associated with the event or a finding. */
  metadata: Metadata,
  /** The observables associated with the event or a finding. */
  observables: z.array(Observable).optional(),
  /** The raw event/finding data as received from the source. */
  raw_data: z.string().optional(),
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash: Fingerprint.optional(),
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size: z.number().int().optional(),
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
  /** The time of the least recent event included in the finding. */
  start_time: z.number().int().optional(),
  /** The normalized status of the Finding set by the consumer normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status: z.string().optional(),
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code: z.string().optional(),
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail: z.string().optional(),
  /** The normalized status identifier of the Finding, set by the consumer. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The normalized event occurrence time or the finding creation time. */
  time: z.number().int(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, as defined by the type_uid. */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: z.number().int(),
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped: z.record(z.string(), z.unknown()).optional(),
  /** A user provided comment about the finding. */
  comment: z.string().optional(),
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence: z.string().optional(),
  /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The confidence score as reported by the event source. */
  confidence_score: z.number().int().optional(),
  /** Describes the affected device/host. If applicable, it can be used in conjunction with Resource(s). e.g. Specific details about an AWS EC2 instance, that is affected by the Finding. */
  device: Device.optional(),
  /** Describes the supporting information about a generated finding. */
  finding_info: FindingInfo,
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes: VendorAttributes.optional(),
  /** Describes access relationships and pathways between identities, resources, focusing on who can access what and through which mechanisms. This evaluates access levels (read/write/admin), access types (direct, cross-account, public, federated), and the conditions under which access is granted. Use this for resource-centric security assessments such as external access discovery, public exposure analysis, etc. */
  access_analysis_result: AccessAnalysisResult.optional(),
  /** Details about applications, services, or systems that are accessible based on the IAM analysis. For identity-centric analysis, this represents applications the identity can access. For resource-centric analysis, this represents applications that can access the resource. */
  applications: z.array(Application).optional(),
  /** Describes usage activity and other metrics of an Identity i.e. AWS IAM User, GCP IAM Principal, etc. */
  identity_activity_metrics: IdentityActivityMetrics.optional(),
  /** Describes analysis results of permissions, policies directly associated with an identity (user, role, or service account). This evaluates what permissions an identity has been granted through attached policies, which privileges are actively used versus unused, and identifies potential over-privileged access. Use this for identity-centric security assessments such as privilege audits, dormant permission discovery, and least-privilege compliance analysis. */
  permission_analysis_results: z.array(PermissionAnalysisResult).optional(),
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation: Remediation.optional(),
  /** Details about resources involved in the IAM analysis. For identity-centric analysis, this represents resources the identity can access. For resource-centric analysis, this represents the resource being analyzed and related resources in the access chain. */
  resources: z.array(ResourceDetails).optional(),
  /** Details about the identity (user, role, service account, or other principal) that is the subject of the IAM analysis. This provides context about the identity being evaluated for security risks and access patterns. */
  user: User.optional(),
});

export const IamAnalysisFinding = {
  parse: (data: unknown): IamAnalysisFindingType => IamAnalysisFindingSchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: IamAnalysisFindingType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return IamAnalysisFindingSchema.safeParse(preprocessed);
    } catch (error) {
      // Preprocessing error - convert to Zod error format
      return {
        success: false,
        error: new z.ZodError([{
          code: "custom",
          path: [],
          message: error instanceof Error ? error.message : "Preprocessing failed",
        }]),
      };
    }
  },

  schema: IamAnalysisFindingSchema,
};
