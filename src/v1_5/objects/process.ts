import { z } from "zod";

import { EnvironmentVariable, type EnvironmentVariableType } from "./environment_variable.js";
import { File, type FileType } from "./file.js";
import { OcsfObject, type OcsfObjectType } from "./object.js";
import { ProcessEntity, type ProcessEntityType } from "./process_entity.js";
import { Session, type SessionType } from "./session.js";
import { User, type UserType } from "./user.js";

/**
 * The Process object describes a running instance of a launched program.
 *
 * OCSF Object: Process
 */
export interface ProcessType {
  /** The friendly name of the process, for example: Notepad++. */
  name?: string | undefined;
  /** A unique identifier for this process assigned by the producer (tool). Facilitates correlation of a process event with other events for that process. */
  uid?: string | undefined;
  /** The full command line used to launch an application, service, process, or job. For example: ssh user@10.0.0.10. If the command line is unavailable or missing, the empty string '' is to be used. */
  cmd_line?: string | undefined;
  /** A unique process identifier that can be assigned deterministically by multiple system data producers. */
  cpid?: string | undefined;
  /** The time when the process was created/started. */
  created_time?: number | undefined;
  /** The process file path. */
  path?: string | undefined;
  /** The process identifier, as reported by the operating system. Process ID (PID) is a number used by the operating system to uniquely identify an active process. */
  pid?: number | undefined;
  /** An array of Process Entities describing the extended parentage of this process object. Direct parent information sould be expressed through the parent_process attribute. The first array element is the direct parent of this process object. Subsequent list elements go up the process parentage hierarchy. That is, the array is sorted from newest to oldest process. It is recommended to only populate this field for the top-level process object. */
  ancestry?: ProcessEntityType[] | undefined;
  /** Environment variables associated with the process. */
  environment_variables?: EnvironmentVariableType[] | undefined;
  /** The process file object. */
  file?: FileType | undefined;
  /** The process integrity level, normalized to the caption of the integrity_id value. In the case of 'Other', it is defined by the event source (Windows only). */
  integrity?: string | undefined;
  /** The normalized identifier of the process integrity level (Windows only). */
  integrity_id?: number | undefined;
  /** The lineage of the process, represented by a list of paths for each ancestor process. For example: ['/usr/sbin/sshd', '/usr/bin/bash', '/usr/bin/whoami']. */
  lineage?: string[] | undefined;
  /** The list of loaded module names. */
  loaded_modules?: string[] | undefined;
  /** The parent process of this process object. It is recommended to only populate this field for the top-level process object, to prevent deep nesting. Additional ancestry information can be supplied in the ancestry attribute. */
  parent_process?: ProcessType | undefined;
  /** The name of the containment jail (i.e., sandbox). For example, hardened_ps, high_security_ps, oracle_ps, netsvcs_ps, or default_ps. */
  sandbox?: string | undefined;
  /** The user session under which this process is running. */
  session?: SessionType | undefined;
  /** The time when the process was terminated. */
  terminated_time?: number | undefined;
  /** The Identifier of the thread associated with the event, as returned by the operating system. */
  tid?: number | undefined;
  /** The user under which this process is running. */
  user?: UserType | undefined;
  /** The working directory of a process. */
  working_directory?: string | undefined;
  /** An unordered collection of zero or more name/value pairs that represent a process extended attribute. */
  xattributes?: OcsfObjectType | undefined;
  [key: string]: unknown;
}

export const Process: z.ZodType<ProcessType> = z.lazy(() =>
  z
    .object({
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
      /** An array of Process Entities describing the extended parentage of this process object. Direct parent information sould be expressed through the parent_process attribute. The first array element is the direct parent of this process object. Subsequent list elements go up the process parentage hierarchy. That is, the array is sorted from newest to oldest process. It is recommended to only populate this field for the top-level process object. */
      ancestry: z.array(z.lazy(() => ProcessEntity)).optional(),
      /** Environment variables associated with the process. */
      environment_variables: z.array(z.lazy(() => EnvironmentVariable)).optional(),
      /** The process file object. */
      file: z.lazy(() => File).optional(),
      /** The process integrity level, normalized to the caption of the integrity_id value. In the case of 'Other', it is defined by the event source (Windows only). */
      integrity: z.string().optional(),
      /** The normalized identifier of the process integrity level (Windows only). */
      integrity_id: z.number().int().optional(),
      /** The lineage of the process, represented by a list of paths for each ancestor process. For example: ['/usr/sbin/sshd', '/usr/bin/bash', '/usr/bin/whoami']. */
      lineage: z.array(z.string()).optional(),
      /** The list of loaded module names. */
      loaded_modules: z.array(z.string()).optional(),
      /** The parent process of this process object. It is recommended to only populate this field for the top-level process object, to prevent deep nesting. Additional ancestry information can be supplied in the ancestry attribute. */
      parent_process: z.lazy(() => Process).optional(),
      /** The name of the containment jail (i.e., sandbox). For example, hardened_ps, high_security_ps, oracle_ps, netsvcs_ps, or default_ps. */
      sandbox: z.string().optional(),
      /** The user session under which this process is running. */
      session: z.lazy(() => Session).optional(),
      /** The time when the process was terminated. */
      terminated_time: z.number().int().optional(),
      /** The Identifier of the thread associated with the event, as returned by the operating system. */
      tid: z.number().int().optional(),
      /** The user under which this process is running. */
      user: z.lazy(() => User).optional(),
      /** The working directory of a process. */
      working_directory: z.string().optional(),
      /** An unordered collection of zero or more name/value pairs that represent a process extended attribute. */
      xattributes: z.lazy(() => OcsfObject).optional(),
    })
    .passthrough(),
) as any;
