import { z } from 'zod';

/**
 * The peripheral device object describes the identity, vendor and model of a peripheral device.
 *
 * OCSF Object: Peripheral Device
 */
export interface PeripheralDeviceType {
  /** The name of the peripheral device. */
  name: string;
  /** The unique identifier of the peripheral device. */
  uid?: string;
  /** The class of the peripheral device. */
  class: string;
  /** The peripheral device model. */
  model?: string;
  /** The peripheral device serial number. */
  serial_number?: string;
  /** The peripheral device vendor. */
  vendor_name?: string;
}

const PeripheralDeviceSchema = z.strictObject({
  /** The name of the peripheral device. */
  name: z.string(),
  /** The unique identifier of the peripheral device. */
  uid: z.string().optional(),
  /** The class of the peripheral device. */
  class: z.string(),
  /** The peripheral device model. */
  model: z.string().optional(),
  /** The peripheral device serial number. */
  serial_number: z.string().optional(),
  /** The peripheral device vendor. */
  vendor_name: z.string().optional(),
});

export const PeripheralDevice = PeripheralDeviceSchema;
