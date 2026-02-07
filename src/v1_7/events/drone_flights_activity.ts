import { z } from "zod";
import { type SiblingPair, reconcileSiblings } from "../../sibling.js";
import { type UidConfig, prefillUids } from "../../uid.js";

import { Enrichment, type EnrichmentType } from "../objects/enrichment.js";
import { Fingerprint, type FingerprintType } from "../objects/fingerprint.js";
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
import {
  UnmannedAerialSystem,
  type UnmannedAerialSystemType,
} from "../objects/unmanned_aerial_system.js";
import {
  UnmannedSystemOperatingArea,
  type UnmannedSystemOperatingAreaType,
} from "../objects/unmanned_system_operating_area.js";
import { User, type UserType } from "../objects/user.js";

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Capture",
  2: "Record",
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
  1: "Undeclared",
  2: "Ground",
  3: "Airborne",
  4: "Emergency",
  5: "Remote ID System Failure",
  6: "Reserved",
};

const AUTH_PROTOCOL_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "None",
  2: "UAS ID Signature",
  3: "Operator ID Signature",
  4: "Message Set Signature",
  5: "Authentication Provided by Network Remote ID",
  6: "Specific Authentication Method",
  7: "Reserved",
  8: "Private User",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "auth_protocol_id", labelField: "auth_protocol", labels: AUTH_PROTOCOL_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 8,
  classUid: 8001,
};

/**
 * Drone Flights Activity events report the activity of Unmanned Aerial Systems (UAS), their Operators, and mission-planning and authorization metadata as reported by the UAS platforms themselves, by Counter-UAS (CUAS) systems, or other remote monitoring or sensing infrastructure. Based on the Remote ID defined in Standard Specification for Remote ID and Tracking (ASTM Designation: F3411-22a) <a target='_blank' href='https://cdn.standards.iteh.ai/samples/112830/71297057ac42432880a203654f213709/ASTM-F3411-22a.pdf'>ASTM F3411-22a</a>
 *
 * OCSF Class UID: 8001
 * Category: Drone Flights Activity
 * @see https://schema.ocsf.io/1.7.0/classes/drone_flights_activity
 */
export interface DroneFlightsActivityType {
  /** The normalized identifier of the activity that triggered the event. */
  activity_id: number;
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
  /** The normalized Operational status for the Unmanned Aerial System (UAS) normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
  status?: string | undefined;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string | undefined;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string | undefined;
  /** The normalized Operational status identifier for the Unmanned Aerial System (UAS). */
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
  /** The network connection information. */
  connection_info?: NetworkConnectionInfoType | undefined;
  /** The destination network endpoint of the Unmanned Aerial System (UAS), Counter Unmanned Aerial System (CUAS) platform, or other unmanned systems monitoring and/or sensing infrastructure. */
  dst_endpoint: NetworkEndpointType;
  /** The proxy (server) in a network connection. */
  proxy_endpoint?: NetworkProxyType | undefined;
  /** The network source endpoint. */
  src_endpoint?: NetworkEndpointType | undefined;
  /** The Transport Layer Security (TLS) attributes. */
  tls?: TlsType | undefined;
  /** Traffic refers to the amount of data transmitted from a Unmanned Aerial System (UAS) or Counter Unmanned Aerial System (UAS) (CUAS) system at a given point of time. Ex: bytes_in and bytes_out. */
  traffic?: NetworkTrafficType | undefined;
  /** The authentication type as defined by the caption of auth_protocol_id. In the case of 'Other', it is defined by the event source. */
  auth_protocol?: string | undefined;
  /** The normalized identifier of the authentication type used to authorize a flight plan or mission. */
  auth_protocol_id?: number | undefined;
  /** UA Classification - Allows a region to classify UAS in a regional specific manner. The format may differ from region to region. */
  classification?: string | undefined;
  /** This optional, free-text field enables the operator to describe the purpose of a flight, if so desired. */
  comment?: string | undefined;
  /** The networking protocol associated with the Remote ID device or beacon. E.g. BLE, LTE, 802.11. */
  protocol_name?: string | undefined;
  /** The Unmanned Aerial System object describes the characteristics, Position Location Information (PLI), and other metadata of Unmanned Aerial Systems (UAS) and other unmanned and drone systems used in Remote ID. Remote ID is defined in the Standard Specification for Remote ID and Tracking (ASTM Designation: F3411-22a) ASTM F3411-22a. */
  unmanned_aerial_system: UnmannedAerialSystemType;
  /** The UAS Operating Area object describes details about a precise area of operations for a UAS flight or mission. */
  unmanned_system_operating_area?: UnmannedSystemOperatingAreaType | undefined;
  /** The human or machine operator of an Unmanned System. */
  unmanned_system_operator: UserType;
  [key: string]: unknown;
}

