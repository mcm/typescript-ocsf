import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { OcsfObjectType } from '../objects/object.js';
import type { NetworkConnectionInfoType } from '../objects/network_connection_info.js';
import type { NetworkEndpointType } from '../objects/network_endpoint.js';
import type { Ja4FingerprintType } from '../objects/ja4_fingerprint.js';
import type { NetworkProxyType } from '../objects/network_proxy.js';
import type { TlsType } from '../objects/tls.js';
import type { NetworkTrafficType } from '../objects/network_traffic.js';
import type { DeviceType } from '../objects/device.js';
import type { FileType } from '../objects/file.js';
import type { KeyboardInfoType } from '../objects/keyboard_info.js';
import type { DisplayType } from '../objects/display.js';
import type { RequestType } from '../objects/request.js';
import type { ResponseType } from '../objects/response.js';
import type { UserType } from '../objects/user.js';

/**
 * Remote Desktop Protocol (RDP) Activity events report post-authentication remote client connections between clients and servers over the network.
 *
 * OCSF Class UID: 4005
 * Category: RDP Activity
 * @see https://schema.ocsf.io/1.6.0/classes/rdp_activity
 */
export interface RdpActivityType {
  /** The normalized identifier of the activity that triggered the event. */
  activity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;
  /** The event activity name, as defined by the activity_id. */
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
  /** The end time of a time period, or the time of the most recent event included in the aggregate event. */
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
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash?: FingerprintType;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
  start_time?: number;
  /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string;
  /** The normalized identifier of the event status. */
  status_id?: 0 | 1 | 2 | 99;
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
  /** The name of the application associated with the event or object. */
  app_name?: string;
  /** The remote desktop connection details, either connection-based or connectionless. */
  connection_info?: NetworkConnectionInfoType;
  /** The responder (server) in a network connection. */
  dst_endpoint?: NetworkEndpointType;
  /** A list of the JA4+ network fingerprints. */
  ja4_fingerprint_list?: Ja4FingerprintType[];
  /** The proxy (server) in a network connection. */
  proxy?: NetworkProxyType;
  /** The initiator (client) of the network connection. */
  src_endpoint?: NetworkEndpointType;
  /** The Transport Layer Security (TLS) attributes. */
  tls?: TlsType;
  /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
  traffic?: NetworkTrafficType;
  /** A list of RDP capabilities. */
  capabilities?: string[];
  /** The list of observed certificates in an RDP TLS connection. */
  certificate_chain?: string[];
  /** The device instigating the RDP connection. */
  device?: DeviceType;
  /** The file that is the target of the RDP activity. */
  file?: FileType;
  /** The client identifier cookie during client/server exchange. */
  identifier_cookie?: string;
  /** The keyboard detailed information. */
  keyboard_info?: KeyboardInfoType;
  /** The Remote Desktop Protocol version. */
  protocol_ver?: string;
  /** The remote display affiliated with the event */
  remote_display?: DisplayType;
  /** The client request in an RDP network connection. */
  request?: RequestType;
  /** The server response in an RDP network connection. */
  response?: ResponseType;
  /** The target user associated with the RDP activity. */
  user?: UserType;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { OcsfObject } from '../objects/object.js';
import { NetworkConnectionInfo } from '../objects/network_connection_info.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { Ja4Fingerprint } from '../objects/ja4_fingerprint.js';
import { NetworkProxy } from '../objects/network_proxy.js';
import { Tls } from '../objects/tls.js';
import { NetworkTraffic } from '../objects/network_traffic.js';
import { Device } from '../objects/device.js';
import { File } from '../objects/file.js';
import { KeyboardInfo } from '../objects/keyboard_info.js';
import { Display } from '../objects/display.js';
import { Request } from '../objects/request.js';
import { Response } from '../objects/response.js';
import { User } from '../objects/user.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Initial Request",
  2: "Initial Response",
  3: "Connect Request",
  4: "Connect Response",
  5: "TLS Handshake",
  6: "Traffic",
  7: "Disconnect",
  8: "Reconnect",
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
  classUid: 4005,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

const RdpActivitySchema = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(99)]).optional(),
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
  /** The remote desktop connection details, either connection-based or connectionless. */
  connection_info: NetworkConnectionInfo.optional(),
  /** The responder (server) in a network connection. */
  dst_endpoint: NetworkEndpoint.optional(),
  /** A list of the JA4+ network fingerprints. */
  ja4_fingerprint_list: z.array(Ja4Fingerprint).optional(),
  /** The proxy (server) in a network connection. */
  proxy: NetworkProxy.optional(),
  /** The initiator (client) of the network connection. */
  src_endpoint: NetworkEndpoint.optional(),
  /** The Transport Layer Security (TLS) attributes. */
  tls: Tls.optional(),
  /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
  traffic: NetworkTraffic.optional(),
  /** A list of RDP capabilities. */
  capabilities: z.array(z.string()).optional(),
  /** The list of observed certificates in an RDP TLS connection. */
  certificate_chain: z.array(z.string()).optional(),
  /** The device instigating the RDP connection. */
  device: Device.optional(),
  /** The file that is the target of the RDP activity. */
  file: File.optional(),
  /** The client identifier cookie during client/server exchange. */
  identifier_cookie: z.string().optional(),
  /** The keyboard detailed information. */
  keyboard_info: KeyboardInfo.optional(),
  /** The Remote Desktop Protocol version. */
  protocol_ver: z.string().optional(),
  /** The remote display affiliated with the event */
  remote_display: Display.optional(),
  /** The client request in an RDP network connection. */
  request: Request.optional(),
  /** The server response in an RDP network connection. */
  response: Response.optional(),
  /** The target user associated with the RDP activity. */
  user: User.optional(),
});

export const RdpActivity = {
  parse: (data: unknown): RdpActivityType => RdpActivitySchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: RdpActivityType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return RdpActivitySchema.safeParse(preprocessed);
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

  schema: RdpActivitySchema,
};
