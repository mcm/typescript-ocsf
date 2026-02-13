import { z } from 'zod';

import { NetworkConnectionInfo } from './network_connection_info.js';
import { File } from './file.js';
import { Group } from './group.js';
import { Job } from './job.js';
import { Kernel } from './kernel.js';
import { Module } from './module.js';
import { NetworkInterface } from './network_interface.js';
import { PeripheralDevice } from './peripheral_device.js';
import { Process } from './process.js';
import { Service } from './service.js';
import { Session } from './session.js';
import { StartupItem } from './startup_item.js';
import { User } from './user.js';

/**
 * The specific resulting evidence information that was queried or discovered. When mapping raw telemetry data users should select the appropriate child object that best matches the evidence type as defined by query_type_id.
 *
 * OCSF Object: Query Evidence
 */
export const QueryEvidence = z.strictObject({
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
  process: Process.optional(),
  /** The normalized caption of query_type_id or the source-specific query type. */
  query_type: z.string().optional(),
  /** The normalized type of system query performed against a device or system component. */
  query_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(99)]),
  /** The service that pertains to the event when query_type_id indicates a Service query. */
  service: Service.optional(),
  /** The authenticated user or service session when query_type_id indicates a Session query. */
  session: Session.optional(),
  /** The startup item object that pertains to the event when query_type_id indicates a Startup Item query. */
  startup_item: StartupItem.optional(),
  /** The state of the socket, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the event source. */
  state: z.string().optional(),
  /** The state of the TCP socket for the network connection. */
  tcp_state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11)]).optional(),
  /** The user that pertains to the event when query_type_id indicates a User query. */
  user: User.optional(),
  /** The users that belong to the administrative group when query_type_id indicates a Users query. */
  users: z.array(User).optional(),
});

export type QueryEvidenceType = z.infer<typeof QueryEvidence>;
