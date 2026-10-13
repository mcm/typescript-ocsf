import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { DeviceType } from '../objects/device.js';
import type { FindingInfoType } from '../objects/finding_info.js';
import type { NoteType } from '../objects/note.js';
import type { ResourceDetailsType } from '../objects/resource_details.js';
import type { VendorAttributesType } from '../objects/vendor_attributes.js';
import type { ApplicationType } from '../objects/application.js';
import type { ComplianceType } from '../objects/compliance.js';
import type { RemediationType } from '../objects/remediation.js';
import type { VulnerabilityType } from '../objects/vulnerability.js';

import { ApplicationSecurityPostureFindingActivityId } from '../enums/application_security_posture_finding_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { ApplicationSecurityPostureFindingStatusId } from '../enums/application_security_posture_finding_status_id.js';
import { ConfidenceId } from '../enums/index.js';

/**
 * The Application Security Posture Finding event is a notification about any bug, defect, deficiency, exploit, vulnerability, weakness or any other issue with software and related systems. Application Security Posture Findings typically involve reporting on the greater context including compliance, impacted resources, remediation guidance, specific code defects, and/or vulnerability metadata. Application Security Posture Findings can be reported by Threat & Vulnerability Management (TVM) tools, Application Security Posture Management (ASPM) tools, or other similar tools. Note: if the event producer is a security control, the <code>security_control</code> profile should be applied and its <code>attacks</code> information, if present, should be duplicated into the <code>finding_info</code> object. <br><strong>Note: </strong>If the Finding is an incident, i.e. requires incident workflow, also apply the <code>incident</code> profile or aggregate this finding into an <code>Incident Finding</code>.
 *
 * OCSF Class UID: 2007
 * Category: Application Security Posture Finding
 * @see https://schema.ocsf.io/1.9.0/classes/application_security_posture_finding
 */
