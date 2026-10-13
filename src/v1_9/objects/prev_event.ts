import { z } from 'zod';

import type { FingerprintType } from './fingerprint.js';

/**
 * The Previous Event object references the previous event in a chain of events. Refer to specific usage.
 *
 * OCSF Object: Previous Event
 */
export interface PrevEventType {
  /** The fingerprint of the previous event, binding this reference to the previous event's content so that altering or substituting the previous event breaks the link. Refer to specific usage. */
  fingerprint?: FingerprintType;
  /** The event type identifier of the previous event, as carried in that event's type_uid. It directs a consumer to the event class, and therefore the table or store, where the previous event resides. */
  type_uid?: number;
  /** The unique identifier of the previous event, as carried in that event's metadata.uid. */
  uid: string;
}

import { Fingerprint } from './fingerprint.js';

type PrevEventShape = {
  fingerprint: z.ZodOptional<typeof Fingerprint>;
  type_uid: z.ZodOptional<z.ZodNumber>;
  uid: z.ZodString;
};

const PrevEventSchema: z.ZodObject<PrevEventShape, z.core.$strict> = z.strictObject({
  /** The fingerprint of the previous event, binding this reference to the previous event's content so that altering or substituting the previous event breaks the link. Refer to specific usage. */
  fingerprint: Fingerprint.optional(),
  /** The event type identifier of the previous event, as carried in that event's type_uid. It directs a consumer to the event class, and therefore the table or store, where the previous event resides. */
  type_uid: z.number().int().optional(),
  /** The unique identifier of the previous event, as carried in that event's metadata.uid. */
  uid: z.string(),
});

export const PrevEvent = PrevEventSchema;

/** Value → label mappings for each enum field of PrevEvent. */
export const PrevEventLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
