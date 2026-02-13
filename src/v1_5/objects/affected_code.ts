import { z } from 'zod';

import { File } from './file.js';
import { User } from './user.js';
import { Remediation } from './remediation.js';
import { Rule } from './rule.js';

/**
 * The Affected Code object describes details about a code block identified as vulnerable.
 *
 * OCSF Object: Affected Code
 */
export const AffectedCode: any = z.object({
  /** The column number of the last part of the assessed code identified as vulnerable. */
  end_column: z.number().int().optional(),
  /** The line number of the last line of code block identified as vulnerable. */
  end_line: z.number().int().optional(),
  /** Details about the file that contains the affected code block. */
  file: File,
  /** Details about the user that owns the affected file. */
  owner: User.optional(),
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation: Remediation.optional(),
  /** Details about the specific rule, e.g., those defined as part of a larger policy, that triggered the finding. */
  rule: Rule.optional(),
  /** The column number of the first part of the assessed code identified as vulnerable. */
  start_column: z.number().int().optional(),
  /** The line number of the first line of code block identified as vulnerable. */
  start_line: z.number().int().optional(),
}).passthrough();

export type AffectedCodeType = z.infer<typeof AffectedCode>;
