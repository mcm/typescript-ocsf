import { z } from 'zod';

/**
 * The CIS Critical Security Control (CSC) contains information as defined by the Center for Internet Security Critical Security Control <a target='_blank' href='https://www.cisecurity.org/controls'>(CIS CSC)</a>. Prioritized set of actions to protect your organization and data from cyber-attack vectors.
 *
 * OCSF Object: CIS CSC
 */
export const CisCsc = z.strictObject({
  /** A Control is prescriptive, prioritized, and simplified set of best practices that one can use to strengthen their cybersecurity posture. e.g. AWS SecurityHub Controls, CIS Controls. */
  control: z.string(),
  /** The CIS critical security control version. */
  version: z.string().optional(),
});

export type CisCscType = z.infer<typeof CisCsc>;
