import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { UserType } from '../objects/user.js';
import type { GroupType } from '../objects/group.js';
import type { AttackType } from '../objects/attack.js';
import type { FindingInfoType } from '../objects/finding_info.js';
import type { NoteType } from '../objects/note.js';
import type { TicketType } from '../objects/ticket.js';
import type { VendorAttributesType } from '../objects/vendor_attributes.js';

import { IncidentFindingActivityId } from '../enums/incident_finding_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { IncidentFindingStatusId } from '../enums/incident_finding_status_id.js';
import { ConfidenceId } from '../enums/index.js';
import { ImpactId } from '../enums/index.js';
import { PriorityId } from '../enums/index.js';
import { VerdictId } from '../enums/index.js';

/**
 * An Incident Finding reports the creation, update, or closure of security incidents as a result of detections and/or analytics. <br><strong>Note: </strong><code>Incident Finding</code> implicitly includes the <code>incident</code> profile and it should be added to the <code>metadata.profiles[]</code> array.
 *
 * OCSF Class UID: 2005
 * Category: Incident Finding
 * @see https://schema.ocsf.io/1.9.0/classes/incident_finding
 */
export interface IncidentFindingType {
  /** The normalized identifier of the incident activity. Use 1 (Create) when an incident is first opened, 2 (Update) when an existing incident is modified (e.g., new findings added, priority changed, assignee updated), and 3 (Close) when the incident is resolved. */
  activity_id: 0 | 1 | 2 | 3 | 99;
  /** The incident activity name, as defined by the activity_id. When activity_id is 99 (Other), this must contain the source-specific activity label. */
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
  /** The time of the most recent event or finding that contributed to this incident. */
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
  /** The time of the earliest event or finding that contributed to this incident. */
  start_time?: number;
  /** The incident lifecycle status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this must contain the source-specific status label. */
  status?: string;
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code?: string;
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail?: string;
  /** The normalized incident lifecycle status identifier. This tracks the incident management workflow from initial triage through resolution. Producers should set this to reflect the current state in their incident management system. */
  status_id: 0 | 1 | 2 | 3 | 4 | 5 | 99;
  /** The incident creation time - when the incident was first opened, not when the underlying activity occurred. For the time range of contributing events, use start_time and end_time. */
  time?: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset?: number;
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: number;
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped?: Record<string, unknown>;
  /** The details of the user assigned to an Incident. */
  assignee?: UserType;
  /** The details of the group assigned to an Incident. */
  assignee_group?: GroupType;
  /** An array of attack objects, each describing a tactic, technique, and/or sub-technique associated with the Incident. */
  attacks?: AttackType[];
  /** Additional user supplied details for updating or closing the incident. */
  comment?: string;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence?: string;
  /** The normalized identifier of the confidence level for this incident, representing a summary across all aggregated findings. It reflects the accuracy of the analytics that produced those findings. A lower confidence value indicates a wider finding scope that may produce noisy or potentially non-malicious reports. When the value is 99 (Other), the confidence attribute must contain the incident-specific label. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The confidence score assigned to the incident by the system or analyst, expressed on a source-specific numeric scale. This score provides finer-grained confidence information than the categorical confidence_id value. When confidence_id is 99 (Other), the confidence attribute should reflect the same assessment if both are populated. */
  confidence_score?: number;
  /** The short description of the Incident. */
  desc?: string;
  /** A list of finding_info objects. */
  finding_info_list: FindingInfoType[];
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact?: string;
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score?: number;
  /** A determination based on analytics as to whether a potential breach was found. */
  is_suspected_breach?: boolean;
  /** Additional notes related to the finding. Each note in the array can include a comment, the user who made the comment, the time when the note was created, and the time when the note was last modified (typically by the same user). Notes can be used to provide additional context, explanations, or observations by analysts related to the incident over time. */
  notes?: NoteType[];
  /** The priority, normalized to the caption of the priority_id value. In the case of 'Other', it is defined by the event source. */
  priority?: string;
  /** The normalized priority. Priority identifies the relative importance of the incident or finding. It is a measurement of urgency. */
  priority_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** A Url link used to access the original incident. */
  src_url?: string;
  /** The linked ticket in the ticketing system. */
  ticket?: TicketType;
  /** The associated ticket(s) in the ticketing system. Each ticket contains details like ticket ID, status, etc. */
  tickets?: TicketType[];
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes?: VendorAttributesType;
  /** The verdict assigned to an Incident finding. */
  verdict?: string;
  /** The normalized verdict of an Incident. */
  verdict_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { User } from '../objects/user.js';
import { Group } from '../objects/group.js';
import { Attack } from '../objects/attack.js';
import { FindingInfo } from '../objects/finding_info.js';
import { Note } from '../objects/note.js';
import { Ticket } from '../objects/ticket.js';
import { VendorAttributes } from '../objects/vendor_attributes.js';

/** Value → label mappings for each enum field of IncidentFinding. */
export const IncidentFindingLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id" | "confidence_id" | "impact_id" | "priority_id" | "verdict_id", Readonly<Record<number, string>>>> = {
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
    3: "On Hold",
    4: "Resolved",
    5: "Closed",
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
  priority_id: {
    0: "Unknown",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
    99: "Other",
  },
  verdict_id: {
    0: "Unknown",
    1: "False Positive",
    2: "True Positive",
    3: "Disregard",
    4: "Suspicious",
    5: "Benign",
    6: "Test",
    7: "Insufficient Data",
    8: "Security Risk",
    9: "Managed Externally",
    10: "Duplicate",
    99: "Other",
  },
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: IncidentFindingLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: IncidentFindingLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: IncidentFindingLabels.status_id },
  { idField: "confidence_id", labelField: "confidence", labels: IncidentFindingLabels.confidence_id },
  { idField: "impact_id", labelField: "impact", labels: IncidentFindingLabels.impact_id },
  { idField: "priority_id", labelField: "priority", labels: IncidentFindingLabels.priority_id },
  { idField: "verdict_id", labelField: "verdict", labels: IncidentFindingLabels.verdict_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 2,
  classUid: 2005,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type IncidentFindingShape = {
  activity_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>;
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
  status_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<99>]>;
  time: z.ZodOptional<z.ZodNumber>;
  timezone_offset: z.ZodOptional<z.ZodNumber>;
  type_name: z.ZodOptional<z.ZodString>;
  type_uid: z.ZodNumber;
  unmapped: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  assignee: z.ZodOptional<typeof User>;
  assignee_group: z.ZodOptional<typeof Group>;
  attacks: z.ZodOptional<z.ZodArray<typeof Attack>>;
  comment: z.ZodOptional<z.ZodString>;
  confidence: z.ZodOptional<z.ZodString>;
  confidence_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  confidence_score: z.ZodOptional<z.ZodNumber>;
  desc: z.ZodOptional<z.ZodString>;
  finding_info_list: z.ZodArray<typeof FindingInfo>;
  impact: z.ZodOptional<z.ZodString>;
  impact_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  impact_score: z.ZodOptional<z.ZodNumber>;
  is_suspected_breach: z.ZodOptional<z.ZodBoolean>;
  notes: z.ZodOptional<z.ZodArray<typeof Note>>;
  priority: z.ZodOptional<z.ZodString>;
  priority_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  src_url: z.ZodOptional<z.ZodString>;
  ticket: z.ZodOptional<typeof Ticket>;
  tickets: z.ZodOptional<z.ZodArray<typeof Ticket>>;
  vendor_attributes: z.ZodOptional<typeof VendorAttributes>;
  verdict: z.ZodOptional<z.ZodString>;
  verdict_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<99>]>>;
};

