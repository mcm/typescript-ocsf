import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { NetworkConnectionInfoType } from '../objects/network_connection_info.js';
import type { NetworkEndpointType } from '../objects/network_endpoint.js';
import type { NetworkProxyType } from '../objects/network_proxy.js';
import type { TlsType } from '../objects/tls.js';
import type { NetworkTrafficType } from '../objects/network_traffic.js';
import type { AircraftType } from '../objects/aircraft.js';
import type { UnmannedAerialSystemType } from '../objects/unmanned_aerial_system.js';
import type { UnmannedSystemOperatingAreaType } from '../objects/unmanned_system_operating_area.js';
import type { UserType } from '../objects/user.js';

import { AirborneBroadcastActivityActivityId } from '../enums/airborne_broadcast_activity_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { AirborneBroadcastActivityStatusId } from '../enums/airborne_broadcast_activity_status_id.js';

/**
 * Airborne Broadcast Activity events report the activity of any aircraft or unmanned system as reported and tracked by Automatic Dependent Surveillance - Broadcast (ADS-B) receivers. Based on the ADS-B standards described in Code of Federal Regulations (CFR) Title 14 Chapter I Subchapter F Part 91 and in other general Federal Aviation Administration (FAA) supplemental orders and guidance.
 *
 * OCSF Class UID: 8002
 * Category: Airborne Broadcast Activity
 * @see https://schema.ocsf.io/1.9.0/classes/airborne_broadcast_activity
 */
