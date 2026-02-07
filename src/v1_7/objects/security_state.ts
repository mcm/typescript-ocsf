import { z } from "zod";

/**
 * The Security State object describes the security related state of a managed entity.
 *
 * OCSF Object: Security State
 */
export interface SecurityStateType {
  /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
  state?: string | undefined;
  /** The security state of the managed entity. */
  state_id?: number | undefined;
  [key: string]: unknown;
}

export const SecurityState: z.ZodType<SecurityStateType> = z
  .object({
    /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
    state: z.string().optional(),
    /** The security state of the managed entity. */
    state_id: z.number().int().optional(),
  })
  .passthrough() as any;
