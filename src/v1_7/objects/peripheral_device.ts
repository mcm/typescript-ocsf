import { z } from 'zod';

/**
 * The peripheral device object describes the properties of external, connectable, and detachable hardware.
 *
 * OCSF Object: Peripheral Device
 */
export const PeripheralDevice: any = z.object({
  /** The name of the peripheral device. */
  name: z.string(),
  /** The unique identifier of the peripheral device. */
  uid: z.string().optional(),
  /** The class of the peripheral device. */
  class: z.string().optional(),
  /** The peripheral device model. */
  model: z.string().optional(),
  /** The peripheral device serial number. */
  serial_number: z.string().optional(),
  /** The Peripheral Device type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type: z.string().optional(),
  /** The normalized peripheral device type ID. */
  type_id: z.number().int().optional(),
  /** The list of vendor IDs for the peripheral device. */
  vendor_id_list: z.array(z.string()).optional(),
  /** The primary vendor name for the peripheral device. */
  vendor_name: z.string().optional(),
}).passthrough();

export type PeripheralDeviceType = z.infer<typeof PeripheralDevice>;
