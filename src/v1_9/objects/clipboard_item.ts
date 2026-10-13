import { z } from 'zod';

/**
 * A piece of data on the system clipboard.
 *
 * OCSF Object: Clipboard Item
 */
export interface ClipboardItemType {
  /** The item's data in binary form, used when the clipboard content cannot be represented as text or when preserving the exact binary representation is required. */
  binary_data?: string;
  /** The type of the item's data, in an operating specific form. For example: CF_TEXT or public.utf8-plain-text. */
  clipboard_native_type?: string;
  /** The Multipurpose Internet Mail Extensions (MIME) type of the item's data. For example: text/plain. */
  mime_type: string;
  /** The item's data if it can be represented as a UTF-8 string. */
  string_data?: string;
}

type ClipboardItemShape = {
  binary_data: z.ZodOptional<z.ZodString>;
  clipboard_native_type: z.ZodOptional<z.ZodString>;
  mime_type: z.ZodString;
  string_data: z.ZodOptional<z.ZodString>;
};

const ClipboardItemSchema: z.ZodObject<ClipboardItemShape, z.core.$strict> = z.strictObject({
  /** The item's data in binary form, used when the clipboard content cannot be represented as text or when preserving the exact binary representation is required. */
  binary_data: z.string().optional(),
  /** The type of the item's data, in an operating specific form. For example: CF_TEXT or public.utf8-plain-text. */
  clipboard_native_type: z.string().optional(),
  /** The Multipurpose Internet Mail Extensions (MIME) type of the item's data. For example: text/plain. */
  mime_type: z.string(),
  /** The item's data if it can be represented as a UTF-8 string. */
  string_data: z.string().optional(),
});

export const ClipboardItem = ClipboardItemSchema;

/** Value → label mappings for each enum field of ClipboardItem. */
export const ClipboardItemLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
