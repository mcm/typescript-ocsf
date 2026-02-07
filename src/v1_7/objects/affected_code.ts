import { z } from "zod";

import { File, type FileType } from "./file.js";
import { Remediation, type RemediationType } from "./remediation.js";
import { Rule, type RuleType } from "./rule.js";
import { User, type UserType } from "./user.js";

/**
 * The Affected Code object describes details about a code block identified as vulnerable.
 *
 * OCSF Object: Affected Code
 */
export interface AffectedCodeType {
  /** The column number of the last part of the assessed code identified as vulnerable. */
  end_column?: number | undefined;
  /** The line number of the last line of code block identified as vulnerable. */
  end_line?: number | undefined;
  /** Details about the file that contains the affected code block. */
  file: FileType;
  /** Details about the user that owns the affected file. */
  owner?: UserType | undefined;
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation?: RemediationType | undefined;
  /** Details about the specific rule, e.g., those defined as part of a larger policy, that triggered the finding. */
  rule?: RuleType | undefined;
  /** The column number of the first part of the assessed code identified as vulnerable. */
  start_column?: number | undefined;
  /** The line number of the first line of code block identified as vulnerable. */
  start_line?: number | undefined;
  [key: string]: unknown;
}

export const AffectedCode: z.ZodType<AffectedCodeType> = z
  .object({
    /** The column number of the last part of the assessed code identified as vulnerable. */
    end_column: z.number().int().optional(),
    /** The line number of the last line of code block identified as vulnerable. */
    end_line: z.number().int().optional(),
    /** Details about the file that contains the affected code block. */
    file: File,
    /** Details about the user that owns the affected file. */
    owner: z.lazy(() => User).optional(),
    /** Describes the recommended remediation steps to address identified issue(s). */
    remediation: Remediation.optional(),
    /** Details about the specific rule, e.g., those defined as part of a larger policy, that triggered the finding. */
    rule: Rule.optional(),
    /** The column number of the first part of the assessed code identified as vulnerable. */
    start_column: z.number().int().optional(),
    /** The line number of the first line of code block identified as vulnerable. */
    start_line: z.number().int().optional(),
  })
  .passthrough() as any;
