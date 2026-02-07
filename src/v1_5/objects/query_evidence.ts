import { z } from "zod";

import { File, type FileType } from "./file.js";
import { Group, type GroupType } from "./group.js";
import { Job, type JobType } from "./job.js";
import { Kernel, type KernelType } from "./kernel.js";
import { Module, type ModuleType } from "./module.js";
import {
  NetworkConnectionInfo,
  type NetworkConnectionInfoType,
} from "./network_connection_info.js";
import { NetworkInterface, type NetworkInterfaceType } from "./network_interface.js";
import { PeripheralDevice, type PeripheralDeviceType } from "./peripheral_device.js";
import { Process, type ProcessType } from "./process.js";
import { Service, type ServiceType } from "./service.js";
import { Session, type SessionType } from "./session.js";
import { StartupItem, type StartupItemType } from "./startup_item.js";
import { User, type UserType } from "./user.js";

/**
 * The specific resulting evidence information that was queried or discovered. When mapping raw telemetry data users should select the appropriate child object that best matches the evidence type as defined by query_type_id.
 *
 * OCSF Object: Query Evidence
 */
export interface QueryEvidenceType {
  /** The network connection information related to a Network Connection query type. */
  connection_info?: NetworkConnectionInfoType | undefined;
  /** The file that is the target of the query when query_type_id indicates a File query. */
  file?: FileType | undefined;
  /** The folder that is the target of the query when query_type_id indicates a Folder query. */
  folder?: FileType | undefined;
  /** The administrative group that is the target of the query when query_type_id indicates an Admin Group query. */
  group?: GroupType | undefined;
  /** The job object that pertains to the event when query_type_id indicates a Job query. */
  job?: JobType | undefined;
  /** The kernel object that pertains to the event when query_type_id indicates a Kernel query. */
  kernel?: KernelType | undefined;
  /** The module that pertains to the event when query_type_id indicates a Module query. */
  module?: ModuleType | undefined;
  /** The physical or virtual network interfaces that are associated with the device when query_type_id indicates a Network Interfaces query. */
  network_interfaces?: NetworkInterfaceType[] | undefined;
  /** The peripheral device that triggered the event when query_type_id indicates a Peripheral Device query. */
  peripheral_device?: PeripheralDeviceType | undefined;
  /** The process that pertains to the event when query_type_id indicates a Process query. */
  process?: ProcessType | undefined;
  /** The service that pertains to the event when query_type_id indicates a Service query. */
  service?: ServiceType | undefined;
  /** The authenticated user or service session when query_type_id indicates a Session query. */
  session?: SessionType | undefined;
  /** The startup item object that pertains to the event when query_type_id indicates a Startup Item query. */
  startup_item?: StartupItemType | undefined;
  /** The state of the socket, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the event source. */
  state?: string | undefined;
  /** The state of the TCP socket for the network connection. */
  tcp_state_id?: number | undefined;
  /** The user that pertains to the event when query_type_id indicates a User query. */
  user?: UserType | undefined;
  /** The users that belong to the administrative group when query_type_id indicates a Users query. */
  users?: UserType[] | undefined;
  /** The normalized type of system query performed against a device or system component. */
  query_type_id: number;
  /** The normalized caption of query_type_id or the source-specific query type. */
  query_type?: string | undefined;
  [key: string]: unknown;
}

export const QueryEvidence: z.ZodType<QueryEvidenceType> = z
  .object({
    /** The network connection information related to a Network Connection query type. */
    connection_info: NetworkConnectionInfo.optional(),
    /** The file that is the target of the query when query_type_id indicates a File query. */
    file: File.optional(),
    /** The folder that is the target of the query when query_type_id indicates a Folder query. */
    folder: File.optional(),
    /** The administrative group that is the target of the query when query_type_id indicates an Admin Group query. */
    group: Group.optional(),
    /** The job object that pertains to the event when query_type_id indicates a Job query. */
    job: Job.optional(),
    /** The kernel object that pertains to the event when query_type_id indicates a Kernel query. */
    kernel: Kernel.optional(),
    /** The module that pertains to the event when query_type_id indicates a Module query. */
    module: Module.optional(),
    /** The physical or virtual network interfaces that are associated with the device when query_type_id indicates a Network Interfaces query. */
    network_interfaces: z.array(NetworkInterface).optional(),
    /** The peripheral device that triggered the event when query_type_id indicates a Peripheral Device query. */
    peripheral_device: PeripheralDevice.optional(),
    /** The process that pertains to the event when query_type_id indicates a Process query. */
    process: z.lazy(() => Process).optional(),
    /** The service that pertains to the event when query_type_id indicates a Service query. */
    service: Service.optional(),
    /** The authenticated user or service session when query_type_id indicates a Session query. */
    session: Session.optional(),
    /** The startup item object that pertains to the event when query_type_id indicates a Startup Item query. */
    startup_item: StartupItem.optional(),
    /** The state of the socket, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the event source. */
    state: z.string().optional(),
    /** The state of the TCP socket for the network connection. */
    tcp_state_id: z.number().int().optional(),
    /** The user that pertains to the event when query_type_id indicates a User query. */
    user: z.lazy(() => User).optional(),
    /** The users that belong to the administrative group when query_type_id indicates a Users query. */
    users: z.array(z.lazy(() => User)).optional(),
    /** The normalized type of system query performed against a device or system component. */
    query_type_id: z.number().int(),
    /** The normalized caption of query_type_id or the source-specific query type. */
    query_type: z.string().optional(),
  })
  .passthrough() as any;
