import { z } from 'zod';

import { Device } from './device.js';
import { Product } from './product.js';

/**
 * The Logger object represents the device and product where events are stored with times for receipt and transmission.  This may be at the source device where the event occurred, a remote scanning device, intermediate hops, or the ultimate destination.
 *
 * OCSF Object: Logger
 */
export const Logger = z.object({
  /** The name of the logging product instance. */
  name: z.string().optional(),
  /** The unique identifier of the logging product instance. */
  uid: z.string().optional(),
  /** The device where the events are logged. */
  device: Device.optional(),
  /** The unique identifier of the event assigned by the logger. */
  event_uid: z.string().optional(),
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
  /** The version of the logging product. */
  version: z.string().optional(),
}).passthrough() as any;

export type LoggerType = z.infer<typeof Logger>;
