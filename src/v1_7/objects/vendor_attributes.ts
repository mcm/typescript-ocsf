import { z } from 'zod';

/**
 * The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-provided values and consumer-updated values, of key attributes like <code>severity_id</code>.<br>The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability.
 *
 * OCSF Object: Vendor Attributes
 */
export const VendorAttributes = z.object({
  /** The finding severity, as reported by the Vendor (Finding Provider). The value should be normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The finding severity ID, as reported by the Vendor (Finding Provider). */
  severity_id: z.number().int().optional(),
}).passthrough();

export type VendorAttributesType = z.infer<typeof VendorAttributes>;