export interface AirborneBroadcastActivityType {
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id: 0 | 1 | 2 | 99;
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
  /** The network connection information. */
  connection_info?: NetworkConnectionInfoType;
  /** The destination network endpoint for the ADS-B system, if telemetry is being remotely broadcasted. */
  dst_endpoint?: NetworkEndpointType;
  /** The proxy (server) in a network connection. */
  proxy_endpoint?: NetworkProxyType;
  /** The source network endpoint for the ADS-B system. */
  src_endpoint?: NetworkEndpointType;
  /** The Transport Layer Security (TLS) attributes. */
  tls?: TlsType;
  /** Traffic refers to the amount of data transmitted from a ADS-B remote monitoring system at a given point of time. Ex: bytes_in and bytes_out. */
  traffic?: NetworkTrafficType;
  /** The Aircraft object represents any aircraft or otherwise airborne asset such as an unmanned system, airplane, balloon, spacecraft, or otherwise. The Aircraft object is intended to normalized data captured or otherwise logged from active radar, passive radar, multi-spectral systems, or the Automatic Dependant Broadcast - Surveillance (ADS-B), and/or Mode S systems. */
  aircraft?: AircraftType;
  /** The specific protocol associated with the ADS-B system. E.g. ADS-B UAT or ADS-B ES. */
  protocol_name?: string;
  /** Recent average RSSI (signal power) measured in dbFS. This value will always be negative, e.g., -87.13. */
  rssi?: number;
  /** The Unmanned Aerial System object describes the characteristics, Position Location Information (PLI), and other metadata of Unmanned Aerial Systems (UAS) and other unmanned and drone systems used in Remote ID. Remote ID is defined in the Standard Specification for Remote ID and Tracking (ASTM Designation: F3411-22a). */
  unmanned_aerial_system: UnmannedAerialSystemType;
  /** The UAS Operating Area object describes details about a precise area of operations for a UAS flight or mission. */
  unmanned_system_operating_area?: UnmannedSystemOperatingAreaType;
  /** The human or machine operator of an Unmanned System. */
  unmanned_system_operator: UserType;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { NetworkConnectionInfo } from '../objects/network_connection_info.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { NetworkProxy } from '../objects/network_proxy.js';
import { Tls } from '../objects/tls.js';
import { NetworkTraffic } from '../objects/network_traffic.js';
import { Aircraft } from '../objects/aircraft.js';
import { UnmannedAerialSystem } from '../objects/unmanned_aerial_system.js';
import { UnmannedSystemOperatingArea } from '../objects/unmanned_system_operating_area.js';
import { User } from '../objects/user.js';

/** Value → label mappings for each enum field of AirborneBroadcastActivity. */
export const AirborneBroadcastActivityLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id", Readonly<Record<number, string>>>> = {
  activity_id: {
    0: "Unknown",
    1: "Capture",
    2: "Record",
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
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: AirborneBroadcastActivityLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: AirborneBroadcastActivityLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: AirborneBroadcastActivityLabels.status_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 8,
  classUid: 8002,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type AirborneBroadcastActivityShape = {
  activity_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>;
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
  connection_info: z.ZodOptional<typeof NetworkConnectionInfo>;
  dst_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  proxy_endpoint: z.ZodOptional<typeof NetworkProxy>;
  src_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  tls: z.ZodOptional<typeof Tls>;
  traffic: z.ZodOptional<typeof NetworkTraffic>;
  aircraft: z.ZodOptional<typeof Aircraft>;
  protocol_name: z.ZodOptional<z.ZodString>;
  rssi: z.ZodOptional<z.ZodNumber>;
  unmanned_aerial_system: typeof UnmannedAerialSystem;
  unmanned_system_operating_area: z.ZodOptional<typeof UnmannedSystemOperatingArea>;
  unmanned_system_operator: typeof User;
};

const AirborneBroadcastActivitySchema: z.ZodObject<AirborneBroadcastActivityShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]),
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
  /** The network connection information. */
  connection_info: NetworkConnectionInfo.optional(),
  /** The destination network endpoint for the ADS-B system, if telemetry is being remotely broadcasted. */
  dst_endpoint: NetworkEndpoint.optional(),
  /** The proxy (server) in a network connection. */
  proxy_endpoint: NetworkProxy.optional(),
  /** The source network endpoint for the ADS-B system. */
  src_endpoint: NetworkEndpoint.optional(),
  /** The Transport Layer Security (TLS) attributes. */
  tls: Tls.optional(),
  /** Traffic refers to the amount of data transmitted from a ADS-B remote monitoring system at a given point of time. Ex: bytes_in and bytes_out. */
  traffic: NetworkTraffic.optional(),
  /** The Aircraft object represents any aircraft or otherwise airborne asset such as an unmanned system, airplane, balloon, spacecraft, or otherwise. The Aircraft object is intended to normalized data captured or otherwise logged from active radar, passive radar, multi-spectral systems, or the Automatic Dependant Broadcast - Surveillance (ADS-B), and/or Mode S systems. */
  aircraft: Aircraft.optional(),
  /** The specific protocol associated with the ADS-B system. E.g. ADS-B UAT or ADS-B ES. */
  protocol_name: z.string().optional(),
  /** Recent average RSSI (signal power) measured in dbFS. This value will always be negative, e.g., -87.13. */
  rssi: z.number().int().optional(),
  /** The Unmanned Aerial System object describes the characteristics, Position Location Information (PLI), and other metadata of Unmanned Aerial Systems (UAS) and other unmanned and drone systems used in Remote ID. Remote ID is defined in the Standard Specification for Remote ID and Tracking (ASTM Designation: F3411-22a). */
  unmanned_aerial_system: UnmannedAerialSystem,
  /** The UAS Operating Area object describes details about a precise area of operations for a UAS flight or mission. */
  unmanned_system_operating_area: UnmannedSystemOperatingArea.optional(),
  /** The human or machine operator of an Unmanned System. */
  unmanned_system_operator: User,
});

export const AirborneBroadcastActivity = {
  parse: (data: unknown): AirborneBroadcastActivityType => AirborneBroadcastActivitySchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: AirborneBroadcastActivityType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return AirborneBroadcastActivitySchema.safeParse(preprocessed);
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

  schema: AirborneBroadcastActivitySchema,

  // Value → label maps for every enum field
  labels: AirborneBroadcastActivityLabels,

  // Static enum references for convenience
  ActivityId: AirborneBroadcastActivityActivityId,
  SeverityId: SeverityId,
  StatusId: AirborneBroadcastActivityStatusId,
} as const;
