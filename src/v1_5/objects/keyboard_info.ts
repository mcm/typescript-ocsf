import { z } from 'zod';

/**
 * The Keyboard Information object contains details and attributes related to a computer or device keyboard. It encompasses information that describes the characteristics, capabilities, and configuration of the keyboard.
 *
 * OCSF Object: Keyboard Information
 */
export const KeyboardInfo = z.object({
  /** The number of function keys on client keyboard. */
  function_keys: z.number().int().optional(),
  /** The Input Method Editor (IME) file name. */
  ime: z.string().optional(),
  /** The keyboard locale identifier name (e.g., en-US). */
  keyboard_layout: z.string().optional(),
  /** The keyboard numeric code. */
  keyboard_subtype: z.number().int().optional(),
  /** The keyboard type (e.g., xt, ico). */
  keyboard_type: z.string().optional(),
}).passthrough();

export type KeyboardInfoType = z.infer<typeof KeyboardInfo>;
