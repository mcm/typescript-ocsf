import { z } from "zod";
import { type SiblingPair, reconcileSiblings } from "../../sibling.js";
import { type UidConfig, prefillUids } from "../../uid.js";

import { Attack, type AttackType } from "../objects/attack.js";
import { Enrichment, type EnrichmentType } from "../objects/enrichment.js";
import { FindingInfo, type FindingInfoType } from "../objects/finding_info.js";
import { Fingerprint, type FingerprintType } from "../objects/fingerprint.js";
import { Group, type GroupType } from "../objects/group.js";
import { Metadata, type MetadataType } from "../objects/metadata.js";
import { OcsfObject, type OcsfObjectType } from "../objects/object.js";
import { Observable, type ObservableType } from "../objects/observable.js";
import { Ticket, type TicketType } from "../objects/ticket.js";
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
  3: "On Hold",
  4: "Resolved",
  5: "Closed",
};

const CONFIDENCE_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  99: "Other",
};

const IMPACT_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  99: "Other",
};

const PRIORITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  99: "Other",
};

const VERDICT_ID_LABELS: Record<number, string> = {
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
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "confidence_id", labelField: "confidence", labels: CONFIDENCE_ID_LABELS },
  { idField: "impact_id", labelField: "impact", labels: IMPACT_ID_LABELS },
  { idField: "priority_id", labelField: "priority", labels: PRIORITY_ID_LABELS },
  { idField: "verdict_id", labelField: "verdict", labels: VERDICT_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 2,
  classUid: 2005,
};

/**
 * An Incident Finding reports the creation, update, or closure of security incidents as a result of detections and/or analytics. <br><strong>Note: </strong><code>Incident Finding</code> implicitly includes the <code>incident</code> profile and it should be added to the <code>metadata.profiles[]</code> array.
 *
 * OCSF Class UID: 2005
 * Category: Incident Finding
 * @see https://schema.ocsf.io/1.7.0/classes/incident_finding
 */
export interface IncidentFindingType {
  /** The normalized identifier of the Incident activity. */
  activity_id: number;
  /** The Incident activity name, as defined by the activity_id. */
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
  /** The time of the most recent event included in the incident. */
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
  /** The time of the least recent event included in the incident. */
  start_time?: number | undefined;
  /** The normalized status of the Incident normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status?: string | undefined;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string | undefined;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string | undefined;
  /** The normalized status identifier of the Incident. */
  status_id: number;
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
  /** The details of the user assigned to an Incident. */
  assignee?: UserType | undefined;
  /** The details of the group assigned to an Incident. */
  assignee_group?: GroupType | undefined;
  /** An array of MITRE ATT&CK® objects describing the tactics, techniques & sub-techniques associated to the Incident. */
  attacks?: AttackType[] | undefined;
  /** Additional user supplied details for updating or closing the incident. */
  comment?: string | undefined;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence?: string | undefined;
  /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
  confidence_id?: number | undefined;
  /** The confidence score as reported by the event source. */
  confidence_score?: number | undefined;
  /** The short description of the Incident. */
  desc?: string | undefined;
  /** A list of finding_info objects associated to an incident. */
  finding_info_list: FindingInfoType[];
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact?: string | undefined;
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id?: number | undefined;
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score?: number | undefined;
  /** A determination based on analytics as to whether a potential breach was found. */
  is_suspected_breach?: boolean | undefined;
  /** The priority, normalized to the caption of the priority_id value. In the case of 'Other', it is defined by the event source. */
  priority?: string | undefined;
  /** The normalized priority. Priority identifies the relative importance of the incident or finding. It is a measurement of urgency. */
  priority_id?: number | undefined;
  /** A Url link used to access the original incident. */
  src_url?: string | undefined;
  /** The linked ticket in the ticketing system. */
  ticket?: TicketType | undefined;
  /** The associated ticket(s) in the ticketing system. Each ticket contains details like ticket ID, status, etc. */
  tickets?: TicketType[] | undefined;
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes?: VendorAttributesType | undefined;
  /** The verdict assigned to an Incident finding. */
  verdict?: string | undefined;
  /** The normalized verdict of an Incident. */
  verdict_id?: number | undefined;
  [key: string]: unknown;
}

export const IncidentFinding: z.ZodType<IncidentFindingType> = z.preprocess(
  (data) => {
    if (typeof data !== "object" || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z
    .object({
      /** The normalized identifier of the Incident activity. */
      activity_id: z.number().int(),
      /** The Incident activity name, as defined by the activity_id. */
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
      /** The time of the most recent event included in the incident. */
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
      /** The time of the least recent event included in the incident. */
      start_time: z.number().int().optional(),
      /** The normalized status of the Incident normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
      status: z.string().optional(),
      /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
      status_code: z.string().optional(),
      /** The status detail contains additional information about the event/finding outcome. */
      status_detail: z.string().optional(),
      /** The normalized status identifier of the Incident. */
      status_id: z.number().int(),
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
      /** The details of the user assigned to an Incident. */
      assignee: z.lazy(() => User).optional(),
      /** The details of the group assigned to an Incident. */
      assignee_group: z.lazy(() => Group).optional(),
      /** An array of MITRE ATT&CK® objects describing the tactics, techniques & sub-techniques associated to the Incident. */
      attacks: z.array(z.lazy(() => Attack)).optional(),
      /** Additional user supplied details for updating or closing the incident. */
      comment: z.string().optional(),
      /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
      confidence: z.string().optional(),
      /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
      confidence_id: z.number().int().optional(),
      /** The confidence score as reported by the event source. */
      confidence_score: z.number().int().optional(),
      /** The short description of the Incident. */
      desc: z.string().optional(),
      /** A list of finding_info objects associated to an incident. */
      finding_info_list: z.array(z.lazy(() => FindingInfo)),
      /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
      impact: z.string().optional(),
      /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
      impact_id: z.number().int().optional(),
      /** The impact as an integer value of the finding, valid range 0-100. */
      impact_score: z.number().int().optional(),
      /** A determination based on analytics as to whether a potential breach was found. */
      is_suspected_breach: z.boolean().optional(),
      /** The priority, normalized to the caption of the priority_id value. In the case of 'Other', it is defined by the event source. */
      priority: z.string().optional(),
      /** The normalized priority. Priority identifies the relative importance of the incident or finding. It is a measurement of urgency. */
      priority_id: z.number().int().optional(),
      /** A Url link used to access the original incident. */
      src_url: z.string().optional(),
      /** The linked ticket in the ticketing system. */
      ticket: z.lazy(() => Ticket).optional(),
      /** The associated ticket(s) in the ticketing system. Each ticket contains details like ticket ID, status, etc. */
      tickets: z.array(z.lazy(() => Ticket)).optional(),
      /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
      vendor_attributes: z.lazy(() => VendorAttributes).optional(),
      /** The verdict assigned to an Incident finding. */
      verdict: z.string().optional(),
      /** The normalized verdict of an Incident. */
      verdict_id: z.number().int().optional(),
    })
    .passthrough(),
) as any;