export interface ApplicationSecurityPostureFindingType {
  /** The normalized identifier of the finding activity. Use 1 (Create) when a finding is first generated, 2 (Update) when an existing finding is modified (e.g., severity change, new evidence), and 3 (Close) when a finding is resolved or dismissed. */
  activity_id?: 0 | 1 | 2 | 3 | 99;
  /** The finding activity name, as defined by the activity_id. When activity_id is 99 (Other), this must contain the source-specific activity label. */
  activity_name?: string;
  /** The event category name, as defined by the category_uid value. The value must match the caption defined for the corresponding category_uid enum value (e.g., "Findings" for category_uid: 2). */
  category_name?: string;
  /** The category unique identifier of the event. Each event class belongs to exactly one category. Producers and mappers must set this to the category defined by the event class being used. */
  category_uid: number;
  /** The event class name, as defined by the class_uid value. The value must match the caption defined for the corresponding class_uid (e.g., "Detection Finding" for class_uid: 2004). */
  class_name?: string;
  /** The unique identifier of a class. A class describes the attributes available in an event. Producers and mappers must set this to the uid defined in the event class definition. For example, Detection Finding is 2004. */
  class_uid: number;
  /** The number of events aggregated into this single record. Only populate for aggregate events. When set, start_time and end_time should also be provided to define the aggregation window. */
  count?: number;
  /** The elapsed time of the aggregation window in milliseconds, from start_time to end_time. Only populate for aggregate events (count > 1). The value should equal end_time - start_time. */
  duration?: number;
  /** The time of the most recent event or finding that contributed to this finding. */
  end_time?: number;
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments?: EnrichmentType[];
  /** A human-readable description of the event, as defined by the source. This should be a concise, meaningful summary suitable for display in a UI or alert notification - not a raw log line. For example: "User john_doe logged in from 10.0.0.1." rather than a raw syslog string. */
  message?: string;
  /** The metadata object describes the event producer, schema version, and processing information. Producers and mappers must populate metadata.product to identify the data source, and metadata.version to indicate the OCSF schema version used. Consumers rely on this to interpret the event correctly. */
  metadata: MetadataType;
  /** The observables array surfaces key indicators and entities from the event or finding in a single, consistent location for downstream correlation and detection. Each entry references an attribute path within the event (e.g., src_endpoint.ip) along with its type and value, enabling consumers to extract IOCs without parsing the full event structure. */
  observables?: ObservableType[];
  /** The original event/finding data as received from the source, before normalization into OCSF. Populate this with the verbatim log line, JSON payload, or other native format for forensic and debugging purposes. This field is not intended for structured querying - use the normalized OCSF attributes instead. */
  raw_data?: string;
  /** A fingerprint (hash) of the raw_data content. Use this to verify the integrity of the original event data or to deduplicate events. */
  raw_data_hash?: FingerprintType;
  /** The size of the original event data (as captured in raw_data) in bytes, before OCSF normalization. Useful for metering and capacity planning. */
  raw_data_size?: number;
  /** The event/finding severity label, normalized to the caption of the severity_id value. When severity_id is 99 (Other), this attribute must contain the source-specific severity label. For all other values, this should match the caption defined for that severity_id enum value (e.g., "High" for severity_id: 4). */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The time of the earliest event or finding that contributed to this finding. */
  start_time?: number;
  /** The finding lifecycle status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this must contain the source-specific status label. */
  status?: string;
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code?: string;
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail?: string;
  /** The normalized finding lifecycle status identifier. Unlike the status of an activity event, which indicates the success or failure of the activity, finding status tracks the review and triage workflow: whether the finding is new, being investigated, suppressed, or resolved. Producers should set this to reflect the current state of the finding in their system (e.g., 1 for newly created findings, 4 when remediated). */
  status_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The finding creation time - when the finding was first generated, not when the underlying activity occurred. For the time range of contributing events, use start_time and end_time. */
  time?: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset?: number;
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: number;
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped?: Record<string, unknown>;
  /** A user provided comment about the finding. */
  comment?: string;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source and should be the same as confidence_score if also populated.. */
  confidence?: string;
  /** The normalized confidence refers to the accuracy of the analytics that produced the finding. An analytic with a low confidence means that the finding scope is wide and may create finding reports that are noisy or may not be malicious in nature. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The confidence score as reported by the event source. */
  confidence_score?: number;
  /** Describes the affected device/host. It can be used in conjunction with resources or when there are multiple devices affected. E.g. The role of the device as target or actor, specific details about a cloud resource compute instance, etc.If a single device is the source of the finding, use the Host profile and populate device. */
  device?: DeviceType;
  /** Describes the supporting information about a generated finding. */
  finding_info: FindingInfoType;
  /** Additional notes related to the finding. Each note in the array can include a comment, the user who made the comment, the time when the note was created, and the time when the note was last modified (typically by the same user). Notes can be used to provide additional context, explanations, or observations by analysts related to the finding over time. */
  notes?: NoteType[];
  /** Describes details about the resource/resources that are affected by the vulnerability/vulnerabilities. */
  resources?: ResourceDetailsType[];
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes?: VendorAttributesType;
  /** An Application describes the details for an inventoried application as reported by an Application Security tool or other Developer-centric tooling. Applications can be defined as Kubernetes resources, Containerized resources, or application hosting-specific cloud sources such as AWS Elastic BeanStalk, AWS Lightsail, or Azure Logic Apps. */
  application?: ApplicationType;
  /** Provides compliance context to vulnerabilities and other weaknesses that are reported as part of an Application Security or Vulnerability Management tool's built-in compliance framework mapping. */
  compliance?: ComplianceType;
  /** Describes the recommended remediation steps to address identified vulnerabilities or weaknesses. */
  remediation?: RemediationType;
  /** This object describes vulnerabilities reported in a security finding. */
  vulnerabilities?: VulnerabilityType[];
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { Device } from '../objects/device.js';
import { FindingInfo } from '../objects/finding_info.js';
import { Note } from '../objects/note.js';
import { ResourceDetails } from '../objects/resource_details.js';
import { VendorAttributes } from '../objects/vendor_attributes.js';
import { Application } from '../objects/application.js';
import { Compliance } from '../objects/compliance.js';
import { Remediation } from '../objects/remediation.js';
import { Vulnerability } from '../objects/vulnerability.js';

/** Value → label mappings for each enum field of ApplicationSecurityPostureFinding. */
export const ApplicationSecurityPostureFindingLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id" | "confidence_id", Readonly<Record<number, string>>>> = {
  activity_id: {
    0: "Unknown",
    1: "Create",
    2: "Update",
    3: "Close",
    99: "Other",
  },
  severity_id: {
    0: "Unknown",
    1: "Informational",
    2: "Low",
    3: "Medium",
    4: "High",
    5: "Critical",
    6: "Fatal",
    99: "Other",
  },
  status_id: {
    0: "Unknown",
    1: "New",
    2: "In Progress",
    3: "Suppressed",
    4: "Resolved",
    5: "Archived",
    6: "Deleted",
    99: "Other",
  },
  confidence_id: {
    0: "Unknown",
    1: "Low",
    2: "Medium",
    3: "High",
    99: "Other",
  },
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ApplicationSecurityPostureFindingLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: ApplicationSecurityPostureFindingLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: ApplicationSecurityPostureFindingLabels.status_id },
  { idField: "confidence_id", labelField: "confidence", labels: ApplicationSecurityPostureFindingLabels.confidence_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 2,
  classUid: 2007,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type ApplicationSecurityPostureFindingShape = {
  activity_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  activity_name: z.ZodOptional<z.ZodString>;
  category_name: z.ZodOptional<z.ZodString>;
  category_uid: z.ZodNumber;
  class_name: z.ZodOptional<z.ZodString>;
  class_uid: z.ZodNumber;
  count: z.ZodOptional<z.ZodNumber>;
  duration: z.ZodOptional<z.ZodNumber>;
  end_time: z.ZodOptional<z.ZodNumber>;
  enrichments: z.ZodOptional<z.ZodArray<typeof Enrichment>>;
  message: z.ZodOptional<z.ZodString>;
  metadata: typeof Metadata;
  observables: z.ZodOptional<z.ZodArray<typeof Observable>>;
  raw_data: z.ZodOptional<z.ZodString>;
  raw_data_hash: z.ZodOptional<typeof Fingerprint>;
  raw_data_size: z.ZodOptional<z.ZodNumber>;
  severity: z.ZodOptional<z.ZodString>;
  severity_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>;
  start_time: z.ZodOptional<z.ZodNumber>;
  status: z.ZodOptional<z.ZodString>;
  status_code: z.ZodOptional<z.ZodString>;
  status_detail: z.ZodOptional<z.ZodString>;
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  time: z.ZodOptional<z.ZodNumber>;
  timezone_offset: z.ZodOptional<z.ZodNumber>;
  type_name: z.ZodOptional<z.ZodString>;
  type_uid: z.ZodNumber;
  unmapped: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  comment: z.ZodOptional<z.ZodString>;
  confidence: z.ZodOptional<z.ZodString>;
  confidence_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  confidence_score: z.ZodOptional<z.ZodNumber>;
  device: z.ZodOptional<typeof Device>;
  finding_info: typeof FindingInfo;
  notes: z.ZodOptional<z.ZodArray<typeof Note>>;
  resources: z.ZodOptional<z.ZodArray<typeof ResourceDetails>>;
  vendor_attributes: z.ZodOptional<typeof VendorAttributes>;
  application: z.ZodOptional<typeof Application>;
  compliance: z.ZodOptional<typeof Compliance>;
  remediation: z.ZodOptional<typeof Remediation>;
  vulnerabilities: z.ZodOptional<z.ZodArray<typeof Vulnerability>>;
};

const ApplicationSecurityPostureFindingSchema: z.ZodObject<ApplicationSecurityPostureFindingShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the finding activity. Use 1 (Create) when a finding is first generated, 2 (Update) when an existing finding is modified (e.g., severity change, new evidence), and 3 (Close) when a finding is resolved or dismissed. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The finding activity name, as defined by the activity_id. When activity_id is 99 (Other), this must contain the source-specific activity label. */
  activity_name: z.string().optional(),
  /** The event category name, as defined by the category_uid value. The value must match the caption defined for the corresponding category_uid enum value (e.g., "Findings" for category_uid: 2). */
  category_name: z.string().optional(),
  /** The category unique identifier of the event. Each event class belongs to exactly one category. Producers and mappers must set this to the category defined by the event class being used. */
  category_uid: z.number().int(),
  /** The event class name, as defined by the class_uid value. The value must match the caption defined for the corresponding class_uid (e.g., "Detection Finding" for class_uid: 2004). */
  class_name: z.string().optional(),
  /** The unique identifier of a class. A class describes the attributes available in an event. Producers and mappers must set this to the uid defined in the event class definition. For example, Detection Finding is 2004. */
  class_uid: z.number().int(),
  /** The number of events aggregated into this single record. Only populate for aggregate events. When set, start_time and end_time should also be provided to define the aggregation window. */
  count: z.number().int().optional(),
  /** The elapsed time of the aggregation window in milliseconds, from start_time to end_time. Only populate for aggregate events (count > 1). The value should equal end_time - start_time. */
  duration: z.number().int().optional(),
  /** The time of the most recent event or finding that contributed to this finding. */
  end_time: z.number().int().optional(),
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments: z.array(Enrichment).optional(),
  /** A human-readable description of the event, as defined by the source. This should be a concise, meaningful summary suitable for display in a UI or alert notification - not a raw log line. For example: "User john_doe logged in from 10.0.0.1." rather than a raw syslog string. */
  message: z.string().optional(),
  /** The metadata object describes the event producer, schema version, and processing information. Producers and mappers must populate metadata.product to identify the data source, and metadata.version to indicate the OCSF schema version used. Consumers rely on this to interpret the event correctly. */
  metadata: Metadata,
  /** The observables array surfaces key indicators and entities from the event or finding in a single, consistent location for downstream correlation and detection. Each entry references an attribute path within the event (e.g., src_endpoint.ip) along with its type and value, enabling consumers to extract IOCs without parsing the full event structure. */
  observables: z.array(Observable).optional(),
  /** The original event/finding data as received from the source, before normalization into OCSF. Populate this with the verbatim log line, JSON payload, or other native format for forensic and debugging purposes. This field is not intended for structured querying - use the normalized OCSF attributes instead. */
  raw_data: z.string().optional(),
  /** A fingerprint (hash) of the raw_data content. Use this to verify the integrity of the original event data or to deduplicate events. */
  raw_data_hash: Fingerprint.optional(),
  /** The size of the original event data (as captured in raw_data) in bytes, before OCSF normalization. Useful for metering and capacity planning. */
  raw_data_size: z.number().int().optional(),
  /** The event/finding severity label, normalized to the caption of the severity_id value. When severity_id is 99 (Other), this attribute must contain the source-specific severity label. For all other values, this should match the caption defined for that severity_id enum value (e.g., "High" for severity_id: 4). */
  severity: z.string().optional(),
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
  /** The time of the earliest event or finding that contributed to this finding. */
  start_time: z.number().int().optional(),
  /** The finding lifecycle status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this must contain the source-specific status label. */
  status: z.string().optional(),
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code: z.string().optional(),
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail: z.string().optional(),
  /** The normalized finding lifecycle status identifier. Unlike the status of an activity event, which indicates the success or failure of the activity, finding status tracks the review and triage workflow: whether the finding is new, being investigated, suppressed, or resolved. Producers should set this to reflect the current state of the finding in their system (e.g., 1 for newly created findings, 4 when remediated). */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The finding creation time - when the finding was first generated, not when the underlying activity occurred. For the time range of contributing events, use start_time and end_time. */
  time: z.number().int().optional(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: z.number().int(),
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped: z.record(z.string(), z.unknown()).optional(),
  /** A user provided comment about the finding. */
  comment: z.string().optional(),
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source and should be the same as confidence_score if also populated.. */
  confidence: z.string().optional(),
  /** The normalized confidence refers to the accuracy of the analytics that produced the finding. An analytic with a low confidence means that the finding scope is wide and may create finding reports that are noisy or may not be malicious in nature. */
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The confidence score as reported by the event source. */
  confidence_score: z.number().int().optional(),
  /** Describes the affected device/host. It can be used in conjunction with resources or when there are multiple devices affected. E.g. The role of the device as target or actor, specific details about a cloud resource compute instance, etc.If a single device is the source of the finding, use the Host profile and populate device. */
  device: Device.optional(),
  /** Describes the supporting information about a generated finding. */
  finding_info: FindingInfo,
  /** Additional notes related to the finding. Each note in the array can include a comment, the user who made the comment, the time when the note was created, and the time when the note was last modified (typically by the same user). Notes can be used to provide additional context, explanations, or observations by analysts related to the finding over time. */
  notes: z.array(Note).optional(),
  /** Describes details about the resource/resources that are affected by the vulnerability/vulnerabilities. */
  resources: z.array(ResourceDetails).optional(),
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes: VendorAttributes.optional(),
  /** An Application describes the details for an inventoried application as reported by an Application Security tool or other Developer-centric tooling. Applications can be defined as Kubernetes resources, Containerized resources, or application hosting-specific cloud sources such as AWS Elastic BeanStalk, AWS Lightsail, or Azure Logic Apps. */
  application: Application.optional(),
  /** Provides compliance context to vulnerabilities and other weaknesses that are reported as part of an Application Security or Vulnerability Management tool's built-in compliance framework mapping. */
  compliance: Compliance.optional(),
  /** Describes the recommended remediation steps to address identified vulnerabilities or weaknesses. */
  remediation: Remediation.optional(),
  /** This object describes vulnerabilities reported in a security finding. */
  vulnerabilities: z.array(Vulnerability).optional(),
});

export const ApplicationSecurityPostureFinding = {
  parse: (data: unknown): ApplicationSecurityPostureFindingType => ApplicationSecurityPostureFindingSchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: ApplicationSecurityPostureFindingType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return ApplicationSecurityPostureFindingSchema.safeParse(preprocessed);
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

  schema: ApplicationSecurityPostureFindingSchema,

  // Value → label maps for every enum field
  labels: ApplicationSecurityPostureFindingLabels,

  // Static enum references for convenience
  ActivityId: ApplicationSecurityPostureFindingActivityId,
  SeverityId: SeverityId,
  StatusId: ApplicationSecurityPostureFindingStatusId,
  ConfidenceId: ConfidenceId,
} as const;
