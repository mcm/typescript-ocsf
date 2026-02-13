import { z } from 'zod';

/**
 * The peripheral device object describes the identity, vendor and model of a peripheral device.
 *
 * OCSF Object: Peripheral Device
 */
export const PeripheralDevice = z.strictObject({
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

export type PeripheralDeviceType = z.infer<typeof PeripheralDevice>;
