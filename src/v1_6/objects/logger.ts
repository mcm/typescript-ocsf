import { z } from 'zod';

import type { DeviceType } from './device.js';
import type { ProductType } from './product.js';

/**
 * The Logger object represents the device and product where events are stored with times for receipt and transmission.  This may be at the source device where the event occurred, a remote scanning device, intermediate hops, or the ultimate destination.
 *
 * OCSF Object: Logger
 */
export interface LoggerType {
  /** The name of the logging product instance. */
  name?: string;
  /** The unique identifier of the logging product instance. */
  uid?: string;
  /** The device where the events are logged. */
  device?: DeviceType;
  /** The unique identifier of the event assigned by the logger. */
  event_uid?: string;
  /** Indicates whether the OCSF event data has been truncated due to size limitations. When true, some event data may have been omitted to fit within system constraints. */
  is_truncated?: boolean;
  /** The audit level at which an event was generated. */
  log_level?: string;
  /** The event log name. For example, syslog file name or Windows logging subsystem: Security. */
  log_name?: string;
  /** The logging provider or logging service that logged the event. For example, Microsoft-Windows-Security-Auditing. */
  log_provider?: string;
  /** The event log schema version that specifies the format of the original event. For example syslog version or Cisco Log Schema Version. */
  log_version?: string;
  /** The time when the logging system collected and logged the event.This attribute is distinct from the event time in that event time typically contain the time extracted from the original event. Most of the time, these two times will be different. */
  logged_time?: number;
  /** The product logging the event. This may be the event source product, a management server product, a scanning product, a SIEM, etc. */
  product?: ProductType;
  /** The time when the event was transmitted from the logging device to it's next destination. */
  transmit_time?: number;
  /** The original size of the OCSF event data in kilobytes before any truncation occurred. This field is typically populated when is_truncated is true to indicate the full size of the original event. */
  untruncated_size?: number;
  /** The version of the logging product. */
  version?: string;
}

import { Device } from './device.js';
import { Product } from './product.js';

const LoggerSchema = z.strictObject({
  /** The name of the logging product instance. */
  name: z.string().optional(),
  /** The unique identifier of the logging product instance. */
  uid: z.string().optional(),
  /** The device where the events are logged. */
  device: Device.optional(),
  /** The unique identifier of the event assigned by the logger. */
  event_uid: z.string().optional(),
  /** Indicates whether the OCSF event data has been truncated due to size limitations. When true, some event data may have been omitted to fit within system constraints. */
  is_truncated: z.boolean().optional(),
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
  /** The product logging the event. This may be the event source product, a management server product, a scanning product, a SIEM, etc. */
  product: Product.optional(),
  /** The time when the event was transmitted from the logging device to it's next destination. */
  transmit_time: z.number().int().optional(),
  /** The original size of the OCSF event data in kilobytes before any truncation occurred. This field is typically populated when is_truncated is true to indicate the full size of the original event. */
  untruncated_size: z.number().int().optional(),
  /** The version of the logging product. */
  version: z.string().optional(),
});

export const Logger = LoggerSchema;
