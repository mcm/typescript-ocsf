import { z } from "zod";

import { Device, type DeviceType } from "./device.js";
import { Product, type ProductType } from "./product.js";

/**
 * The Logger object represents the device and product where events are stored with times for receipt and transmission.  This may be at the source device where the event occurred, a remote scanning device, intermediate hops, or the ultimate destination.
 *
 * OCSF Object: Logger
 */
export interface LoggerType {
  /** The name of the logging product instance. */
  name?: string | undefined;
  /** The unique identifier of the logging product instance. */
  uid?: string | undefined;
  /** The device where the events are logged. */
  device?: DeviceType | undefined;
  /** The unique identifier of the event assigned by the logger. */
  event_uid?: string | undefined;
  /** Indicates whether the OCSF event data has been truncated due to size limitations. When true, some event data may have been omitted to fit within system constraints. */
  is_truncated?: boolean | undefined;
  /** The format of data in the log. For example JSON, syslog or CSV. */
  log_format?: string | undefined;
  /** The level at which an event was logged. This can be log provider specific. For example the audit level. */
  log_level?: string | undefined;
  /** The log name for the logging provider log, or the file name of the system log. This may be an intermediate store-and-forward log or a vendor destination log. For example /archive/server1/var/log/messages.0 or /var/log/. */
  log_name?: string | undefined;
  /** The logging provider or logging service that logged the event. This may be an intermediate application store-and-forward log or a vendor destination log. */
  log_provider?: string | undefined;
  /** The event log schema version of the original event. For example the syslog version or the Cisco Log Schema version */
  log_version?: string | undefined;
  /** The time when the logging system collected and logged the event.This attribute is distinct from the event time in that event time typically contain the time extracted from the original event. Most of the time, these two times will be different. */
  logged_time?: number | undefined;
  /** The product logging the event. This may be the event source product, a management server product, a scanning product, a SIEM, etc. */
  product?: ProductType | undefined;
  /** The time when the event was transmitted from the logging device to it's next destination. */
  transmit_time?: number | undefined;
  /** The original size of the OCSF event data in kilobytes before any truncation occurred. This field is typically populated when is_truncated is true to indicate the full size of the original event. */
  untruncated_size?: number | undefined;
  /** The version of the logging provider. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Logger: z.ZodType<LoggerType> = z
  .object({
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
    /** The format of data in the log. For example JSON, syslog or CSV. */
    log_format: z.string().optional(),
    /** The level at which an event was logged. This can be log provider specific. For example the audit level. */
    log_level: z.string().optional(),
    /** The log name for the logging provider log, or the file name of the system log. This may be an intermediate store-and-forward log or a vendor destination log. For example /archive/server1/var/log/messages.0 or /var/log/. */
    log_name: z.string().optional(),
    /** The logging provider or logging service that logged the event. This may be an intermediate application store-and-forward log or a vendor destination log. */
    log_provider: z.string().optional(),
    /** The event log schema version of the original event. For example the syslog version or the Cisco Log Schema version */
    log_version: z.string().optional(),
    /** The time when the logging system collected and logged the event.This attribute is distinct from the event time in that event time typically contain the time extracted from the original event. Most of the time, these two times will be different. */
    logged_time: z.number().int().optional(),
    /** The product logging the event. This may be the event source product, a management server product, a scanning product, a SIEM, etc. */
    product: Product.optional(),
    /** The time when the event was transmitted from the logging device to it's next destination. */
    transmit_time: z.number().int().optional(),
    /** The original size of the OCSF event data in kilobytes before any truncation occurred. This field is typically populated when is_truncated is true to indicate the full size of the original event. */
    untruncated_size: z.number().int().optional(),
    /** The version of the logging provider. */
    version: z.string().optional(),
  })
  .passthrough() as any;
