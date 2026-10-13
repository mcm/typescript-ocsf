import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { ActorType } from '../objects/actor.js';
import type { DatabaseType } from '../objects/database.js';
import type { DatabucketType } from '../objects/databucket.js';
import type { NetworkEndpointType } from '../objects/network_endpoint.js';
import type { HttpRequestType } from '../objects/http_request.js';
import type { HttpResponseType } from '../objects/http_response.js';
import type { QueryInfoType } from '../objects/query_info.js';
import type { TableType } from '../objects/table.js';

import { DatastoreActivityActivityId } from '../enums/datastore_activity_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { DatastoreActivityStatusId } from '../enums/datastore_activity_status_id.js';
import { DatastoreActivityTypeId } from '../enums/datastore_activity_type_id.js';

/**
 * Datastore events describe general activities (Read, Update, Query, Delete, etc.) which affect datastores or data within those datastores, e.g. (AWS RDS, AWS S3).
 *
 * OCSF Class UID: 6005
 * Category: Datastore Activity
 * @see https://schema.ocsf.io/1.9.0/classes/datastore_activity
 */
export interface DatastoreActivityType {
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
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
  /** The actor object describes details about the user/role/process that was the source of the activity. Note that this is not the threat actor of a campaign but may be part of a campaign. */
  actor: ActorType;
  /** The database object is used for databases which are typically datastore services that contain an organized collection of structured and unstructured data or a types of data. */
  database?: DatabaseType;
  /** The data bucket object is a basic container that holds data, typically organized through the use of data partitions. */
  databucket?: DatabucketType;
  /** Details about the endpoint hosting the datastore application or service. */
  dst_endpoint?: NetworkEndpointType;
  /** Details about the underlying http request. */
  http_request?: HttpRequestType;
  /** Details about the underlying http response. */
  http_response?: HttpResponseType;
  /** The query info object holds information related to data access within a datastore. To access, manipulate, delete, or retrieve data from a datastore, a database query must be written using a specific syntax. */
  query_info?: QueryInfoType;
  /** Details about the source of the activity. */
  src_endpoint: NetworkEndpointType;
  /** The table object represents a table within a structured relational database or datastore, which contains columns and rows of data that are able to be create, updated, deleted and queried. */
  table?: TableType;
  /** The datastore resource type (e.g. database, datastore, or table). */
  type?: string;
  /** The normalized datastore resource type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 99;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { Actor } from '../objects/actor.js';
import { Database } from '../objects/database.js';
import { Databucket } from '../objects/databucket.js';
import { NetworkEndpoint } from '../objects/network_endpoint.js';
import { HttpRequest } from '../objects/http_request.js';
import { HttpResponse } from '../objects/http_response.js';
import { QueryInfo } from '../objects/query_info.js';
import { Table } from '../objects/table.js';

/** Value → label mappings for each enum field of DatastoreActivity. */
export const DatastoreActivityLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id" | "type_id", Readonly<Record<number, string>>>> = {
  activity_id: {
    0: "Unknown",
    1: "Read",
    2: "Update",
    3: "Connect",
    4: "Query",
    5: "Write",
    6: "Create",
    7: "Delete",
    8: "List",
    9: "Encrypt",
    10: "Decrypt",
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
  type_id: {
    0: "Unknown",
    1: "Database",
    2: "Databucket",
    3: "Table",
    99: "Other",
  },
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: DatastoreActivityLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: DatastoreActivityLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: DatastoreActivityLabels.status_id },
  { idField: "type_id", labelField: "type", labels: DatastoreActivityLabels.type_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 6,
  classUid: 6005,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type DatastoreActivityShape = {
  activity_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<99>]>>;
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
  actor: typeof Actor;
  database: z.ZodOptional<typeof Database>;
  databucket: z.ZodOptional<typeof Databucket>;
  dst_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  http_request: z.ZodOptional<typeof HttpRequest>;
  http_response: z.ZodOptional<typeof HttpResponse>;
  query_info: z.ZodOptional<typeof QueryInfo>;
  src_endpoint: typeof NetworkEndpoint;
  table: z.ZodOptional<typeof Table>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
};

const DatastoreActivitySchema: z.ZodObject<DatastoreActivityShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. Each event class defines its own set of activity values. Use 0 (Unknown) when the activity cannot be determined. Use 99 (Other) when the activity does not match any defined value, in which case activity_name must be populated with the source-specific label. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]).optional(),
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
  /** The actor object describes details about the user/role/process that was the source of the activity. Note that this is not the threat actor of a campaign but may be part of a campaign. */
  actor: Actor,
  /** The database object is used for databases which are typically datastore services that contain an organized collection of structured and unstructured data or a types of data. */
  database: Database.optional(),
  /** The data bucket object is a basic container that holds data, typically organized through the use of data partitions. */
  databucket: Databucket.optional(),
  /** Details about the endpoint hosting the datastore application or service. */
  dst_endpoint: NetworkEndpoint.optional(),
  /** Details about the underlying http request. */
  http_request: HttpRequest.optional(),
  /** Details about the underlying http response. */
  http_response: HttpResponse.optional(),
  /** The query info object holds information related to data access within a datastore. To access, manipulate, delete, or retrieve data from a datastore, a database query must be written using a specific syntax. */
  query_info: QueryInfo.optional(),
  /** Details about the source of the activity. */
  src_endpoint: NetworkEndpoint,
  /** The table object represents a table within a structured relational database or datastore, which contains columns and rows of data that are able to be create, updated, deleted and queried. */
  table: Table.optional(),
  /** The datastore resource type (e.g. database, datastore, or table). */
  type: z.string().optional(),
  /** The normalized datastore resource type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
});

export const DatastoreActivity = {
  parse: (data: unknown): DatastoreActivityType => DatastoreActivitySchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: DatastoreActivityType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return DatastoreActivitySchema.safeParse(preprocessed);
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

  schema: DatastoreActivitySchema,

  // Value → label maps for every enum field
  labels: DatastoreActivityLabels,

  // Static enum references for convenience
  ActivityId: DatastoreActivityActivityId,
  SeverityId: SeverityId,
  StatusId: DatastoreActivityStatusId,
  TypeId: DatastoreActivityTypeId,
} as const;
