import { z } from 'zod';

/**
 * The Security State object describes the security related state of a managed entity.
 *
 * OCSF Object: Security State
 */
export interface SecurityStateType {
  /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
  state?: string;
  /** The security state of the managed entity. */
  state_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 99;
}

const SecurityStateSchema: z.ZodType<SecurityStateType> = z.strictObject({
  /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
  state: z.string().optional(),
  /** The security state of the managed entity. */
  state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(22), z.literal(23), z.literal(99)]).optional(),
});

export const SecurityState = SecurityStateSchema;
