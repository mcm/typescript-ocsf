import { z } from "zod";

/**
 * The Process Entity object provides critical fields for referencing a process.
 *
 * OCSF Object: Process Entity
 */
export interface ProcessEntityType {
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
  [key: string]: unknown;
}

export const ProcessEntity: z.ZodType<ProcessEntityType> = z
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
  })
  .passthrough() as any;
