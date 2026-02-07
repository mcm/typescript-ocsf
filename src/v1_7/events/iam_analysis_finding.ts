import { z } from "zod";
import { type SiblingPair, reconcileSiblings } from "../../sibling.js";
import { type UidConfig, prefillUids } from "../../uid.js";

import {
  AccessAnalysisResult,
  type AccessAnalysisResultType,
} from "../objects/access_analysis_result.js";
import { Application, type ApplicationType } from "../objects/application.js";
import { Device, type DeviceType } from "../objects/device.js";
import { Enrichment, type EnrichmentType } from "../objects/enrichment.js";
import { FindingInfo, type FindingInfoType } from "../objects/finding_info.js";
import { Fingerprint, type FingerprintType } from "../objects/fingerprint.js";
import {
  IdentityActivityMetrics,
  type IdentityActivityMetricsType,
} from "../objects/identity_activity_metrics.js";
import { Metadata, type MetadataType } from "../objects/metadata.js";
import { OcsfObject, type OcsfObjectType } from "../objects/object.js";
import { Observable, type ObservableType } from "../objects/observable.js";
import {
  PermissionAnalysisResult,
  type PermissionAnalysisResultType,
} from "../objects/permission_analysis_result.js";
import { Remediation, type RemediationType } from "../objects/remediation.js";
import { ResourceDetails, type ResourceDetailsType } from "../objects/resource_details.js";
import { User, type UserType } from "../objects/user.js";
import { VendorAttributes, type VendorAttributesType } from "../objects/vendor_attributes.js";

