import { z } from 'zod';

import type { ReputationType } from './reputation.js';

/**
 * The observable object is a pivot element that contains related information found in many places in the event.
 *
 * OCSF Object: Observable
 */
export interface ObservableType {
  /** The full name of the observable attribute. The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. */
  name?: string;
  /** Contains the original and normalized reputation scores. */
  reputation?: ReputationType;
  /** The observable value type name. */
  type?: string;
  /** The observable value type identifier. */
  type_id: 0 | 99;
  /** The value associated with the observable attribute. The meaning of the value depends on the observable type.If the name refers to a scalar attribute, then the value is the value of the attribute.If the name refers to an object attribute, then the value is not populated. */
  value?: string;
}

import { Reputation } from './reputation.js';

const ObservableSchema = z.strictObject({
  /** The full name of the observable attribute. The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. */
  name: z.string().optional(),
  /** Contains the original and normalized reputation scores. */
  reputation: Reputation.optional(),
  /** The observable value type name. */
  type: z.string().optional(),
  /** The observable value type identifier. */
  type_id: z.union([z.literal(0), z.literal(99)]),
  /** The value associated with the observable attribute. The meaning of the value depends on the observable type.If the name refers to a scalar attribute, then the value is the value of the attribute.If the name refers to an object attribute, then the value is not populated. */
  value: z.string().optional(),
});

export const Observable = ObservableSchema;
