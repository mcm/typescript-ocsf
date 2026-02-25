import { z } from 'zod';
import { ObservableTypeId, ObservableTypeIdLabels } from '../enums/observable_type_id.js';

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
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 44 | 45 | 99;
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(22), z.literal(23), z.literal(24), z.literal(25), z.literal(26), z.literal(27), z.literal(30), z.literal(31), z.literal(32), z.literal(33), z.literal(34), z.literal(35), z.literal(36), z.literal(37), z.literal(38), z.literal(39), z.literal(40), z.literal(41), z.literal(42), z.literal(44), z.literal(45), z.literal(99)]),
  /** The value associated with the observable attribute. The meaning of the value depends on the observable type.If the name refers to a scalar attribute, then the value is the value of the attribute.If the name refers to an object attribute, then the value is not populated. */
  value: z.string().optional(),
});

export const Observable = ObservableSchema;
