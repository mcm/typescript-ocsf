import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { OcsfObject } from '../objects/object.js';
import { Device } from '../objects/device.js';
import { FindingInfo } from '../objects/finding_info.js';
import { VendorAttributes } from '../objects/vendor_attributes.js';
import { Application } from '../objects/application.js';
import { Compliance } from '../objects/compliance.js';
import { Remediation } from '../objects/remediation.js';
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
  1: "New",
  2: "In Progress",
  3: "Suppressed",
  4: "Resolved",
  5: "Archived",
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
  classUid: 2007,
};

/**
 * The Application Security Posture Finding event is a notification about any bug, defect, deficiency, exploit, vulnerability, weakness or any other issue with software and related systems. Application Security Posture Findings typically involve reporting on the greater context including compliance, impacted resources, remediation guidance, specific code defects, and/or vulnerability metadata. Application Security Posture Findings can be reported by Threat & Vulnerability Management (TVM) tools, Application Security Posture Management (ASPM) tools, or other similar tools. Note: if the event producer is a security control, the <code>security_control</code> profile should be applied and its <code>attacks</code> information, if present, should be duplicated into the <code>finding_info</code> object. <br><strong>Note: </strong>If the Finding is an incident, i.e. requires incident workflow, also apply the <code>incident</code> profile or aggregate this finding into an <code>Incident Finding</code>.
 *
 * OCSF Class UID: 2007
 * Category: Application Security Posture Finding
 * @see https://schema.ocsf.io/1.5.0/classes/application_security_posture_finding
 */
export const ApplicationSecurityPostureFinding: any = z.preprocess(
  (data) => {
    if (typeof data !== 'object' || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z.object({
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
    unmapped: OcsfObject.optional(),
    /** A user provided comment about the finding. */
    comment: z.string().optional(),
    /** The confidence, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source. */
    confidence: z.string().optional(),
    /** The normalized confidence refers to the accuracy of the rule that created the finding. A rule with a low confidence means that the finding scope is wide and may create finding reports that may not be malicious in nature. */
    confidence_id: z.number().int().optional(),
    /** The confidence score as reported by the event source. */
    confidence_score: z.number().int().optional(),
    /** Describes the affected device/host. It can be used in conjunction with Affected Resource(s). e.g. Specific details about an AWS EC2 instance, that is affected by the Finding. */
    device: Device.optional(),
    /** Describes the supporting information about a generated finding. */
    finding_info: FindingInfo,
    /** The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-prodvided values and consumer-updated values, of key attributes like severity_id.The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability. */
    vendor_attributes: VendorAttributes.optional(),
    /** An Application describes the details for an inventoried application as reported by an Application Security tool or other Developer-centric tooling. Applications can be defined as Kubernetes resources, Containerized resources, or application hosting-specific cloud sources such as AWS Elastic BeanStalk, AWS Lightsail, or Azure Logic Apps. */
    application: Application.optional(),
    /** Provides compliance context to vulnerabilities and other weaknesses that are reported as part of an Application Security or Vulnerability Management tool's built-in compliance framework mapping. */
    compliance: Compliance.optional(),
    /** Describes the recommended remediation steps to address identified vulnerabilities or weaknesses. */
    remediation: Remediation.optional(),
    /** Describes details about the resource/resources that are affected by the vulnerability/vulnerabilities. */
    resources: z.array(ResourceDetails).optional(),
    /** This object describes vulnerabilities reported in a security finding. */
    vulnerabilities: z.array(Vulnerability).optional(),
  }).passthrough(),
);

export type ApplicationSecurityPostureFindingType = z.infer<typeof ApplicationSecurityPostureFinding>;