const ACTIVITY_ID_LABELS: Record<number, string> = {
  1: "Create",
  2: "Update",
  3: "Close",
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
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
  5: "Archived",
  6: "Deleted",
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

/**
 * This finding represents an IAM analysis result, which evaluates IAM policies, access patterns, and IAM configurations for potential security risks. The analysis can focus on either an identity (user, role, service account) or a resource to assess permissions, access patterns, and security posture within the IAM domain. <br><strong>Note:</strong> Use <code>permission_analysis_results</code> for identity-centric analysis (evaluating what an identity can do) and <code>access_analysis_result</code> for resource-centric analysis (evaluating who can access a resource). These complement each other for comprehensive IAM security assessment.<br><strong>Note:</strong> If the Finding is an incident, i.e. requires incident workflow, also apply the <code>incident</code> profile or aggregate this finding into an <code>Incident Finding</code>.
 *
 * OCSF Class UID: 2008
 * Category: IAM Analysis Finding
 * @see https://schema.ocsf.io/1.7.0/classes/iam_analysis_finding
 */
export interface IamAnalysisFindingType {
  /** The normalized identifier of the finding activity. */
  activity_id?: number | undefined;
  /** The finding activity name, as defined by the activity_id. */
  activity_name?: string | undefined;
  /** The event category name, as defined by category_uid value. */
  category_name?: string | undefined;
  /** The category unique identifier of the event. */
  category_uid: number;
  /** The event class name, as defined by class_uid value. */
  class_name?: string | undefined;
  /** The unique identifier of a class. A class describes the attributes available in an event. */
  class_uid: number;
  /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
  count?: number | undefined;
  /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
  duration?: number | undefined;
  /** The time of the most recent event included in the finding. */
  end_time?: number | undefined;
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments?: EnrichmentType[] | undefined;
  /** The description of the event/finding, as defined by the source. */
  message?: string | undefined;
  /** The metadata associated with the event or a finding. */
  metadata: MetadataType;
  /** The observables associated with the event or a finding. */
  observables?: ObservableType[] | undefined;
  /** The raw event/finding data as received from the source. */
  raw_data?: string | undefined;
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash?: FingerprintType | undefined;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number | undefined;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string | undefined;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: number;
  /** The time of the least recent event included in the finding. */
  start_time?: number | undefined;
  /** The normalized status of the Finding set by the consumer normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status?: string | undefined;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string | undefined;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string | undefined;
  /** The normalized status identifier of the Finding, set by the consumer. */
  status_id?: number | undefined;
  /** The normalized event occurrence time or the finding creation time. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset?: number | undefined;
  /** The event/finding type name, as defined by the type_uid. */
  type_name?: string | undefined;
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: number;
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped?: OcsfObjectType | undefined;
  /** A user provided comment about the finding. */
  comment?: string | undefined;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence?: string | undefined;
  /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
  confidence_id?: number | undefined;
  /** The confidence score as reported by the event source. */
  confidence_score?: number | undefined;
  /** Describes the affected device/host. If applicable, it can be used in conjunction with Resource(s). e.g. Specific details about an AWS EC2 instance, that is affected by the Finding. */
  device?: DeviceType | undefined;
  /** Describes the supporting information about a generated finding. */
  finding_info: FindingInfoType;
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes?: VendorAttributesType | undefined;
  /** Describes access relationships and pathways between identities, resources, focusing on who can access what and through which mechanisms. This evaluates access levels (read/write/admin), access types (direct, cross-account, public, federated), and the conditions under which access is granted. Use this for resource-centric security assessments such as external access discovery, public exposure analysis, etc. */
  access_analysis_result?: AccessAnalysisResultType | undefined;
  /** Details about applications, services, or systems that are accessible based on the IAM analysis. For identity-centric analysis, this represents applications the identity can access. For resource-centric analysis, this represents applications that can access the resource. */
  applications?: ApplicationType[] | undefined;
  /** Describes usage activity and other metrics of an Identity i.e. AWS IAM User, GCP IAM Principal, etc. */
  identity_activity_metrics?: IdentityActivityMetricsType | undefined;
  /** Describes analysis results of permissions, policies directly associated with an identity (user, role, or service account). This evaluates what permissions an identity has been granted through attached policies, which privileges are actively used versus unused, and identifies potential over-privileged access. Use this for identity-centric security assessments such as privilege audits, dormant permission discovery, and least-privilege compliance analysis. */
  permission_analysis_results?: PermissionAnalysisResultType[] | undefined;
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation?: RemediationType | undefined;
  /** Details about resources involved in the IAM analysis. For identity-centric analysis, this represents resources the identity can access. For resource-centric analysis, this represents the resource being analyzed and related resources in the access chain. */
  resources?: ResourceDetailsType[] | undefined;
  /** Details about the identity (user, role, service account, or other principal) that is the subject of the IAM analysis. This provides context about the identity being evaluated for security risks and access patterns. */
  user?: UserType | undefined;
  [key: string]: unknown;
}

export const IamAnalysisFinding: z.ZodType<IamAnalysisFindingType> = z.preprocess(
  (data) => {
    if (typeof data !== "object" || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z
    .object({
      /** The normalized identifier of the finding activity. */
      activity_id: z.number().int().optional(),
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
      enrichments: z.array(z.lazy(() => Enrichment)).optional(),
      /** The description of the event/finding, as defined by the source. */
      message: z.string().optional(),
      /** The metadata associated with the event or a finding. */
      metadata: z.lazy(() => Metadata),
      /** The observables associated with the event or a finding. */
      observables: z.array(z.lazy(() => Observable)).optional(),
      /** The raw event/finding data as received from the source. */
      raw_data: z.string().optional(),
      /** The hash, which describes the content of the raw_data field. */
      raw_data_hash: z.lazy(() => Fingerprint).optional(),
      /** The size of the raw data which was transformed into an OCSF event, in bytes. */
      raw_data_size: z.number().int().optional(),
      /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
      severity: z.string().optional(),
      /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
      severity_id: z.number().int(),
      /** The time of the least recent event included in the finding. */
      start_time: z.number().int().optional(),
      /** The normalized status of the Finding set by the consumer normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
      status: z.string().optional(),
      /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
      status_code: z.string().optional(),
      /** The status detail contains additional information about the event/finding outcome. */
      status_detail: z.string().optional(),
      /** The normalized status identifier of the Finding, set by the consumer. */
      status_id: z.number().int().optional(),
      /** The normalized event occurrence time or the finding creation time. */
      time: z.number().int(),
      /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
      timezone_offset: z.number().int().optional(),
      /** The event/finding type name, as defined by the type_uid. */
      type_name: z.string().optional(),
      /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
      type_uid: z.number().int(),
      /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
      unmapped: z.lazy(() => OcsfObject).optional(),
      /** A user provided comment about the finding. */
      comment: z.string().optional(),
      /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
      confidence: z.string().optional(),
      /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
      confidence_id: z.number().int().optional(),
      /** The confidence score as reported by the event source. */
      confidence_score: z.number().int().optional(),
      /** Describes the affected device/host. If applicable, it can be used in conjunction with Resource(s). e.g. Specific details about an AWS EC2 instance, that is affected by the Finding. */
      device: z.lazy(() => Device).optional(),
      /** Describes the supporting information about a generated finding. */
      finding_info: z.lazy(() => FindingInfo),
      /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
      vendor_attributes: z.lazy(() => VendorAttributes).optional(),
      /** Describes access relationships and pathways between identities, resources, focusing on who can access what and through which mechanisms. This evaluates access levels (read/write/admin), access types (direct, cross-account, public, federated), and the conditions under which access is granted. Use this for resource-centric security assessments such as external access discovery, public exposure analysis, etc. */
      access_analysis_result: z.lazy(() => AccessAnalysisResult).optional(),
      /** Details about applications, services, or systems that are accessible based on the IAM analysis. For identity-centric analysis, this represents applications the identity can access. For resource-centric analysis, this represents applications that can access the resource. */
      applications: z.array(z.lazy(() => Application)).optional(),
      /** Describes usage activity and other metrics of an Identity i.e. AWS IAM User, GCP IAM Principal, etc. */
      identity_activity_metrics: z.lazy(() => IdentityActivityMetrics).optional(),
      /** Describes analysis results of permissions, policies directly associated with an identity (user, role, or service account). This evaluates what permissions an identity has been granted through attached policies, which privileges are actively used versus unused, and identifies potential over-privileged access. Use this for identity-centric security assessments such as privilege audits, dormant permission discovery, and least-privilege compliance analysis. */
      permission_analysis_results: z.array(z.lazy(() => PermissionAnalysisResult)).optional(),
      /** Describes the recommended remediation steps to address identified issue(s). */
      remediation: z.lazy(() => Remediation).optional(),
      /** Details about resources involved in the IAM analysis. For identity-centric analysis, this represents resources the identity can access. For resource-centric analysis, this represents the resource being analyzed and related resources in the access chain. */
      resources: z.array(z.lazy(() => ResourceDetails)).optional(),
      /** Details about the identity (user, role, service account, or other principal) that is the subject of the IAM analysis. This provides context about the identity being evaluated for security risks and access patterns. */
      user: z.lazy(() => User).optional(),
    })
    .passthrough(),
) as any;