const IncidentFindingSchema: z.ZodObject<IncidentFindingShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the incident activity. Use 1 (Create) when an incident is first opened, 2 (Update) when an existing incident is modified (e.g., new findings added, priority changed, assignee updated), and 3 (Close) when the incident is resolved. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]),
  /** The incident activity name, as defined by the activity_id. When activity_id is 99 (Other), this must contain the source-specific activity label. */
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
  /** The time of the most recent event or finding that contributed to this incident. */
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
  /** The time of the earliest event or finding that contributed to this incident. */
  start_time: z.number().int().optional(),
  /** The incident lifecycle status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this must contain the source-specific status label. */
  status: z.string().optional(),
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code: z.string().optional(),
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail: z.string().optional(),
  /** The normalized incident lifecycle status identifier. This tracks the incident management workflow from initial triage through resolution. Producers should set this to reflect the current state in their incident management system. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]),
  /** The incident creation time - when the incident was first opened, not when the underlying activity occurred. For the time range of contributing events, use start_time and end_time. */
  time: z.number().int().optional(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: z.number().int(),
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped: z.record(z.string(), z.unknown()).optional(),
  /** The details of the user assigned to an Incident. */
  assignee: User.optional(),
  /** The details of the group assigned to an Incident. */
  assignee_group: Group.optional(),
  /** An array of attack objects, each describing a tactic, technique, and/or sub-technique associated with the Incident. */
  attacks: z.array(Attack).optional(),
  /** Additional user supplied details for updating or closing the incident. */
  comment: z.string().optional(),
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence: z.string().optional(),
  /** The normalized identifier of the confidence level for this incident, representing a summary across all aggregated findings. It reflects the accuracy of the analytics that produced those findings. A lower confidence value indicates a wider finding scope that may produce noisy or potentially non-malicious reports. When the value is 99 (Other), the confidence attribute must contain the incident-specific label. */
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The confidence score assigned to the incident by the system or analyst, expressed on a source-specific numeric scale. This score provides finer-grained confidence information than the categorical confidence_id value. When confidence_id is 99 (Other), the confidence attribute should reflect the same assessment if both are populated. */
  confidence_score: z.number().int().optional(),
  /** The short description of the Incident. */
  desc: z.string().optional(),
  /** A list of finding_info objects. */
  finding_info_list: z.array(FindingInfo),
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact: z.string().optional(),
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score: z.number().int().optional(),
  /** A determination based on analytics as to whether a potential breach was found. */
  is_suspected_breach: z.boolean().optional(),
  /** Additional notes related to the finding. Each note in the array can include a comment, the user who made the comment, the time when the note was created, and the time when the note was last modified (typically by the same user). Notes can be used to provide additional context, explanations, or observations by analysts related to the incident over time. */
  notes: z.array(Note).optional(),
  /** The priority, normalized to the caption of the priority_id value. In the case of 'Other', it is defined by the event source. */
  priority: z.string().optional(),
  /** The normalized priority. Priority identifies the relative importance of the incident or finding. It is a measurement of urgency. */
  priority_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** A Url link used to access the original incident. */
  src_url: z.string().optional(),
  /** The linked ticket in the ticketing system. */
  ticket: Ticket.optional(),
  /** The associated ticket(s) in the ticketing system. Each ticket contains details like ticket ID, status, etc. */
  tickets: z.array(Ticket).optional(),
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes: VendorAttributes.optional(),
  /** The verdict assigned to an Incident finding. */
  verdict: z.string().optional(),
  /** The normalized verdict of an Incident. */
  verdict_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]).optional(),
});

export const IncidentFinding = {
  parse: (data: unknown): IncidentFindingType => IncidentFindingSchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: IncidentFindingType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return IncidentFindingSchema.safeParse(preprocessed);
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

  schema: IncidentFindingSchema,

  // Value → label maps for every enum field
  labels: IncidentFindingLabels,

  // Static enum references for convenience
  ActivityId: IncidentFindingActivityId,
  SeverityId: SeverityId,
  StatusId: IncidentFindingStatusId,
  ConfidenceId: ConfidenceId,
  ImpactId: ImpactId,
  PriorityId: PriorityId,
  VerdictId: VerdictId,
} as const;
