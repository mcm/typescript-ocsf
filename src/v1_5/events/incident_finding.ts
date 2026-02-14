import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { OcsfObjectType } from '../objects/object.js';
import type { UserType } from '../objects/user.js';
import type { GroupType } from '../objects/group.js';
import type { AttackType } from '../objects/attack.js';
import type { FindingInfoType } from '../objects/finding_info.js';
import type { TicketType } from '../objects/ticket.js';
import type { VendorAttributesType } from '../objects/vendor_attributes.js';

/**
 * An Incident Finding reports the creation, update, or closure of security incidents as a result of detections and/or analytics. <br><strong>Note: </strong><code>Incident Finding</code> implicitly includes the <code>incident</code> profile and it should be added to the <code>metadata.profiles[]</code> array.
 *
 * OCSF Class UID: 2005
 * Category: Incident Finding
 * @see https://schema.ocsf.io/1.5.0/classes/incident_finding
 */
export interface IncidentFindingType {
  /** The normalized identifier of the Incident activity. */
  activity_id: 0 | 1 | 2 | 3 | 99;
  /** The Incident activity name, as defined by the activity_id. */
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
  /** The time of the most recent event included in the incident. */
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
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The time of the least recent event included in the incident. */
  start_time?: number;
  /** The normalized status of the Incident normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status?: string;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string;
  /** The normalized status identifier of the Incident. */
  status_id: 0 | 1 | 2 | 3 | 4 | 5 | 99;
  /** The normalized event occurrence time or the finding creation time. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset?: number;
  /** The event/finding type name, as defined by the type_uid. */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: number;
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped?: OcsfObjectType;
  /** The details of the user assigned to an Incident. */
  assignee?: UserType;
  /** The details of the group assigned to an Incident. */
  assignee_group?: GroupType;
  /** An array of MITRE ATT&CK® objects describing the tactics, techniques & sub-techniques associated to the Incident. */
  attacks?: AttackType[];
  /** Additional user supplied details for updating or closing the incident. */
  comment?: string;
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence?: string;
  /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The confidence score as reported by the event source. */
  confidence_score?: number;
  /** The short description of the Incident. */
  desc?: string;
  /** A list of finding_info objects associated to an incident. */
  finding_info_list: FindingInfoType[];
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact?: string;
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score?: number;
  /** A determination based on analytics as to whether a potential breach was found. */
  is_suspected_breach?: boolean;
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
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-prodvided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
  vendor_attributes?: VendorAttributesType;
  /** The verdict assigned to an Incident finding. */
  verdict?: string;
  /** The normalized verdict of an Incident. */
  verdict_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { OcsfObject } from '../objects/object.js';
import { User } from '../objects/user.js';
import { Group } from '../objects/group.js';
import { Attack } from '../objects/attack.js';
import { FindingInfo } from '../objects/finding_info.js';
import { Ticket } from '../objects/ticket.js';
import { VendorAttributes } from '../objects/vendor_attributes.js';

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
  3: "On Hold",
  4: "Resolved",
  5: "Closed",
  99: "Other",
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

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

const IncidentFindingSchema: z.ZodType<IncidentFindingType> = z.strictObject({
  /** The normalized identifier of the Incident activity. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]),
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
  enrichments: z.array(Enrichment).optional(),
  /** The description of the event/finding, as defined by the source. */
  message: z.string().optional(),
  /** The metadata associated with the event or a finding. */
  metadata: Metadata,
  /** The observables associated with the event or a finding. */
  observables: z.array(Observable).optional(),
  /** The raw event/finding data as received from the source. */
  raw_data: z.string().optional(),
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size: z.number().int().optional(),
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
  /** The time of the least recent event included in the incident. */
  start_time: z.number().int().optional(),
  /** The normalized status of the Incident normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status: z.string().optional(),
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code: z.string().optional(),
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail: z.string().optional(),
  /** The normalized status identifier of the Incident. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]),
  /** The normalized event occurrence time or the finding creation time. */
  time: z.number().int(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, as defined by the type_uid. */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: z.number().int(),
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped: OcsfObject.optional(),
  /** The details of the user assigned to an Incident. */
  assignee: User.optional(),
  /** The details of the group assigned to an Incident. */
  assignee_group: Group.optional(),
  /** An array of MITRE ATT&CK® objects describing the tactics, techniques & sub-techniques associated to the Incident. */
  attacks: z.array(Attack).optional(),
  /** Additional user supplied details for updating or closing the incident. */
  comment: z.string().optional(),
  /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
  confidence: z.string().optional(),
  /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The confidence score as reported by the event source. */
  confidence_score: z.number().int().optional(),
  /** The short description of the Incident. */
  desc: z.string().optional(),
  /** A list of finding_info objects associated to an incident. */
  finding_info_list: z.array(FindingInfo),
  /** The impact , normalized to the caption of the impact_id value. In the case of 'Other', it is defined by the event source. */
  impact: z.string().optional(),
  /** The normalized impact of the incident or finding. Per NIST, this is the magnitude of harm that can be expected to result from the consequences of unauthorized disclosure, modification, destruction, or loss of information or information system availability. */
  impact_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The impact as an integer value of the finding, valid range 0-100. */
  impact_score: z.number().int().optional(),
  /** A determination based on analytics as to whether a potential breach was found. */
  is_suspected_breach: z.boolean().optional(),
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
  /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-prodvided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
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
};
