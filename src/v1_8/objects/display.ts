import { z } from 'zod';

/**
 * The Display object contains information about the physical or virtual display connected to a computer system.
 *
 * OCSF Object: Display
 */
export interface DisplayType {
  /** The numeric color depth. */
  color_depth?: number;
  /** The numeric physical height of display. */
  physical_height?: number;
  /** The numeric physical orientation of display. */
  physical_orientation?: number;
  /** The numeric physical width of display. */
  physical_width?: number;
  /** The numeric scale factor of display. */
  scale_factor?: number;
}

type DisplayShape = {
  color_depth: z.ZodOptional<z.ZodNumber>;
  physical_height: z.ZodOptional<z.ZodNumber>;
  physical_orientation: z.ZodOptional<z.ZodNumber>;
  physical_width: z.ZodOptional<z.ZodNumber>;
  scale_factor: z.ZodOptional<z.ZodNumber>;
};

const DisplaySchema: z.ZodObject<DisplayShape, z.core.$strict> = z.strictObject({
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
});

export const Display = DisplaySchema;

/** Value → label mappings for each enum field of Display. */
export const DisplayLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
