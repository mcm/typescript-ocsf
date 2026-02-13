import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { OcsfObject } from '../objects/object.js';
import { Actor } from '../objects/actor.js';
import { Device } from '../objects/device.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { File } from '../objects/file.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  1: "Clear",
  2: "Delete",
  3: "Export",
  4: "Archive",
  5: "Rotate",
  6: "Start",
  7: "Stop",
  8: "Restart",
  9: "Enable",
  10: "Disable",
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

const LOG_TYPE_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "OS",
  2: "Application",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "log_type_id", labelField: "log_type", labels: LOG_TYPE_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 1,
  classUid: 1008,
};

/**
 * Event Log Activity events report actions pertaining to the system's event logging service(s), such as disabling logging or clearing the log data.
 *
 * OCSF Class UID: 1008
 * Category: Event Log Activity
 * @see https://schema.ocsf.io/1.5.0/classes/event_log_actvity
 */
export const EventLogActvity: any = z.preprocess(
  (data) => {
    if (typeof data !== 'object' || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z.object({
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
    /** The event status code, as reported by the event source.Example: 0, 8, or 21 for Windows ClearEventLog. */
    status_code: z.string().optional(),
    /** The status detail contains additional information about the event outcome.Example: Success, Privilege Missing, or Invalid Parameter for Windows ClearEventLog. */
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
    /** The actor that performed the activity. */
    actor: Actor.optional(),
    /** The device that reported the event. */
    device: Device.optional(),
    /** The targeted endpoint for the event log activity. */
    dst_endpoint: NetworkEndpoint.optional(),
    /** The file targeted by the activity. Example: /var/log/audit.log */
    file: File.optional(),
    /** The name of the event log targeted by the activity. Example: Windows Security. */
    log_name: z.string().optional(),
    /** The logging provider or logging service targeted by the activity.Example: Microsoft-Windows-Security-Auditing, Auditd, or Syslog. */
    log_provider: z.string().optional(),
    /** The log type, normalized to the caption of the log_type_id value. In the case of 'Other', it is defined by the event source. */
    log_type: z.string().optional(),
    /** The normalized log type identifier. */
    log_type_id: z.number().int().optional(),
    /** The source endpoint for the event log activity. */
    src_endpoint: NetworkEndpoint.optional(),
  }).passthrough(),
);

export type EventLogActvityType = z.infer<typeof EventLogActvity>;