export const DroneFlightsActivity: z.ZodType<DroneFlightsActivityType> = z.preprocess(
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
      activity_id: z.number().int(),
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
      /** The normalized Operational status for the Unmanned Aerial System (UAS) normalized to the caption of the status_id value. In the case of 'Other', it is defined by the source. */
      status: z.string().optional(),
      /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
      status_code: z.string().optional(),
      /** The status detail contains additional information about the event/finding outcome. */
      status_detail: z.string().optional(),
      /** The normalized Operational status identifier for the Unmanned Aerial System (UAS). */
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
      /** The network connection information. */
      connection_info: z.lazy(() => NetworkConnectionInfo).optional(),
      /** The destination network endpoint of the Unmanned Aerial System (UAS), Counter Unmanned Aerial System (CUAS) platform, or other unmanned systems monitoring and/or sensing infrastructure. */
      dst_endpoint: z.lazy(() => NetworkEndpoint),
      /** The proxy (server) in a network connection. */
      proxy_endpoint: z.lazy(() => NetworkProxy).optional(),
      /** The network source endpoint. */
      src_endpoint: z.lazy(() => NetworkEndpoint).optional(),
      /** The Transport Layer Security (TLS) attributes. */
      tls: z.lazy(() => Tls).optional(),
      /** Traffic refers to the amount of data transmitted from a Unmanned Aerial System (UAS) or Counter Unmanned Aerial System (UAS) (CUAS) system at a given point of time. Ex: bytes_in and bytes_out. */
      traffic: z.lazy(() => NetworkTraffic).optional(),
      /** The authentication type as defined by the caption of auth_protocol_id. In the case of 'Other', it is defined by the event source. */
      auth_protocol: z.string().optional(),
      /** The normalized identifier of the authentication type used to authorize a flight plan or mission. */
      auth_protocol_id: z.number().int().optional(),
      /** UA Classification - Allows a region to classify UAS in a regional specific manner. The format may differ from region to region. */
      classification: z.string().optional(),
      /** This optional, free-text field enables the operator to describe the purpose of a flight, if so desired. */
      comment: z.string().optional(),
      /** The networking protocol associated with the Remote ID device or beacon. E.g. BLE, LTE, 802.11. */
      protocol_name: z.string().optional(),
      /** The Unmanned Aerial System object describes the characteristics, Position Location Information (PLI), and other metadata of Unmanned Aerial Systems (UAS) and other unmanned and drone systems used in Remote ID. Remote ID is defined in the Standard Specification for Remote ID and Tracking (ASTM Designation: F3411-22a) ASTM F3411-22a. */
      unmanned_aerial_system: z.lazy(() => UnmannedAerialSystem),
      /** The UAS Operating Area object describes details about a precise area of operations for a UAS flight or mission. */
      unmanned_system_operating_area: z.lazy(() => UnmannedSystemOperatingArea).optional(),
      /** The human or machine operator of an Unmanned System. */
      unmanned_system_operator: z.lazy(() => User),
    })
    .passthrough(),
) as any;
