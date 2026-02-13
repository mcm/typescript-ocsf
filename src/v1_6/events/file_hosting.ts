import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { OcsfObject } from '../objects/object.js';
import { Actor } from '../objects/actor.js';
import { NetworkConnectionInfo } from '../objects/network_connection_info.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { File } from '../objects/file.js';
import { HttpRequest } from '../objects/http_request.js';
import { HttpResponse } from '../objects/http_response.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Upload",
  2: "Download",
  3: "Update",
  4: "Delete",
  5: "Rename",
  6: "Copy",
  7: "Move",
  8: "Restore",
  9: "Preview",
  10: "Lock",
  11: "Unlock",
  12: "Share",
  13: "Unshare",
  14: "Open",
  15: "Sync",
  16: "Unsync",
  17: "Access Check",
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
  1: "Success",
  2: "Failure",
  99: "Other",
};

const SHARE_TYPE_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "File",
  2: "Pipe",
  3: "Print",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "share_type_id", labelField: "share_type", labels: SHARE_TYPE_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 6,
  classUid: 6006,
};

/**
 * File Hosting Activity events report the actions taken by file management applications, including file sharing servers like Sharepoint and services such as Box, MS OneDrive, Google Drive, or network file share services.
 *
 * OCSF Class UID: 6006
 * Category: File Hosting Activity
 * @see https://schema.ocsf.io/1.6.0/classes/file_hosting
 */
export const FileHosting = z.preprocess(
  (data) => {
    if (typeof data !== 'object' || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z.strictObject({
    /** The normalized identifier of the activity that triggered the event. */
    activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(99)]).optional(),
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
    /** The hash, which describes the content of the raw_data field. */
    raw_data_hash: Fingerprint.optional(),
    /** The size of the raw data which was transformed into an OCSF event, in bytes. */
    raw_data_size: z.number().int().optional(),
    /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
    severity: z.string().optional(),
    /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
    severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
    /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
    start_time: z.number().int().optional(),
    /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
    status: z.string().optional(),
    /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
    status_code: z.string().optional(),
    /** The status detail contains additional information about the event/finding outcome. */
    status_detail: z.string().optional(),
    /** The normalized identifier of the event status. */
    status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
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
    /** The list of requested access rights. */
    access_list: z.array(z.string()).optional(),
    /** The sum of hexadecimal values of requested access rights. */
    access_mask: z.number().int().optional(),
    /** The list of access check results. */
    access_result: z.record(z.string(), z.unknown()).optional(),
    /** The actor that performed the activity on the target file. */
    actor: Actor,
    /** The network connection information. */
    connection_info: NetworkConnectionInfo.optional(),
    /** The endpoint that received the activity on the target file. */
    dst_endpoint: NetworkEndpoint.optional(),
    /** The share expiration time. */
    expiration_time: z.number().int().optional(),
    /** The file that is the target of the activity. */
    file: File,
    /** The resulting file object when the activity was allowed and successful. */
    file_result: File.optional(),
    /** Details about the underlying HTTP request. */
    http_request: HttpRequest.optional(),
    /** Details about the HTTP response, if available. */
    http_response: HttpResponse.optional(),
    /** The share name. */
    share: z.string().optional(),
    /** The share type, normalized to the caption of the share_type_id value. In the case of 'Other', it is defined by the event source. */
    share_type: z.string().optional(),
    /** The normalized identifier of the share type. */
    share_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
    /** The endpoint that performed the activity on the target file. */
    src_endpoint: NetworkEndpoint,
  }),
);

export type FileHostingType = z.infer<typeof FileHosting>;
