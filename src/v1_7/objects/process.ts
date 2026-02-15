import { z } from 'zod';

import type { ProcessEntityType } from './process_entity.js';
import type { EnvironmentVariableType } from './environment_variable.js';
import type { FileType } from './file.js';
import type { SessionType } from './session.js';
import type { UserType } from './user.js';

/**
 * The Process object describes a running instance of a launched program.
 *
 * OCSF Object: Process
 */
export interface ProcessType {
  /** The friendly name of the process, for example: Notepad++. */
  name?: string;
  /** A unique identifier for this process assigned by the producer (tool). Facilitates correlation of a process event with other events for that process. */
  uid?: string;
  /** The full command line used to launch an application, service, process, or job. For example: ssh user@10.0.0.10. If the command line is unavailable or missing, the empty string '' is to be used. */
  cmd_line?: string;
  /** A unique process identifier that can be assigned deterministically by multiple system data producers. */
  cpid?: string;
  /** The time when the process was created/started. */
  created_time?: number;
  /** The process file path. */
  path?: string;
  /** The process identifier, as reported by the operating system. Process ID (PID) is a number used by the operating system to uniquely identify an active process. */
  pid?: number;
  /** An array of Process Entities describing the extended parentage of this process object. Direct parent information should be expressed through the parent_process attribute. The first array element is the direct parent of this process object. Subsequent list elements go up the process parentage hierarchy. That is, the array is sorted from newest to oldest process. It is recommended to only populate this field for the top-level process object. */
  ancestry?: ProcessEntityType[];
  /** Environment variables associated with the process. */
  environment_variables?: EnvironmentVariableType[];
  /** The process file object. */
  file?: FileType;
  /** The process integrity level, normalized to the caption of the integrity_id value. In the case of 'Other', it is defined by the event source (Windows only). */
  integrity?: string;
  /** The normalized identifier of the process integrity level (Windows only). */
  integrity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The lineage of the process, represented by a list of paths for each ancestor process. For example: ['/usr/sbin/sshd', '/usr/bin/bash', '/usr/bin/whoami']. */
  lineage?: string[];
  /** The list of loaded module names. */
  loaded_modules?: string[];
  /** The parent process of this process object. It is recommended to only populate this field for the top-level process object, to prevent deep nesting. Additional ancestry information can be supplied in the ancestry attribute. */
  parent_process?: ProcessType;
  /** The identifier of the process thread associated with the event, as returned by the operating system. */
  ptid?: number;
  /** The name of the containment jail (i.e., sandbox). For example, hardened_ps, high_security_ps, oracle_ps, netsvcs_ps, or default_ps. */
  sandbox?: string;
  /** The user session under which this process is running. */
  session?: SessionType;
  /** The time when the process was terminated. */
  terminated_time?: number;
  /** The identifier of the thread associated with the event, as returned by the operating system. */
  tid?: number;
  /** The user under which this process is running. */
  user?: UserType;
  /** The working directory of a process. */
  working_directory?: string;
  /** An unordered collection of zero or more name/value pairs that represent a process extended attribute. */
  xattributes?: Record<string, unknown>;
}

import { ProcessEntity } from './process_entity.js';
import { EnvironmentVariable } from './environment_variable.js';
import { File } from './file.js';
import { Session } from './session.js';
import { User } from './user.js';

const ProcessSchema = z.strictObject({
  /** The friendly name of the process, for example: Notepad++. */
  name: z.string().optional(),
  /** A unique identifier for this process assigned by the producer (tool). Facilitates correlation of a process event with other events for that process. */
  uid: z.string().optional(),
  /** The full command line used to launch an application, service, process, or job. For example: ssh user@10.0.0.10. If the command line is unavailable or missing, the empty string '' is to be used. */
  cmd_line: z.string().optional(),
  /** A unique process identifier that can be assigned deterministically by multiple system data producers. */
  cpid: z.string().optional(),
  /** The time when the process was created/started. */
  created_time: z.number().int().optional(),
  /** The process file path. */
  path: z.string().optional(),
  /** The process identifier, as reported by the operating system. Process ID (PID) is a number used by the operating system to uniquely identify an active process. */
  pid: z.number().int().optional(),
  /** An array of Process Entities describing the extended parentage of this process object. Direct parent information should be expressed through the parent_process attribute. The first array element is the direct parent of this process object. Subsequent list elements go up the process parentage hierarchy. That is, the array is sorted from newest to oldest process. It is recommended to only populate this field for the top-level process object. */
  ancestry: z.array(ProcessEntity).optional(),
  /** Environment variables associated with the process. */
  environment_variables: z.array(EnvironmentVariable).optional(),
  /** The process file object. */
  file: File.optional(),
  /** The process integrity level, normalized to the caption of the integrity_id value. In the case of 'Other', it is defined by the event source (Windows only). */
  integrity: z.string().optional(),
  /** The normalized identifier of the process integrity level (Windows only). */
  integrity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The lineage of the process, represented by a list of paths for each ancestor process. For example: ['/usr/sbin/sshd', '/usr/bin/bash', '/usr/bin/whoami']. */
  lineage: z.array(z.string()).optional(),
  /** The list of loaded module names. */
  loaded_modules: z.array(z.string()).optional(),
  /** The parent process of this process object. It is recommended to only populate this field for the top-level process object, to prevent deep nesting. Additional ancestry information can be supplied in the ancestry attribute. */
  get parent_process() { return z.lazy(() => Process).optional(); },
  /** The identifier of the process thread associated with the event, as returned by the operating system. */
  ptid: z.number().int().optional(),
  /** The name of the containment jail (i.e., sandbox). For example, hardened_ps, high_security_ps, oracle_ps, netsvcs_ps, or default_ps. */
  sandbox: z.string().optional(),
  /** The user session under which this process is running. */
  session: Session.optional(),
  /** The time when the process was terminated. */
  terminated_time: z.number().int().optional(),
  /** The identifier of the thread associated with the event, as returned by the operating system. */
  tid: z.number().int().optional(),
  /** The user under which this process is running. */
  get user() { return z.lazy(() => User).optional(); },
  /** The working directory of a process. */
  working_directory: z.string().optional(),
  /** An unordered collection of zero or more name/value pairs that represent a process extended attribute. */
  xattributes: z.record(z.string(), z.unknown()).optional(),
});

export const Process = ProcessSchema;
