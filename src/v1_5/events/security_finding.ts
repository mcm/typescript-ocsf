import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { OcsfObject } from '../objects/object.js';
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
  0: "Unknown",
  1: "Success",
  2: "Failure",
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

const RISK_LEVEL_ID_LABELS: Record<number, string> = {
  0: "Info",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  99: "Other",
};

const STATE_ID_LABELS: Record<number, string> = {
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "confidence_id", labelField: "confidence", labels: CONFIDENCE_ID_LABELS },
  { idField: "impact_id", labelField: "impact", labels: IMPACT_ID_LABELS },
  { idField: "risk_level_id", labelField: "risk_level", labels: RISK_LEVEL_ID_LABELS },
  { idField: "state_id", labelField: "state", labels: STATE_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 2,
  classUid: 2001,
};

/**
 * Security Finding events describe findings, detections, anomalies, alerts and/or actions performed by security products
 *
 * OCSF Class UID: 2001
 * Category: Security Finding
 * @see https://schema.ocsf.io/1.5.0/classes/security_finding
 */
export const SecurityFinding = z.preprocess(
  (data) => {
    if (typeof data !== 'object' || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z.strictObject({
    /** The normalized identifier of the activity that triggered the event. */
    activity_id: z.number().int().optional(),
    /** The event activity name, as defined by the activity_id. */
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
    /** The end time of a time period, or the time of the most recent event included in the aggregate event. */
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
    severity_id: z.number().int(),
    /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
    start_time: z.number().int().optional(),
    /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
    status: z.string().optional(),
    /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
    status_code: z.string().optional(),
    /** The status detail contains additional information about the event/finding outcome. */
    status_detail: z.string().optional(),
    /** The normalized identifier of the event status. */
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
    unmapped: OcsfObject.optional(),
    /** The analytic technique used to analyze and derive insights from the data or information that led to the finding or conclusion. */
    analytic: Analytic.optional(),
    /** An array of MITRE ATT&CK® objects describing the tactics, techniques & sub-techniques associated to the Finding. */
    attacks: z.array(Attack).optional(),
    /** The CIS Critical Security Controls is a list of top 20 actions and practices an organization’s security team can take on such that cyber attacks or malware, are minimized and prevented. */
    cis_csc: z.array(CisCsc).optional(),
    /** The compliance object provides context to compliance findings (e.g., a check against a specific regulatory or best practice framework such as CIS, NIST etc.) and contains compliance related details. */
    compliance: Compliance.optional(),
    /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
    confidence: z.string().optional(),
    /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
    confidence_id: z.number().int().optional(),
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
    impact_id: z.number().int().optional(),
    /** The impact as an integer value of the finding, valid range 0-100. */
    impact_score: z.number().int().optional(),
    /** The Cyber Kill Chain® provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. */
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
    risk_level_id: z.number().int().optional(),
    /** The risk score as reported by the event source. */
    risk_score: z.number().int().optional(),
    /** The normalized state of a security finding. */
    state: z.string().optional(),
    /** The normalized state identifier of a security finding. */
    state_id: z.number().int(),
    /** This object describes vulnerabilities reported in a security finding. */
    vulnerabilities: z.array(Vulnerability).optional(),
  }),
);

export type SecurityFindingType = z.infer<typeof SecurityFinding>;
