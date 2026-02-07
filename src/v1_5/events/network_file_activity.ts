import { z } from "zod";
import { type SiblingPair, reconcileSiblings } from "../../sibling.js";
import { type UidConfig, prefillUids } from "../../uid.js";

import { Actor, type ActorType } from "../objects/actor.js";
import { Enrichment, type EnrichmentType } from "../objects/enrichment.js";
import { File, type FileType } from "../objects/file.js";
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
  classUid: 4010,
};

/**
 * Network File Activity events report file activities traversing the network, including file storage services such as Box, MS OneDrive, or Google Drive.
 *
 * OCSF Class UID: 4010
 * Category: Network File Activity
 * @see https://schema.ocsf.io/1.5.0/classes/network_file_activity
 */
export interface NetworkFileActivityType {
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
  /** The endpoint that received the activity on the target file. */
  dst_endpoint?: NetworkEndpointType | undefined;
  /** A list of the JA4+ network fingerprints. */
  ja4_fingerprint_list?: Ja4FingerprintType[] | undefined;
  /** The proxy (server) in a network connection. */
  proxy?: NetworkProxyType | undefined;
  /** The endpoint that performed the activity on the target file. */
  src_endpoint: NetworkEndpointType;
  /** The Transport Layer Security (TLS) attributes. */
  tls?: TlsType | undefined;
  /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
  traffic?: NetworkTrafficType | undefined;
  /** The actor that performed the activity on the target file. */
  actor: ActorType;
  /** The share expiration time. */
  expiration_time?: number | undefined;
  /** The file that is the target of the activity. */
  file: FileType;
  [key: string]: unknown;
}

export const NetworkFileActivity: z.ZodType<NetworkFileActivityType> = z.preprocess(
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
      /** The endpoint that received the activity on the target file. */
      dst_endpoint: z.lazy(() => NetworkEndpoint).optional(),
      /** A list of the JA4+ network fingerprints. */
      ja4_fingerprint_list: z.array(z.lazy(() => Ja4Fingerprint)).optional(),
      /** The proxy (server) in a network connection. */
      proxy: z.lazy(() => NetworkProxy).optional(),
      /** The endpoint that performed the activity on the target file. */
      src_endpoint: z.lazy(() => NetworkEndpoint),
      /** The Transport Layer Security (TLS) attributes. */
      tls: z.lazy(() => Tls).optional(),
      /** The network traffic refers to the amount of data moving across a network at a given point of time. Intended to be used alongside Network Connection. */
      traffic: z.lazy(() => NetworkTraffic).optional(),
      /** The actor that performed the activity on the target file. */
      actor: z.lazy(() => Actor),
      /** The share expiration time. */
      expiration_time: z.number().int().optional(),
      /** The file that is the target of the activity. */
      file: z.lazy(() => File),
    })
    .passthrough(),
) as any;
