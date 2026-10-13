import { z } from 'zod';

import type { UserType } from './user.js';

/**
 * Represents a note or a comment in the system. Notes can be used to provide additional context, explanations, or observations related to an event, object, or any other entity in the system. They can be created and modified by users to capture important information that may not be directly represented in the structured data.
 *
 * OCSF Object: Note
 */
export interface NoteType {
  /** A user provided comment. */
  comment: string;
  /** The time when the note was created. */
  created_time?: number;
  /** The time when the note was last modified. */
  modified_time?: number;
  /** The user who created or last modified the note. Typically the same user that created the note can modify the note. */
  owner?: UserType;
  /** A short description of the comment, if applicable. */
  title?: string;
  /** The unique identifier of the note, if applicable. */
  uid?: string;
}

import { User } from './user.js';

type NoteShape = {
  comment: z.ZodString;
  created_time: z.ZodOptional<z.ZodNumber>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  owner: z.ZodOptional<typeof User>;
  title: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
};

const NoteSchema: z.ZodObject<NoteShape, z.core.$strict> = z.strictObject({
  /** A user provided comment. */
  comment: z.string(),
  /** The time when the note was created. */
  created_time: z.number().int().optional(),
  /** The time when the note was last modified. */
  modified_time: z.number().int().optional(),
  /** The user who created or last modified the note. Typically the same user that created the note can modify the note. */
  owner: User.optional(),
  /** A short description of the comment, if applicable. */
  title: z.string().optional(),
  /** The unique identifier of the note, if applicable. */
  uid: z.string().optional(),
});

export const Note = NoteSchema;

/** Value → label mappings for each enum field of Note. */
export const NoteLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
