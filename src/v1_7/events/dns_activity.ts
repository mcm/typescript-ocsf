import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { OcsfObject } from '../objects/object.js';
import { NetworkConnectionInfo } from '../objects/network_connection_info.js';
import { NetworkTraffic } from '../objects/network_traffic.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { Ja4Fingerprint } from '../objects/ja4_fingerprint.js';
import { NetworkProxy } from '../objects/network_proxy.js';
import { Tls } from '../objects/tls.js';
import { DnsAnswer } from '../objects/dns_answer.js';
import { DnsQuery } from '../objects/dns_query.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Query",
  2: "Response",
  6: "Traffic",
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

const OBSERVATION_POINT_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Source",
  2: "Destination",
  3: "Neither",
  4: "Both",
  99: "Other",
};

const RCODE_ID_LABELS: Record<number, string> = {
  0: "NoError",
  1: "FormError",
  2: "ServError",
  3: "NXDomain",
  4: "NotImp",
  5: "Refused",
  6: "YXDomain",
  7: "YXRRSet",
  8: "NXRRSet",
  9: "NotAuth",
  10: "NotZone",
  11: "DSOTYPENI",
  16: "BADSIG_VERS",
  17: "BADKEY",
  18: "BADTIME",
  19: "BADMODE",
  20: "BADNAME",
  21: "BADALG",
  22: "BADTRUNC",
  23: "BADCOOKIE",
  24: "Unassigned",
  25: "Reserved",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "observation_point_id", labelField: "observation_point", labels: OBSERVATION_POINT_ID_LABELS },
  { idField: "rcode_id", labelField: "rcode", labels: RCODE_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 4,
  classUid: 4003,
};

/**
 * DNS Activity events report DNS queries and answers as seen on the network.
 *
 * OCSF Class UID: 4003
 * Category: DNS Activity
 * @see https://schema.ocsf.io/1.7.0/classes/dns_activity
 */
export const DnsActivity = z.preprocess(
  (data) => {
    if (typeof data !== 'object' || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z.strictObject({
    /** The normalized identifier of the activity that triggered the event. */
    activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(6), z.literal(99)]).optional(),
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
    /** The name of the application associated with the event or object. */
    app_name: z.string().optional(),
    /** The network connection information. */
    connection_info: NetworkConnectionInfo.optional(),
    /** The cumulative (running total) network traffic aggregated from the start of a flow or session. Use when reporting: (1) total accumulated bytes/packets since flow initiation, (2) combined aggregation models where both incremental deltas and running totals are reported together (populate both traffic for the delta and this attribute for the cumulative total), or (3) final summary metrics when a long-lived connection closes. This represents the sum of all activity from flow start to the current observation, not a delta or point-in-time value. */
    cumulative_traffic: NetworkTraffic.optional(),
    /** The network destination endpoint. */
    dst_endpoint: NetworkEndpoint.optional(),
    /** A list of the JA4+ network fingerprints. */
    ja4_fingerprint_list: z.array(Ja4Fingerprint).optional(),
    /** Indicates whether the source network endpoint, destination network endpoint, or neither served as the observation point for the activity. The value is normalized to the caption of the observation_point_id. */
    observation_point: z.string().optional(),
    /** The normalized identifier of the observation point. The observation point identifier indicates whether the source network endpoint, destination network endpoint, or neither served as the observation point for the activity. */
    observation_point_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
    /** The proxy (server) in a network connection. */
    proxy: NetworkProxy.optional(),
    /** The initiator (client) of the network connection. */
    src_endpoint: NetworkEndpoint.optional(),
    /** The Transport Layer Security (TLS) attributes. */
    tls: Tls.optional(),
    /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
    traffic: NetworkTraffic.optional(),
    /** The Domain Name System (DNS) answers. */
    answers: z.array(DnsAnswer).optional(),
    /** The Domain Name System (DNS) query. */
    query: DnsQuery.optional(),
    /** The Domain Name System (DNS) query time. */
    query_time: z.number().int().optional(),
    /** The DNS server response code, normalized to the caption of the rcode_id value. In the case of 'Other', it is defined by the event source. */
    rcode: z.string().optional(),
    /** The normalized identifier of the DNS server response code. See RFC-6895. */
    rcode_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(22), z.literal(23), z.literal(24), z.literal(25), z.literal(99)]).optional(),
    /** The Domain Name System (DNS) response time. */
    response_time: z.number().int().optional(),
  }),
);

export type DnsActivityType = z.infer<typeof DnsActivity>;
