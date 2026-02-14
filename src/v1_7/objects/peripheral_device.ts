import { z } from 'zod';

/**
 * The peripheral device object describes the properties of external, connectable, and detachable hardware.
 *
 * OCSF Object: Peripheral Device
 */
export interface PeripheralDeviceType {
  /** The name of the peripheral device. */
  name: string;
  /** The unique identifier of the peripheral device. */
  uid?: string;
  /** The class of the peripheral device. */
  class?: string;
  /** The peripheral device model. */
  model?: string;
  /** The peripheral device serial number. */
  serial_number?: string;
  /** The Peripheral Device type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type?: string;
  /** The normalized peripheral device type ID. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The list of vendor IDs for the peripheral device. */
  vendor_id_list?: string[];
  /** The primary vendor name for the peripheral device. */
  vendor_name?: string;
}

const PeripheralDeviceSchema = z.strictObject({
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]).optional(),
  /** The list of vendor IDs for the peripheral device. */
  vendor_id_list: z.array(z.string()).optional(),
  /** The primary vendor name for the peripheral device. */
  vendor_name: z.string().optional(),
});

export const PeripheralDevice = PeripheralDeviceSchema;
