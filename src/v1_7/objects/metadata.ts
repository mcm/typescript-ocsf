import { z } from "zod";

import { Extension, type ExtensionType } from "./extension.js";
import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";
import { Logger, type LoggerType } from "./logger.js";
import { Product, type ProductType } from "./product.js";
import { Reporter, type ReporterType } from "./reporter.js";
import { TransformationInfo, type TransformationInfoType } from "./transformation_info.js";

/**
 * The Metadata object describes the metadata associated with the event.
 *
 * OCSF Object: Metadata
 */
export interface MetadataType {
  /** A unique identifier used to correlate this OCSF event with other related OCSF events, distinct from the event's uid value. This enables linking multiple OCSF events that are part of the same activity, transaction, or security incident across different systems or time periods. */
  correlation_uid?: string | undefined;
  /** Debug information about non-fatal issues with this OCSF event. Each issue is a line in this string array. */
  debug?: string[] | undefined;
  /** The identifier of the original event. For example the numerical Windows Event Code or Cisco syslog code. */
  event_code?: string | undefined;
  /** The schema extension used to create the event. */
  extension?: ExtensionType | undefined;
  /** The schema extensions used to create the event. */
  extensions?: ExtensionType[] | undefined;
  /** Indicates whether the OCSF event data has been truncated due to size limitations. When true, some event data may have been omitted to fit within system constraints. */
  is_truncated?: boolean | undefined;
  /** The list of labels attached to the event. For example: ["sample", "dev"] */
  labels?: string[] | undefined;
  /** The format of data in the log where the data originated. For example CSV, XML, Windows Multiline, JSON, syslog or Cisco Log Schema. */
  log_format?: string | undefined;
  /** The level at which an event was logged. This can be log provider specific. For example the audit level. */
  log_level?: string | undefined;
  /** The event log name, typically for the consumer of the event. For example, the storage bucket name, SIEM repository index name, etc. */
  log_name?: string | undefined;
  /** The logging provider or logging service that logged the event. For example AWS CloudWatch or Splunk. */
  log_provider?: string | undefined;
  /** The log system or component where the data originated. For example, a file path, syslog server name or a Windows hostname and logging subsystem such as Security. */
  log_source?: string | undefined;
  /** The event log schema version of the original event. For example the syslog version or the Cisco Log Schema version */
  log_version?: string | undefined;
  /** The time when the logging system collected and logged the event.This attribute is distinct from the event time in that event time typically contain the time extracted from the original event. Most of the time, these two times will be different. */
  logged_time?: number | undefined;
  /** An array of Logger objects that describe the pipeline of devices and logging products between the event source and its eventual destination. Note, this attribute can be used when there is a complex end-to-end path of event flow and/or to track the chain of custody of the data. */
  loggers?: LoggerType[] | undefined;
  /** The time when the event was last modified or enriched. */
  modified_time?: number | undefined;
  /** The unique identifier assigned to the event in its original logging system before transformation to OCSF format. This field preserves the source system's native event identifier, enabling traceability back to the raw log entry. For example, a Windows Event Record ID, a syslog message ID, a Splunk _cd value, or a database transaction log sequence number. */
  original_event_uid?: string | undefined;
  /** The original event time as reported by the event source. For example, the time in the original format from system event log such as Syslog on Unix/Linux and the System event file on Windows. Omit if event is generated instead of collected via logs. */
  original_time?: string | undefined;
  /** The event processed time, such as an ETL operation. */
  processed_time?: number | undefined;
  /** The product that reported the event. */
  product: ProductType;
  /** The list of profiles used to create the event. Profiles should be referenced by their name attribute for core profiles, or extension/name for profiles from extensions. */
  profiles?: string[] | undefined;
  /** The entity from which the event or finding was first reported. */
  reporter?: ReporterType | undefined;
  /** Sequence number of the event. The sequence number is a value available in some events, to make the exact ordering of events unambiguous, regardless of the event time precision. */
  sequence?: number | undefined;
  /** The source of the event or finding. This can be any distinguishing name for the logical origin of the data — for example, 'CloudTrail Events', or a use case like 'Attack Simulations' or 'Vulnerability Scans'. */
  source?: string | undefined;
  /** The list of tags; {key:value} pairs associated to the event. */
  tags?: KeyValueObjectType[] | undefined;
  /** The unique tenant identifier. */
  tenant_uid?: string | undefined;
  /** An array of transformation info that describes the mappings or transforms applied to the data. */
  transformation_info_list?: TransformationInfoType[] | undefined;
  /** The time when the event was transmitted from the logging device to it's next destination. */
  transmit_time?: number | undefined;
  /** The type of the event or finding as a subset of the source of the event. This can be any distinguishing characteristic of the data. For example 'Management Events' or 'Device Penetration Test'. */
  type?: string | undefined;
  /** A unique identifier assigned to the OCSF event. This ID is specific to the OCSF event itself and is distinct from the original event identifier in the source system (see original_event_uid). */
  uid?: string | undefined;
  /** The original size of the OCSF event data in kilobytes before any truncation occurred. This field is typically populated when is_truncated is true to indicate the full size of the original event. */
  untruncated_size?: number | undefined;
  /** The version of the OCSF schema, using Semantic Versioning Specification (SemVer). For example: 1.0.0. Event consumers use the version to determine the available event attributes. */
  version: string;
  [key: string]: unknown;
}

