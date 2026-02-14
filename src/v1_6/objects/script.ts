import { z } from 'zod';

import type { FileType } from './file.js';
import type { FingerprintType } from './fingerprint.js';
import type { LongStringType } from './long_string.js';

/**
 * The Script object describes a script or command that can be executed by a shell, script engine, or interpreter. Examples include Bash, JavsScript, PowerShell, Python, VBScript, etc. Note that the term <em>script</em> here denotes not only a script contained within a file but also a script or command typed interactively by a user, supplied on the command line, or provided by some other file-less mechanism.
 *
 * OCSF Object: Script
 */
export interface ScriptType {
  /** Present if this script is associated with a file. Not present in the case of a file-less script. */
  file?: FileType;
  /** An array of the script's cryptographic hashes. Note that these hashes are calculated on the script in its original encoding, and not on the normalized UTF-8 encoding found in the script_content attribute. */
  hashes?: FingerprintType[];
  /** Unique identifier for the script or macro, independent of the containing file, used for tracking, auditing, and security analysis. */
  name?: string;
  /** This attribute relates a sub-script to a parent script having the matching uid attribute. In the case of PowerShell, sub-script execution can be identified by matching the activity correlation ID of the raw ETW events provided by the OS. */
  parent_uid?: string;
  /** The script content, normalized to UTF-8 encoding irrespective of its original encoding. When emitting this attribute, it may be appropriate to truncate large scripts. When consuming this attribute, large scripts should be anticipated. */
  script_content: LongStringType;
  /** The script type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The normalized script type ID. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** Some script engines assign a unique ID to each individual execution of a given script. This attribute captures that unique ID. In the case of PowerShell, the unique ID corresponds to the ScriptBlockId in the raw ETW events provided by the OS. */
  uid?: string;
}

import { File } from './file.js';
import { Fingerprint } from './fingerprint.js';
import { LongString } from './long_string.js';

const ScriptSchema: z.ZodType<ScriptType> = z.strictObject({
  /** Present if this script is associated with a file. Not present in the case of a file-less script. */
  file: File.optional(),
  /** An array of the script's cryptographic hashes. Note that these hashes are calculated on the script in its original encoding, and not on the normalized UTF-8 encoding found in the script_content attribute. */
  hashes: z.array(Fingerprint).optional(),
  /** Unique identifier for the script or macro, independent of the containing file, used for tracking, auditing, and security analysis. */
  name: z.string().optional(),
  /** This attribute relates a sub-script to a parent script having the matching uid attribute. In the case of PowerShell, sub-script execution can be identified by matching the activity correlation ID of the raw ETW events provided by the OS. */
  parent_uid: z.string().optional(),
  /** The script content, normalized to UTF-8 encoding irrespective of its original encoding. When emitting this attribute, it may be appropriate to truncate large scripts. When consuming this attribute, large scripts should be anticipated. */
  script_content: LongString,
  /** The script type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The normalized script type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
  /** Some script engines assign a unique ID to each individual execution of a given script. This attribute captures that unique ID. In the case of PowerShell, the unique ID corresponds to the ScriptBlockId in the raw ETW events provided by the OS. */
  uid: z.string().optional(),
});

export const Script = ScriptSchema;
