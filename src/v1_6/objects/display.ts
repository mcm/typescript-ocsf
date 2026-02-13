import { z } from 'zod';

/**
 * The Display object contains information about the physical or virtual display connected to a computer system.
 *
 * OCSF Object: Display
 */
export const Display = z.object({
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
}).passthrough();

export type DisplayType = z.infer<typeof Display>;
