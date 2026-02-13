import { z } from 'zod';

/**
 * The Security State object describes the security related state of a managed entity.
 *
 * OCSF Object: Security State
 */
export const SecurityState = z.object({
  /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
  state: z.string().optional(),
  /** The security state of the managed entity. */
  state_id: z.number().int().optional(),
}).passthrough();

export type SecurityStateType = z.infer<typeof SecurityState>;
