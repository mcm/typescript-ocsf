import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { OcsfObject } from '../objects/object.js';
import { NetworkConnectionInfo } from '../objects/network_connection_info.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { Ja4Fingerprint } from '../objects/ja4_fingerprint.js';
import { NetworkProxy } from '../objects/network_proxy.js';
import { Tls } from '../objects/tls.js';
import { NetworkTraffic } from '../objects/network_traffic.js';
import { NetworkInterface } from '../objects/network_interface.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Discover",
  2: "Offer",
  3: "Request",
  4: "Decline",
  5: "Ack",
  6: "Nak",
  7: "Release",
  8: "Inform",
  9: "Expire",
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

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 4,
  classUid: 4004,
};

/**
 * DHCP Activity events report MAC to IP assignment via DHCP from a client or server.
 *
 * OCSF Class UID: 4004
 * Category: DHCP Activity
 * @see https://schema.ocsf.io/1.5.0/classes/dhcp_activity
 */
export const DhcpActivity = z.preprocess(
  (data) => {
    if (typeof data !== 'object' || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z.strictObject({
    /** The normalized identifier of the activity that triggered the event. */
    activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(99)]),
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
    /** The name of the application associated with the event or object. */
    app_name: z.string().optional(),
    /** The network connection information. */
    connection_info: NetworkConnectionInfo.optional(),
    /** The responder (server) of the DHCP connection. */
    dst_endpoint: NetworkEndpoint.optional(),
    /** A list of the JA4+ network fingerprints. */
    ja4_fingerprint_list: z.array(Ja4Fingerprint).optional(),
    /** The proxy (server) in a network connection. */
    proxy: NetworkProxy.optional(),
    /** The initiator (client) of the DHCP connection. */
    src_endpoint: NetworkEndpoint.optional(),
    /** The Transport Layer Security (TLS) attributes. */
    tls: Tls.optional(),
    /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
    traffic: NetworkTraffic.optional(),
    /** Indicates whether this is a lease/session renewal event. */
    is_renewal: z.boolean().optional(),
    /** This represents the length of the DHCP lease in seconds. This is present in DHCP Ack events. */
    lease_dur: z.number().int().optional(),
    /** The network relay that is associated with the event. */
    relay: NetworkInterface.optional(),
    /** The unique identifier of the transaction. This is typically a random number generated from the client to associate a dhcp request/response pair. */
    transaction_uid: z.string().optional(),
  }),
);

export type DhcpActivityType = z.infer<typeof DhcpActivity>;
