import { z } from "zod";

/**
 * The CIS Control (aka Critical Security Control) object describes a prioritized set of actions to protect your organization and data from cyber-attack vectors. The <a target='_blank' href='https://www.cisecurity.org/controls'>CIS Controls</a> are defined by the Center for Internet Security.
 *
 * OCSF Object: CIS Control
 */
export interface CisControlType {
  /** The CIS Control description. For example: Uninstall or disable unnecessary services on enterprise assets and software, such as an unused file sharing service, web application module, or service function. */
  desc?: string | undefined;
  /** The CIS Control name. For example: 4.8 Uninstall or Disable Unnecessary Services on Enterprise Assets and Software. */
  name: string;
  /** The CIS Control version. For example: v8. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const CisControl: z.ZodType<CisControlType> = z
  .object({
    /** The CIS Control description. For example: Uninstall or disable unnecessary services on enterprise assets and software, such as an unused file sharing service, web application module, or service function. */
    desc: z.string().optional(),
    /** The CIS Control name. For example: 4.8 Uninstall or Disable Unnecessary Services on Enterprise Assets and Software. */
    name: z.string(),
    /** The CIS Control version. For example: v8. */
    version: z.string().optional(),
  })
  .passthrough() as any;
