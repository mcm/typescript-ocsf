import { z } from 'zod';

import { Reputation } from './reputation.js';

/**
 * The observable object is a pivot element that contains related information found in many places in the event.
 *
 * OCSF Object: Observable
 */
export const Observable = z.object({
  /** The unique identifier (metadata.uid) of the source OCSF event from which this observable was extracted. This field enables linking observables back to their originating event data when observables are stored in a separate location or system. */
  event_uid: z.string().optional(),
  /** The full name of the observable attribute. The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. Array attributes may be represented in one of three ways. For example: resources.uid, resources[].uid, resources[0].uid. */
  name: z.string().optional(),
  /** Contains the original and normalized reputation scores. */
  reputation: Reputation.optional(),
  /** The observable value type name. */
  type: z.string().optional(),
  /** The observable value type identifier. */
  type_id: z.number().int(),
  /** The OCSF event type UID (type_uid) of the source event that this observable was extracted from. This field enables filtering and categorizing observables by their originating event type. For example: 300101 for Network Activity (class_uid 3001) with activity_id 1. */
  type_uid: z.number().int().optional(),
  /** The value associated with the observable attribute. The meaning of the value depends on the observable type.If the name refers to a scalar attribute, then the value is the value of the attribute.If the name refers to an object attribute, then the value is not populated. */
  value: z.string().optional(),
}).passthrough() as any;

export type ObservableType = z.infer<typeof Observable>;
