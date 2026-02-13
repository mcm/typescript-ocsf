import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { OcsfObject } from '../objects/object.js';
import { Policy } from '../objects/policy.js';
import { Scan } from '../objects/scan.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  1: "Started",
  2: "Completed",
  3: "Cancelled",
  4: "Duration Violation",
  5: "Pause Violation",
  6: "Error",
  7: "Paused",
  8: "Resumed",
  9: "Restarted",
  10: "Delayed",
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

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 6,
  classUid: 6007,
};

/**
 * Scan events report the start, completion, and results of a scan job. The scan event includes the number of items that were scanned and the number of detections that were resolved.
 *
 * OCSF Class UID: 6007
 * Category: Scan Activity
 * @see https://schema.ocsf.io/1.5.0/classes/scan_activity
 */
export const ScanActivity: any = z.preprocess(
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
    /** The duration of the scan */
    duration: z.number().int().optional(),
    /** The end time of the scan job. */
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
    /** The start time of the scan job. */
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
    /** The command identifier that is associated with this scan event. This ID uniquely identifies the proactive scan command, e.g., if remotely initiated. */
    command_uid: z.string().optional(),
    /** The number of detections. */
    num_detections: z.number().int().optional(),
    /** The number of files scanned. */
    num_files: z.number().int().optional(),
    /** The number of folders scanned. */
    num_folders: z.number().int().optional(),
    /** The number of network items scanned. */
    num_network_items: z.number().int().optional(),
    /** The number of processes scanned. */
    num_processes: z.number().int().optional(),
    /** The number of registry items scanned. */
    num_registry_items: z.number().int().optional(),
    /** The number of items that were resolved. */
    num_resolutions: z.number().int().optional(),
    /** The number of skipped items. */
    num_skipped_items: z.number().int().optional(),
    /** The number of trusted items. */
    num_trusted_items: z.number().int().optional(),
    /** The policy associated with this Scan event; required if the scan was initiated by a policy. */
    policy: Policy.optional(),
    /** The Scan object describes characteristics of the scan job. */
    scan: Scan,
    /** The unique identifier of the schedule associated with a scan job. */
    schedule_uid: z.string().optional(),
    /** The total number of items that were scanned; zero if no items were scanned. */
    total: z.number().int().optional(),
  }).passthrough(),
);

export type ScanActivityType = z.infer<typeof ScanActivity>;
