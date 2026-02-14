import { z } from 'zod';

import type { FileType } from './file.js';
import type { UserType } from './user.js';
import type { RemediationType } from './remediation.js';
import type { RuleType } from './rule.js';

/**
 * The Affected Code object describes details about a code block identified as vulnerable.
 *
 * OCSF Object: Affected Code
 */
export interface AffectedCodeType {
  /** The column number of the last part of the assessed code identified as vulnerable. */
  end_column?: number;
  /** The line number of the last line of code block identified as vulnerable. */
  end_line?: number;
  /** Details about the file that contains the affected code block. */
  file: FileType;
  /** Details about the user that owns the affected file. */
  owner?: UserType;
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation?: RemediationType;
  /** Details about the specific rule, e.g., those defined as part of a larger policy, that triggered the finding. */
  rule?: RuleType;
  /** The column number of the first part of the assessed code identified as vulnerable. */
  start_column?: number;
  /** The line number of the first line of code block identified as vulnerable. */
  start_line?: number;
}

import { File } from './file.js';
import { User } from './user.js';
import { Remediation } from './remediation.js';
import { Rule } from './rule.js';

const AffectedCodeSchema = z.strictObject({
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
});

export const AffectedCode = AffectedCodeSchema;
