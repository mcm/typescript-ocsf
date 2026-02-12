import { z } from 'zod';

import { Extension } from './extension.js';
import { Logger } from './logger.js';
import { Product } from './product.js';
import { KeyValueObject } from './key_value_object.js';
import { TransformationInfo } from './transformation_info.js';

/**
 * The Metadata object describes the metadata associated with the event.
 *
 * OCSF Object: Metadata
 */
export const Metadata = z.object({
  /** The unique identifier used to correlate events. */
  correlation_uid: z.string().optional(),
  /** Debug information about non-fatal issues with this OCSF event. Each issue is a line in this string array. */
  debug: z.array(z.string()).optional(),
  /** The Event ID, Code, or Name that the product uses to primarily identify the event. */
  event_code: z.string().optional(),
  /** The schema extension used to create the event. */
  extension: Extension.optional(),
  /** The schema extensions used to create the event. */
  extensions: z.array(Extension).optional(),
  /** The list of labels attached to the event. For example: ["sample", "dev"] */
  labels: z.array(z.string()).optional(),
  /** The audit level at which an event was generated. */
  log_level: z.string().optional(),
  /** The event log name. For example, syslog file name or Windows logging subsystem: Security. */
  log_name: z.string().optional(),
  /** The logging provider or logging service that logged the event. For example, Microsoft-Windows-Security-Auditing. */
  log_provider: z.string().optional(),
  /** The event log schema version that specifies the format of the original event. For example syslog version or Cisco Log Schema Version. */
  log_version: z.string().optional(),
  /** The time when the logging system collected and logged the event.This attribute is distinct from the event time in that event time typically contain the time extracted from the original event. Most of the time, these two times will be different. */
  logged_time: z.number().int().optional(),
  /** An array of Logger objects that describe the devices and logging products between the event source and its eventual destination. Note, this attribute can be used when there is a complex end-to-end path of event flow. */
  loggers: z.array(Logger).optional(),
  /** The time when the event was last modified or enriched. */
  modified_time: z.number().int().optional(),
  /** The original event time as reported by the event source. For example, the time in the original format from system event log such as Syslog on Unix/Linux and the System event file on Windows. Omit if event is generated instead of collected via logs. */
  original_time: z.string().optional(),
  /** The event processed time, such as an ETL operation. */
  processed_time: z.number().int().optional(),
  /** The product that reported the event. */
  product: Product,
  /** The list of profiles used to create the event. Profiles should be referenced by their name attribute for core profiles, or extension/name for profiles from extensions. */
  profiles: z.array(z.string()).optional(),
  /** Sequence number of the event. The sequence number is a value available in some events, to make the exact ordering of events unambiguous, regardless of the event time precision. */
  sequence: z.number().int().optional(),
  /** The list of tags; {key:value} pairs associated to the event. */
  tags: z.array(KeyValueObject).optional(),
  /** The unique tenant identifier. */
  tenant_uid: z.string().optional(),
  /** An array of transformation info that describes the mappings or transforms applied to the data. */
  transformation_info_list: z.array(TransformationInfo).optional(),
  /** The logging system-assigned unique identifier of an event instance. */
  uid: z.string().optional(),
  /** The version of the OCSF schema, using Semantic Versioning Specification (SemVer). For example: 1.0.0. Event consumers use the version to determine the available event attributes. */
  version: z.string(),
}).passthrough() as any;

export type MetadataType = z.infer<typeof Metadata>;
