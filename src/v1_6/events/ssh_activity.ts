import { z } from "zod";
import { type SiblingPair, reconcileSiblings } from "../../sibling.js";
import { type UidConfig, prefillUids } from "../../uid.js";

import { Enrichment, type EnrichmentType } from "../objects/enrichment.js";
import { File, type FileType } from "../objects/file.js";
import { Fingerprint, type FingerprintType } from "../objects/fingerprint.js";
import { Hassh, type HasshType } from "../objects/hassh.js";
import { Ja4Fingerprint, type Ja4FingerprintType } from "../objects/ja4_fingerprint.js";
import { Metadata, type MetadataType } from "../objects/metadata.js";
import {
  NetworkConnectionInfo,
  type NetworkConnectionInfoType,
} from "../objects/network_connection_info.js";
import { NetworkEndpoint, type NetworkEndpointType } from "../objects/network_endpoint.js";
import { NetworkProxy, type NetworkProxyType } from "../objects/network_proxy.js";
import { NetworkTraffic, type NetworkTrafficType } from "../objects/network_traffic.js";
import { OcsfObject, type OcsfObjectType } from "../objects/object.js";
import { Observable, type ObservableType } from "../objects/observable.js";
import { Tls, type TlsType } from "../objects/tls.js";

const ACTIVITY_ID_LABELS: Record<number, string> = {
  1: "Open",
  2: "Close",
  3: "Reset",
  4: "Fail",
  5: "Refuse",
  6: "Traffic",
  7: "Listen",
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

const AUTH_TYPE_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Certificate Based",
  2: "GSSAPI",
  3: "Host Based",
  4: "Keyboard Interactive",
  5: "Password",
  6: "Public Key",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "auth_type_id", labelField: "auth_type", labels: AUTH_TYPE_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 4,
  classUid: 4007,
};

/**
 * SSH Activity events report remote client connections to a server using the Secure Shell (SSH) Protocol.
 *
 * OCSF Class UID: 4007
 * Category: SSH Activity
 * @see https://schema.ocsf.io/1.6.0/classes/ssh_activity
 */
export interface SshActivityType {
  /** The normalized identifier of the activity that triggered the event. */
  activity_id?: number | undefined;
  /** The event activity name, as defined by the activity_id. */
  activity_name?: string | undefined;
  /** The event category name, as defined by category_uid value. */
  category_name?: string | undefined;
  /** The category unique identifier of the event. */
  category_uid: number;
  /** The event class name, as defined by class_uid value. */
  class_name?: string | undefined;
  /** The unique identifier of a class. A class describes the attributes available in an event. */
  class_uid: number;
  /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
  count?: number | undefined;
  /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
  duration?: number | undefined;
  /** The end time of a time period, or the time of the most recent event included in the aggregate event. */
  end_time?: number | undefined;
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments?: EnrichmentType[] | undefined;
  /** The description of the event/finding, as defined by the source. */
  message?: string | undefined;
  /** The metadata associated with the event or a finding. */
  metadata: MetadataType;
  /** The observables associated with the event or a finding. */
  observables?: ObservableType[] | undefined;
  /** The raw event/finding data as received from the source. */
  raw_data?: string | undefined;
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash?: FingerprintType | undefined;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number | undefined;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string | undefined;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: number;
  /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
  start_time?: number | undefined;
  /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string | undefined;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string | undefined;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string | undefined;
  /** The normalized identifier of the event status. */
  status_id?: number | undefined;
  /** The normalized event occurrence time or the finding creation time. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset?: number | undefined;
  /** The event/finding type name, as defined by the type_uid. */
  type_name?: string | undefined;
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: number;
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped?: OcsfObjectType | undefined;
  /** The name of the application associated with the event or object. */
  app_name?: string | undefined;
  /** The network connection information. */
  connection_info?: NetworkConnectionInfoType | undefined;
  /** The responder (server) in a network connection. */
  dst_endpoint?: NetworkEndpointType | undefined;
  /** A list of the JA4+ network fingerprints. */
  ja4_fingerprint_list?: Ja4FingerprintType[] | undefined;
  /** The proxy (server) in a network connection. */
  proxy?: NetworkProxyType | undefined;
  /** The initiator (client) of the network connection. */
  src_endpoint?: NetworkEndpointType | undefined;
  /** The Transport Layer Security (TLS) attributes. */
  tls?: TlsType | undefined;
  /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
  traffic?: NetworkTrafficType | undefined;
  /** The SSH authentication type, normalized to the caption of 'auth_type_id'. In the case of 'Other', it is defined by the event source. */
  auth_type?: string | undefined;
  /** The normalized identifier of the SSH authentication type. */
  auth_type_id?: number | undefined;
  /** The Client HASSH fingerprinting object. */
  client_hassh?: HasshType | undefined;
  /** The file that is the target of the SSH activity. */
  file?: FileType | undefined;
  /** The Secure Shell Protocol version. */
  protocol_ver?: string | undefined;
  /** The Server HASSH fingerprinting object. */
  server_hassh?: HasshType | undefined;
  [key: string]: unknown;
}

export const SshActivity: z.ZodType<SshActivityType> = z.preprocess(
  (data) => {
    if (typeof data !== "object" || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z
    .object({
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
      enrichments: z.array(z.lazy(() => Enrichment)).optional(),
      /** The description of the event/finding, as defined by the source. */
      message: z.string().optional(),
      /** The metadata associated with the event or a finding. */
      metadata: z.lazy(() => Metadata),
      /** The observables associated with the event or a finding. */
      observables: z.array(z.lazy(() => Observable)).optional(),
      /** The raw event/finding data as received from the source. */
      raw_data: z.string().optional(),
      /** The hash, which describes the content of the raw_data field. */
      raw_data_hash: z.lazy(() => Fingerprint).optional(),
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
      unmapped: z.lazy(() => OcsfObject).optional(),
      /** The name of the application associated with the event or object. */
      app_name: z.string().optional(),
      /** The network connection information. */
      connection_info: z.lazy(() => NetworkConnectionInfo).optional(),
      /** The responder (server) in a network connection. */
      dst_endpoint: z.lazy(() => NetworkEndpoint).optional(),
      /** A list of the JA4+ network fingerprints. */
      ja4_fingerprint_list: z.array(z.lazy(() => Ja4Fingerprint)).optional(),
      /** The proxy (server) in a network connection. */
      proxy: z.lazy(() => NetworkProxy).optional(),
      /** The initiator (client) of the network connection. */
      src_endpoint: z.lazy(() => NetworkEndpoint).optional(),
      /** The Transport Layer Security (TLS) attributes. */
      tls: z.lazy(() => Tls).optional(),
      /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
      traffic: z.lazy(() => NetworkTraffic).optional(),
      /** The SSH authentication type, normalized to the caption of 'auth_type_id'. In the case of 'Other', it is defined by the event source. */
      auth_type: z.string().optional(),
      /** The normalized identifier of the SSH authentication type. */
      auth_type_id: z.number().int().optional(),
      /** The Client HASSH fingerprinting object. */
      client_hassh: z.lazy(() => Hassh).optional(),
      /** The file that is the target of the SSH activity. */
      file: z.lazy(() => File).optional(),
      /** The Secure Shell Protocol version. */
      protocol_ver: z.string().optional(),
      /** The Server HASSH fingerprinting object. */
      server_hassh: z.lazy(() => Hassh).optional(),
    })
    .passthrough(),
) as any;
