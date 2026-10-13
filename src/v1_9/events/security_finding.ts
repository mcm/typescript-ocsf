import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { AnalyticType } from '../objects/analytic.js';
import type { AttackType } from '../objects/attack.js';
import type { CisCscType } from '../objects/cis_csc.js';
import type { ComplianceType } from '../objects/compliance.js';
import type { FindingType } from '../objects/finding.js';
import type { KillChainPhaseType } from '../objects/kill_chain_phase.js';
import type { MalwareType } from '../objects/malware.js';
import type { ProcessType } from '../objects/process.js';
import type { ResourceDetailsType } from '../objects/resource_details.js';
import type { VulnerabilityType } from '../objects/vulnerability.js';

import { SecurityFindingActivityId } from '../enums/security_finding_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { SecurityFindingStatusId } from '../enums/security_finding_status_id.js';
import { ConfidenceId } from '../enums/index.js';
import { ImpactId } from '../enums/index.js';
import { RiskLevelId } from '../enums/index.js';
import { SecurityFindingStateId } from '../enums/security_finding_state_id.js';

/**
 * Security Finding events describe findings, detections, anomalies, alerts and/or actions performed by security products
 *
 * OCSF Class UID: 2001
 * Category: Security Finding
 * @see https://schema.ocsf.io/1.9.0/classes/security_finding
 */
