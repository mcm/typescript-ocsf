import { z } from "zod";

/**
 * The Display object contains information about the physical or virtual display connected to a computer system.
 *
 * OCSF Object: Display
 */
export interface DisplayType {
  /** The numeric color depth. */
  color_depth?: number | undefined;
  /** The numeric physical height of display. */
  physical_height?: number | undefined;
  /** The numeric physical orientation of display. */
  physical_orientation?: number | undefined;
  /** The numeric physical width of display. */
  physical_width?: number | undefined;
  /** The numeric scale factor of display. */
  scale_factor?: number | undefined;
  [key: string]: unknown;
}

export const Display: z.ZodType<DisplayType> = z
  .object({
    /** The numeric color depth. */
    color_depth: z.number().int().optional(),
    /** The numeric physical height of display. */
    physical_height: z.number().int().optional(),
    /** The numeric physical orientation of display. */
    physical_orientation: z.number().int().optional(),
    /** The numeric physical width of display. */
    physical_width: z.number().int().optional(),
    /** The numeric scale factor of display. */
    scale_factor: z.number().int().optional(),
  })
  .passthrough() as any;
