import { z } from 'zod';

import type { ClipboardItemType } from './clipboard_item.js';

/**
 * The Clipboard object represents an endpoint clipboard and its contents.
 *
 * OCSF Object: Clipboard
 */
export interface ClipboardType {
  /** The data items written to, or read from, the clipboard. */
  contents?: ClipboardItemType[];
  /** The name of the clipboard on systems with named clipboards. For example: General or Drag. */
  name?: string;
}

import { ClipboardItem } from './clipboard_item.js';

type ClipboardShape = {
  contents: z.ZodOptional<z.ZodArray<typeof ClipboardItem>>;
  name: z.ZodOptional<z.ZodString>;
};

const ClipboardSchema: z.ZodObject<ClipboardShape, z.core.$strict> = z.strictObject({
  /** The data items written to, or read from, the clipboard. */
  contents: z.array(ClipboardItem).optional(),
  /** The name of the clipboard on systems with named clipboards. For example: General or Drag. */
  name: z.string().optional(),
});

export const Clipboard = ClipboardSchema;

/** Value → label mappings for each enum field of Clipboard. */
export const ClipboardLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
