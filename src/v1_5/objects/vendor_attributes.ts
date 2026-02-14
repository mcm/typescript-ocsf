import { z } from 'zod';

/**
 * The Vendor Attributes object can be used to represent values of attributes populated by the Vendor/Finding Provider. It can help distinguish between the vendor-prodvided values and consumer-updated values, of key attributes like <code>severity_id</code>.<br>The original finding producer should not populate this object. It should be populated by consuming systems that support data mutability.
 *
 * OCSF Object: Vendor Attributes
 */
export interface VendorAttributesType {
  /** The finding severity, as reported by the Vendor (Finding Provider). The value should be normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The finding severity ID, as reported by the Vendor (Finding Provider). */
  severity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
}

const VendorAttributesSchema = z.strictObject({
  /** The finding severity, as reported by the Vendor (Finding Provider). The value should be normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The finding severity ID, as reported by the Vendor (Finding Provider). */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
});

export const VendorAttributes = VendorAttributesSchema;