export const Metadata: z.ZodType<MetadataType> = z
  .object({
    /** A unique identifier used to correlate this OCSF event with other related OCSF events, distinct from the event's uid value. This enables linking multiple OCSF events that are part of the same activity, transaction, or security incident across different systems or time periods. */
    correlation_uid: z.string().optional(),
    /** Debug information about non-fatal issues with this OCSF event. Each issue is a line in this string array. */
    debug: z.array(z.string()).optional(),
    /** The identifier of the original event. For example the numerical Windows Event Code or Cisco syslog code. */
    event_code: z.string().optional(),
    /** The schema extension used to create the event. */
    extension: Extension.optional(),
    /** The schema extensions used to create the event. */
    extensions: z.array(Extension).optional(),
    /** Indicates whether the OCSF event data has been truncated due to size limitations. When true, some event data may have been omitted to fit within system constraints. */
    is_truncated: z.boolean().optional(),
    /** The list of labels attached to the event. For example: ["sample", "dev"] */
    labels: z.array(z.string()).optional(),
    /** The format of data in the log where the data originated. For example CSV, XML, Windows Multiline, JSON, syslog or Cisco Log Schema. */
    log_format: z.string().optional(),
    /** The level at which an event was logged. This can be log provider specific. For example the audit level. */
    log_level: z.string().optional(),
    /** The event log name, typically for the consumer of the event. For example, the storage bucket name, SIEM repository index name, etc. */
    log_name: z.string().optional(),
    /** The logging provider or logging service that logged the event. For example AWS CloudWatch or Splunk. */
    log_provider: z.string().optional(),
    /** The log system or component where the data originated. For example, a file path, syslog server name or a Windows hostname and logging subsystem such as Security. */
    log_source: z.string().optional(),
    /** The event log schema version of the original event. For example the syslog version or the Cisco Log Schema version */
    log_version: z.string().optional(),
    /** The time when the logging system collected and logged the event.This attribute is distinct from the event time in that event time typically contain the time extracted from the original event. Most of the time, these two times will be different. */
    logged_time: z.number().int().optional(),
    /** An array of Logger objects that describe the pipeline of devices and logging products between the event source and its eventual destination. Note, this attribute can be used when there is a complex end-to-end path of event flow and/or to track the chain of custody of the data. */
    loggers: z.array(Logger).optional(),
    /** The time when the event was last modified or enriched. */
    modified_time: z.number().int().optional(),
    /** The unique identifier assigned to the event in its original logging system before transformation to OCSF format. This field preserves the source system's native event identifier, enabling traceability back to the raw log entry. For example, a Windows Event Record ID, a syslog message ID, a Splunk _cd value, or a database transaction log sequence number. */
    original_event_uid: z.string().optional(),
    /** The original event time as reported by the event source. For example, the time in the original format from system event log such as Syslog on Unix/Linux and the System event file on Windows. Omit if event is generated instead of collected via logs. */
    original_time: z.string().optional(),
    /** The event processed time, such as an ETL operation. */
    processed_time: z.number().int().optional(),
    /** The product that reported the event. */
    product: Product,
    /** The list of profiles used to create the event. Profiles should be referenced by their name attribute for core profiles, or extension/name for profiles from extensions. */
    profiles: z.array(z.string()).optional(),
    /** The entity from which the event or finding was first reported. */
    reporter: Reporter.optional(),
    /** Sequence number of the event. The sequence number is a value available in some events, to make the exact ordering of events unambiguous, regardless of the event time precision. */
    sequence: z.number().int().optional(),
    /** The source of the event or finding. This can be any distinguishing name for the logical origin of the data — for example, 'CloudTrail Events', or a use case like 'Attack Simulations' or 'Vulnerability Scans'. */
    source: z.string().optional(),
    /** The list of tags; {key:value} pairs associated to the event. */
    tags: z.array(KeyValueObject).optional(),
    /** The unique tenant identifier. */
    tenant_uid: z.string().optional(),
    /** An array of transformation info that describes the mappings or transforms applied to the data. */
    transformation_info_list: z.array(TransformationInfo).optional(),
    /** The time when the event was transmitted from the logging device to it's next destination. */
    transmit_time: z.number().int().optional(),
    /** The type of the event or finding as a subset of the source of the event. This can be any distinguishing characteristic of the data. For example 'Management Events' or 'Device Penetration Test'. */
    type: z.string().optional(),
    /** A unique identifier assigned to the OCSF event. This ID is specific to the OCSF event itself and is distinct from the original event identifier in the source system (see original_event_uid). */
    uid: z.string().optional(),
    /** The original size of the OCSF event data in kilobytes before any truncation occurred. This field is typically populated when is_truncated is true to indicate the full size of the original event. */
    untruncated_size: z.number().int().optional(),
    /** The version of the OCSF schema, using Semantic Versioning Specification (SemVer). For example: 1.0.0. Event consumers use the version to determine the available event attributes. */
    version: z.string(),
  })
  .passthrough() as any;