export interface SecurityFindingType {
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id?: 0 | 1 | 2 | 3 | 99;
  /** The event activity name, as defined by the activity_id. When activity_id is 99 (Other), this attribute must contain the source-specific activity label. For all other activity_id values, this must match the caption defined for that activity_id enum value. */
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
  /** The time of the most recent event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
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
  /** The time of the earliest event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
  start_time?: number;
  /** The event status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this attribute must contain the source-specific status label. For all other values, this must match the caption defined for that status_id enum value (e.g., "Success" for status_id: 1). */
  status?: string;
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code?: string;
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail?: string;
  /** The normalized status of the event outcome. Use this family of attributes to convey the outcome of the activity described by the event. Producers should map their source outcome to 1 (Success) or 2 (Failure). Use 0 (Unknown) when the outcome cannot be determined, and 99 (Other) with a populated status string when the source value does not map cleanly. */
  status_id?: 0 | 1 | 2 | 99;
  /** The primary timestamp of the event - when the activity actually occurred at the source. This does not capture when the event record was created or serialized by the source system; for event lifecycle timestamps such as ingestion and processing, use metadata.logged_time and metadata.processed_time respectively, or the equivalent attributes in the metadata.loggers array when recording pipeline stages. For aggregate events (count > 1), set this to start_time (the earliest OCSF time in the aggregate) to preserve causal ordering and consistent timeline alignment. Note: finding classes redefine time as the finding creation time rather than the activity occurrence time. This must be a UTC epoch value in milliseconds (e.g., 1776881335332). Mappers should use the most precise and authoritative timestamp available from the source. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset?: number;
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: number;
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped?: Record<string, unknown>;
  /** The analytic technique used to analyze and derive insights from the data or information that led to the finding or conclusion. */
  analytic?: AnalyticType;
  /** An array of attack objects, each describing a tactic, technique, and/or sub-technique associated with the Finding. */
  attacks?: AttackType[];
  /** The CIS Critical Security Controls is a list of top 20 actions and practices an organization’s security team can take on such that cyber attacks or malware, are minimized and prevented. */
  cis_csc?: CisCscType[];
  /** The compliance object provides context to compliance findings (e.g., a check against a specific regulatory or best practice framework such as CIS, NIST etc.) and contains compliance related details. */
  compliance?: ComplianceType;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence?: string;
  /** The normalized confidence refers to the accuracy of the analytics that produced the alert or finding. See specific usage. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The confidence score as reported by the event source. */
  confidence_score?: number;
  /** A list of data sources utilized in generation of the finding. */
  data_sources?: string[];
  /** The data the finding exposes to the analyst. */
  evidence?: Record<string, unknown>;
  /** The Finding object provides details about a finding/detection generated by a security tool. */
  finding: FindingType;
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact?: string;
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score?: number;
  /** The Kill Chain provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. */
  kill_chain?: KillChainPhaseType[];
  /** A list of Malware objects, describing details about the identified malware. */
  malware?: MalwareType[];
  /** The NIST Cybersecurity Framework recommendations for managing the cybersecurity risk. */
  nist?: string[];
  /** The process object. */
  process?: ProcessType;
  /** Describes details about resources that were affected by the activity/event. */
  resources?: ResourceDetailsType[];
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level?: string;
  /** The normalized risk level id. */
  risk_level_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The risk score as reported by the event source. */
  risk_score?: number;
  /** The normalized state of a security finding. */
  state?: string;
  /** The normalized state identifier of a security finding. */
  state_id: 0 | 1 | 2 | 3 | 4 | 99;
  /** This object describes vulnerabilities reported in a security finding. */
  vulnerabilities?: VulnerabilityType[];
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { Analytic } from '../objects/analytic.js';
import { Attack } from '../objects/attack.js';
import { CisCsc } from '../objects/cis_csc.js';
import { Compliance } from '../objects/compliance.js';
import { Finding } from '../objects/finding.js';
import { KillChainPhase } from '../objects/kill_chain_phase.js';
import { Malware } from '../objects/malware.js';
import { Process } from '../objects/process.js';
import { ResourceDetails } from '../objects/resource_details.js';
import { Vulnerability } from '../objects/vulnerability.js';

/** Value → label mappings for each enum field of SecurityFinding. */
export const SecurityFindingLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id" | "confidence_id" | "impact_id" | "risk_level_id" | "state_id", Readonly<Record<number, string>>>> = {
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
    1: "Success",
    2: "Failure",
    99: "Other",
  },
  confidence_id: {
    0: "Unknown",
    1: "Low",
    2: "Medium",
    3: "High",
    99: "Other",
  },
  impact_id: {
    0: "Unknown",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
    99: "Other",
  },
  risk_level_id: {
    0: "Info",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
    99: "Other",
  },
  state_id: {
    0: "Unknown",
    1: "New",
    2: "In Progress",
    3: "Suppressed",
    4: "Resolved",
    99: "Other",
  },
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: SecurityFindingLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: SecurityFindingLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: SecurityFindingLabels.status_id },
  { idField: "confidence_id", labelField: "confidence", labels: SecurityFindingLabels.confidence_id },
  { idField: "impact_id", labelField: "impact", labels: SecurityFindingLabels.impact_id },
  { idField: "risk_level_id", labelField: "risk_level", labels: SecurityFindingLabels.risk_level_id },
  { idField: "state_id", labelField: "state", labels: SecurityFindingLabels.state_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 2,
  classUid: 2001,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type SecurityFindingShape = {
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
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>>;
  time: z.ZodNumber;
  timezone_offset: z.ZodOptional<z.ZodNumber>;
  type_name: z.ZodOptional<z.ZodString>;
  type_uid: z.ZodNumber;
  unmapped: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  analytic: z.ZodOptional<typeof Analytic>;
  attacks: z.ZodOptional<z.ZodArray<typeof Attack>>;
  cis_csc: z.ZodOptional<z.ZodArray<typeof CisCsc>>;
  compliance: z.ZodOptional<typeof Compliance>;
  confidence: z.ZodOptional<z.ZodString>;
  confidence_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  confidence_score: z.ZodOptional<z.ZodNumber>;
  data_sources: z.ZodOptional<z.ZodArray<z.ZodString>>;
  evidence: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  finding: typeof Finding;
  impact: z.ZodOptional<z.ZodString>;
  impact_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  impact_score: z.ZodOptional<z.ZodNumber>;
  kill_chain: z.ZodOptional<z.ZodArray<typeof KillChainPhase>>;
  malware: z.ZodOptional<z.ZodArray<typeof Malware>>;
  nist: z.ZodOptional<z.ZodArray<z.ZodString>>;
  process: z.ZodOptional<typeof Process>;
  resources: z.ZodOptional<z.ZodArray<typeof ResourceDetails>>;
  risk_level: z.ZodOptional<z.ZodString>;
  risk_level_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  risk_score: z.ZodOptional<z.ZodNumber>;
  state: z.ZodOptional<z.ZodString>;
  state_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>;
  vulnerabilities: z.ZodOptional<z.ZodArray<typeof Vulnerability>>;
};

const SecurityFindingSchema: z.ZodObject<SecurityFindingShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The event activity name, as defined by the activity_id. When activity_id is 99 (Other), this attribute must contain the source-specific activity label. For all other activity_id values, this must match the caption defined for that activity_id enum value. */
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
  /** The time of the most recent event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
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
  /** The time of the earliest event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
  start_time: z.number().int().optional(),
  /** The event status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this attribute must contain the source-specific status label. For all other values, this must match the caption defined for that status_id enum value (e.g., "Success" for status_id: 1). */
  status: z.string().optional(),
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code: z.string().optional(),
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail: z.string().optional(),
  /** The normalized status of the event outcome. Use this family of attributes to convey the outcome of the activity described by the event. Producers should map their source outcome to 1 (Success) or 2 (Failure). Use 0 (Unknown) when the outcome cannot be determined, and 99 (Other) with a populated status string when the source value does not map cleanly. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
  /** The primary timestamp of the event - when the activity actually occurred at the source. This does not capture when the event record was created or serialized by the source system; for event lifecycle timestamps such as ingestion and processing, use metadata.logged_time and metadata.processed_time respectively, or the equivalent attributes in the metadata.loggers array when recording pipeline stages. For aggregate events (count > 1), set this to start_time (the earliest OCSF time in the aggregate) to preserve causal ordering and consistent timeline alignment. Note: finding classes redefine time as the finding creation time rather than the activity occurrence time. This must be a UTC epoch value in milliseconds (e.g., 1776881335332). Mappers should use the most precise and authoritative timestamp available from the source. */
  time: z.number().int(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: z.number().int(),
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped: z.record(z.string(), z.unknown()).optional(),
  /** The analytic technique used to analyze and derive insights from the data or information that led to the finding or conclusion. */
  analytic: Analytic.optional(),
  /** An array of attack objects, each describing a tactic, technique, and/or sub-technique associated with the Finding. */
  attacks: z.array(Attack).optional(),
  /** The CIS Critical Security Controls is a list of top 20 actions and practices an organization’s security team can take on such that cyber attacks or malware, are minimized and prevented. */
  cis_csc: z.array(CisCsc).optional(),
  /** The compliance object provides context to compliance findings (e.g., a check against a specific regulatory or best practice framework such as CIS, NIST etc.) and contains compliance related details. */
  compliance: Compliance.optional(),
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence: z.string().optional(),
  /** The normalized confidence refers to the accuracy of the analytics that produced the alert or finding. See specific usage. */
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The confidence score as reported by the event source. */
  confidence_score: z.number().int().optional(),
  /** A list of data sources utilized in generation of the finding. */
  data_sources: z.array(z.string()).optional(),
  /** The data the finding exposes to the analyst. */
  evidence: z.record(z.string(), z.unknown()).optional(),
  /** The Finding object provides details about a finding/detection generated by a security tool. */
  finding: Finding,
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact: z.string().optional(),
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score: z.number().int().optional(),
  /** The Kill Chain provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. */
  kill_chain: z.array(KillChainPhase).optional(),
  /** A list of Malware objects, describing details about the identified malware. */
  malware: z.array(Malware).optional(),
  /** The NIST Cybersecurity Framework recommendations for managing the cybersecurity risk. */
  nist: z.array(z.string()).optional(),
  /** The process object. */
  process: Process.optional(),
  /** Describes details about resources that were affected by the activity/event. */
  resources: z.array(ResourceDetails).optional(),
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level: z.string().optional(),
  /** The normalized risk level id. */
  risk_level_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The risk score as reported by the event source. */
  risk_score: z.number().int().optional(),
  /** The normalized state of a security finding. */
  state: z.string().optional(),
  /** The normalized state identifier of a security finding. */
  state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]),
  /** This object describes vulnerabilities reported in a security finding. */
  vulnerabilities: z.array(Vulnerability).optional(),
});

export const SecurityFinding = {
  parse: (data: unknown): SecurityFindingType => SecurityFindingSchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: SecurityFindingType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return SecurityFindingSchema.safeParse(preprocessed);
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

  schema: SecurityFindingSchema,

  // Value → label maps for every enum field
  labels: SecurityFindingLabels,

  // Static enum references for convenience
  ActivityId: SecurityFindingActivityId,
  SeverityId: SeverityId,
  StatusId: SecurityFindingStatusId,
  ConfidenceId: ConfidenceId,
  ImpactId: ImpactId,
  RiskLevelId: RiskLevelId,
  StateId: SecurityFindingStateId,
} as const;
