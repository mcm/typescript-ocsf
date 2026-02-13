import { z } from 'zod';

import { File } from './file.js';
import { Fingerprint } from './fingerprint.js';
import { LongString } from './long_string.js';

/**
 * The Script object describes a script or command that can be executed by a shell, script engine, or interpreter. Examples include Bash, JavsScript, PowerShell, Python, VBScript, etc. Note that the term <em>script</em> here denotes not only a script contained within a file but also a script or command typed interactively by a user, supplied on the command line, or provided by some other file-less mechanism.
 *
 * OCSF Object: Script
 */
export const Script = z.strictObject({
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
  type_id: z.number().int(),
  /** Some script engines assign a unique ID to each individual execution of a given script. This attribute captures that unique ID. In the case of PowerShell, the unique ID corresponds to the ScriptBlockId in the raw ETW events provided by the OS. */
  uid: z.string().optional(),
});

export type ScriptType = z.infer<typeof Script>;
