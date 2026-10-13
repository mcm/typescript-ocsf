import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { NetworkConnectionInfoType } from '../objects/network_connection_info.js';
import type { NetworkTrafficType } from '../objects/network_traffic.js';
import type { NetworkEndpointType } from '../objects/network_endpoint.js';
import type { Ja4FingerprintType } from '../objects/ja4_fingerprint.js';
import type { PacketType } from '../objects/packet.js';
import type { NetworkProxyType } from '../objects/network_proxy.js';
import type { TlsType } from '../objects/tls.js';
import type { FileType } from '../objects/file.js';
import type { HttpCookieType } from '../objects/http_cookie.js';
import type { HttpRequestType } from '../objects/http_request.js';
import type { HttpResponseType } from '../objects/http_response.js';

import { HttpActivityActivityId } from '../enums/http_activity_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { HttpActivityStatusId } from '../enums/http_activity_status_id.js';
import { HttpActivityObservationPointId } from '../enums/http_activity_observation_point_id.js';

/**
 * HTTP Activity events report HTTP connection and traffic information.
 *
 * OCSF Class UID: 4002
 * Category: HTTP Activity
 * @see https://schema.ocsf.io/1.9.0/classes/http_activity
 */
export interface HttpActivityType {
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 99;
  /** The event activity name, as defined by the activity_id. When activity_id is 99 (Other), this attribute must contain the source-specific activity label. For all other activity_id values, this must match the caption defined for that activity_id enum value. */
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
  /** The time of the most recent event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
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
  /** The time of the earliest event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
  start_time?: number;
  /** The event status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this attribute must contain the source-specific status label. For all other values, this must match the caption defined for that status_id enum value (e.g., "Success" for status_id: 1). */
  status?: string;
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code?: string;
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail?: string;
  /** The normalized status of the event outcome. Use this family of attributes to convey the outcome of the activity described by the event. Producers should map their source outcome to 1 (Success) or 2 (Failure). Use 0 (Unknown) when the outcome cannot be determined, and 99 (Other) with a populated status string when the source value does not map cleanly. */
  status_id?: 0 | 1 | 2 | 99;
  /** The primary timestamp of the event - when the activity actually occurred at the source. This does not capture when the event record was created or serialized by the source system; for event lifecycle timestamps such as ingestion and processing, use metadata.logged_time and metadata.processed_time respectively, or the equivalent attributes in the metadata.loggers array when recording pipeline stages. For aggregate events (count > 1), set this to start_time (the earliest OCSF time in the aggregate) to preserve causal ordering and consistent timeline alignment. Note: finding classes redefine time as the finding creation time rather than the activity occurrence time. This must be a UTC epoch value in milliseconds (e.g., 1776881335332). Mappers should use the most precise and authoritative timestamp available from the source. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset?: number;
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: number;
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped?: Record<string, unknown>;
  /** The network application name identified by tools such as NBAR or App ID (e.g., youtube, facebook, webex). This represents a specific network application that uses standard protocols (such as https or quic) to deliver its service. */
  app_name?: string;
  /** The application-layer (Layer 7) protocol name identified by deep packet inspection or packet parsing (e.g., https, quic, ssh, dns), expressed as an IANA-registered service name from the IANA Service Name and Transport Protocol Port Number Registry. Note: Port numbers alone are not always a reliable indicator of the actual application protocol in use. */
  app_protocol_name?: string;
  /** The network connection information. */
  connection_info?: NetworkConnectionInfoType;
  /** The cumulative (running total) network traffic aggregated from the start of a flow or session. Use when reporting: (1) total accumulated bytes/packets since flow initiation, (2) combined aggregation models where both incremental deltas and running totals are reported together (populate both traffic for the delta and this attribute for the cumulative total), or (3) final summary metrics when a long-lived connection closes. This represents the sum of all activity from flow start to the current observation, not a delta or point-in-time value. */
  cumulative_traffic?: NetworkTrafficType;
  /** The responder (server) in a network connection. */
  dst_endpoint?: NetworkEndpointType;
  /** A list of the JA4+ network fingerprints. */
  ja4_fingerprint_list?: Ja4FingerprintType[];
  /** The network endpoint that observes or inspects network traffic as a third-party system, used when the observer is neither the source nor the destination of the communication (when observation_point_id = 3). Examples include network taps, span ports, inline security devices, or packet capture systems that monitor traffic between other endpoints. */
  network_observation_point?: NetworkEndpointType;
  /** Indicates whether the source network endpoint, destination network endpoint, or neither served as the observation point for the activity. The value is normalized to the caption of the observation_point_id. */
  observation_point?: string;
  /** The normalized identifier of the observation point. The observation point identifier indicates whether the source network endpoint, destination network endpoint, or neither served as the observation point for the activity. */
  observation_point_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The list of packet objects describing captured network packets. */
  packet_list?: PacketType[];
  /** The proxy (server) in a network connection. */
  proxy?: NetworkProxyType;
  /** The initiator (client) of the network connection. */
  src_endpoint?: NetworkEndpointType;
  /** The Transport Layer Security (TLS) attributes. */
  tls?: TlsType;
  /** The network traffic for this observation period. Use when reporting: (1) delta values (bytes/packets transferred since the last observation), (2) instantaneous measurements at a specific point in time, or (3) standalone single-event metrics. This attribute represents a point-in-time measurement or incremental change, not a running total. For accumulated totals across multiple observations or the lifetime of a flow, use cumulative_traffic instead. */
  traffic?: NetworkTrafficType;
  /** The file that is the target of the HTTP activity. */
  file?: FileType;
  /** The cookies object describes details about HTTP cookies */
  http_cookies?: HttpCookieType[];
  /** The HTTP Request Object documents attributes of a request made to a web server. */
  http_request?: HttpRequestType;
  /** The HTTP Response from a web server to a requester. */
  http_response?: HttpResponseType;
  /** The Hypertext Transfer Protocol (HTTP) status code returned to the client. */
  http_status?: number;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { NetworkConnectionInfo } from '../objects/network_connection_info.js';
import { NetworkTraffic } from '../objects/network_traffic.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { Ja4Fingerprint } from '../objects/ja4_fingerprint.js';
import { Packet } from '../objects/packet.js';
import { NetworkProxy } from '../objects/network_proxy.js';
import { Tls } from '../objects/tls.js';
import { File } from '../objects/file.js';
import { HttpCookie } from '../objects/http_cookie.js';
import { HttpRequest } from '../objects/http_request.js';
import { HttpResponse } from '../objects/http_response.js';

/** Value → label mappings for each enum field of HttpActivity. */
export const HttpActivityLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id" | "observation_point_id", Readonly<Record<number, string>>>> = {
  activity_id: {
    0: "Unknown",
    1: "Connect",
    2: "Delete",
    3: "Get",
    4: "Head",
    5: "Options",
    6: "Post",
    7: "Put",
    8: "Trace",
    9: "Patch",
    10: "ACL",
    11: "Baseline Control",
    12: "Bind",
    13: "Check In",
    14: "Check Out",
    15: "Copy",
    16: "Label",
    17: "Link",
    18: "Lock",
    19: "Merge",
    20: "Make Activity",
    21: "Make Calendar",
    22: "Make Collection",
    23: "Make Redirect Reference",
    24: "Make Workspace",
    25: "Move",
    26: "Order Patch",
    27: "PRI",
    28: "Property Find",
    29: "Property Patch",
    30: "Query",
    31: "Rebind",
    32: "Report",
    33: "Search",
    34: "Unbind",
    35: "Un-Check Out",
    36: "Unlink",
    37: "Unlock",
    38: "Update",
    39: "Update Redirect Reference",
    40: "Version Control",
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
    1: "Success",
    2: "Failure",
    99: "Other",
  },
  observation_point_id: {
    0: "Unknown",
    1: "Source",
    2: "Destination",
    3: "Neither",
    4: "Both",
    99: "Other",
  },
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: HttpActivityLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: HttpActivityLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: HttpActivityLabels.status_id },
  { idField: "observation_point_id", labelField: "observation_point", labels: HttpActivityLabels.observation_point_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 4,
  classUid: 4002,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type HttpActivityShape = {
  activity_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<15>, z.ZodLiteral<16>, z.ZodLiteral<17>, z.ZodLiteral<18>, z.ZodLiteral<19>, z.ZodLiteral<20>, z.ZodLiteral<21>, z.ZodLiteral<22>, z.ZodLiteral<23>, z.ZodLiteral<24>, z.ZodLiteral<25>, z.ZodLiteral<26>, z.ZodLiteral<27>, z.ZodLiteral<28>, z.ZodLiteral<29>, z.ZodLiteral<30>, z.ZodLiteral<31>, z.ZodLiteral<32>, z.ZodLiteral<33>, z.ZodLiteral<34>, z.ZodLiteral<35>, z.ZodLiteral<36>, z.ZodLiteral<37>, z.ZodLiteral<38>, z.ZodLiteral<39>, z.ZodLiteral<40>, z.ZodLiteral<99>]>>;
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
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>>;
  time: z.ZodNumber;
  timezone_offset: z.ZodOptional<z.ZodNumber>;
  type_name: z.ZodOptional<z.ZodString>;
  type_uid: z.ZodNumber;
  unmapped: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  app_name: z.ZodOptional<z.ZodString>;
  app_protocol_name: z.ZodOptional<z.ZodString>;
  connection_info: z.ZodOptional<typeof NetworkConnectionInfo>;
  cumulative_traffic: z.ZodOptional<typeof NetworkTraffic>;
  dst_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  ja4_fingerprint_list: z.ZodOptional<z.ZodArray<typeof Ja4Fingerprint>>;
  network_observation_point: z.ZodOptional<typeof NetworkEndpoint>;
  observation_point: z.ZodOptional<z.ZodString>;
  observation_point_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  packet_list: z.ZodOptional<z.ZodArray<typeof Packet>>;
  proxy: z.ZodOptional<typeof NetworkProxy>;
  src_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  tls: z.ZodOptional<typeof Tls>;
  traffic: z.ZodOptional<typeof NetworkTraffic>;
  file: z.ZodOptional<typeof File>;
  http_cookies: z.ZodOptional<z.ZodArray<typeof HttpCookie>>;
  http_request: z.ZodOptional<typeof HttpRequest>;
  http_response: z.ZodOptional<typeof HttpResponse>;
  http_status: z.ZodOptional<z.ZodNumber>;
};

const HttpActivitySchema: z.ZodObject<HttpActivityShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(22), z.literal(23), z.literal(24), z.literal(25), z.literal(26), z.literal(27), z.literal(28), z.literal(29), z.literal(30), z.literal(31), z.literal(32), z.literal(33), z.literal(34), z.literal(35), z.literal(36), z.literal(37), z.literal(38), z.literal(39), z.literal(40), z.literal(99)]).optional(),
  /** The event activity name, as defined by the activity_id. When activity_id is 99 (Other), this attribute must contain the source-specific activity label. For all other activity_id values, this must match the caption defined for that activity_id enum value. */
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
  /** The time of the most recent event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
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
  /** The time of the earliest event in an aggregate (count > 1). Do not populate for discrete, point-in-time events - use time alone. Subclasses such as findings may redefine this for their own time-range semantics. */
  start_time: z.number().int().optional(),
  /** The event status label, normalized to the caption of the status_id value. When status_id is 99 (Other), this attribute must contain the source-specific status label. For all other values, this must match the caption defined for that status_id enum value (e.g., "Success" for status_id: 1). */
  status: z.string().optional(),
  /** The source-specific status or error code as reported by the event source. For example, a Windows logon failure code (0x18), an HTTP response code (403), or an AWS API error code. This preserves the original code for detailed troubleshooting beyond what status_id conveys. */
  status_code: z.string().optional(),
  /** A human-readable description providing additional context about the event outcome. Use this to convey details that go beyond the normalized status_id and source-specific status_code, such as a failure reason or error message. For example: "Account locked after 5 failed attempts.". */
  status_detail: z.string().optional(),
  /** The normalized status of the event outcome. Use this family of attributes to convey the outcome of the activity described by the event. Producers should map their source outcome to 1 (Success) or 2 (Failure). Use 0 (Unknown) when the outcome cannot be determined, and 99 (Other) with a populated status string when the source value does not map cleanly. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
  /** The primary timestamp of the event - when the activity actually occurred at the source. This does not capture when the event record was created or serialized by the source system; for event lifecycle timestamps such as ingestion and processing, use metadata.logged_time and metadata.processed_time respectively, or the equivalent attributes in the metadata.loggers array when recording pipeline stages. For aggregate events (count > 1), set this to start_time (the earliest OCSF time in the aggregate) to preserve causal ordering and consistent timeline alignment. Note: finding classes redefine time as the finding creation time rather than the activity occurrence time. This must be a UTC epoch value in milliseconds (e.g., 1776881335332). Mappers should use the most precise and authoritative timestamp available from the source. */
  time: z.number().int(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. This allows consumers to reconstruct the local time at the event source. For example, US Eastern Standard Time is -300. Populate this when the source provides local time zone information. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, combining the class and activity (e.g., "Detection Finding: Create"). The value must match the class_name and activity_name joined by ": ". */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. Producers and mappers must compute this as class_uid * 100 + activity_id. It uniquely identifies the combination of event class and activity across the entire schema. For example, Detection Finding: Create is 200401. */
  type_uid: z.number().int(),
  /** A container for source-specific attributes that do not map to any defined OCSF attribute. Use this to preserve valuable source data that would otherwise be lost during normalization. The keys and values are specific to the event source. Note: Consumers should not rely on a stable structure within this field. The preferred approach to unmapped attributes is to create a custom extension with the desired structure. */
  unmapped: z.record(z.string(), z.unknown()).optional(),
  /** The network application name identified by tools such as NBAR or App ID (e.g., youtube, facebook, webex). This represents a specific network application that uses standard protocols (such as https or quic) to deliver its service. */
  app_name: z.string().optional(),
  /** The application-layer (Layer 7) protocol name identified by deep packet inspection or packet parsing (e.g., https, quic, ssh, dns), expressed as an IANA-registered service name from the IANA Service Name and Transport Protocol Port Number Registry. Note: Port numbers alone are not always a reliable indicator of the actual application protocol in use. */
  app_protocol_name: z.string().optional(),
  /** The network connection information. */
  connection_info: NetworkConnectionInfo.optional(),
  /** The cumulative (running total) network traffic aggregated from the start of a flow or session. Use when reporting: (1) total accumulated bytes/packets since flow initiation, (2) combined aggregation models where both incremental deltas and running totals are reported together (populate both traffic for the delta and this attribute for the cumulative total), or (3) final summary metrics when a long-lived connection closes. This represents the sum of all activity from flow start to the current observation, not a delta or point-in-time value. */
  cumulative_traffic: NetworkTraffic.optional(),
  /** The responder (server) in a network connection. */
  dst_endpoint: NetworkEndpoint.optional(),
  /** A list of the JA4+ network fingerprints. */
  ja4_fingerprint_list: z.array(Ja4Fingerprint).optional(),
  /** The network endpoint that observes or inspects network traffic as a third-party system, used when the observer is neither the source nor the destination of the communication (when observation_point_id = 3). Examples include network taps, span ports, inline security devices, or packet capture systems that monitor traffic between other endpoints. */
  network_observation_point: NetworkEndpoint.optional(),
  /** Indicates whether the source network endpoint, destination network endpoint, or neither served as the observation point for the activity. The value is normalized to the caption of the observation_point_id. */
  observation_point: z.string().optional(),
  /** The normalized identifier of the observation point. The observation point identifier indicates whether the source network endpoint, destination network endpoint, or neither served as the observation point for the activity. */
  observation_point_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The list of packet objects describing captured network packets. */
  packet_list: z.array(Packet).optional(),
  /** The proxy (server) in a network connection. */
  proxy: NetworkProxy.optional(),
  /** The initiator (client) of the network connection. */
  src_endpoint: NetworkEndpoint.optional(),
  /** The Transport Layer Security (TLS) attributes. */
  tls: Tls.optional(),
  /** The network traffic for this observation period. Use when reporting: (1) delta values (bytes/packets transferred since the last observation), (2) instantaneous measurements at a specific point in time, or (3) standalone single-event metrics. This attribute represents a point-in-time measurement or incremental change, not a running total. For accumulated totals across multiple observations or the lifetime of a flow, use cumulative_traffic instead. */
  traffic: NetworkTraffic.optional(),
  /** The file that is the target of the HTTP activity. */
  file: File.optional(),
  /** The cookies object describes details about HTTP cookies */
  http_cookies: z.array(HttpCookie).optional(),
  /** The HTTP Request Object documents attributes of a request made to a web server. */
  http_request: HttpRequest.optional(),
  /** The HTTP Response from a web server to a requester. */
  http_response: HttpResponse.optional(),
  /** The Hypertext Transfer Protocol (HTTP) status code returned to the client. */
  http_status: z.number().int().optional(),
});

export const HttpActivity = {
  parse: (data: unknown): HttpActivityType => HttpActivitySchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: HttpActivityType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return HttpActivitySchema.safeParse(preprocessed);
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

  schema: HttpActivitySchema,

  // Value → label maps for every enum field
  labels: HttpActivityLabels,

  // Static enum references for convenience
  ActivityId: HttpActivityActivityId,
  SeverityId: SeverityId,
  StatusId: HttpActivityStatusId,
  ObservationPointId: HttpActivityObservationPointId,
} as const;
