import { z } from 'zod';

import { Policy } from './policy.js';

/**
 * An Agent (also known as a Sensor) is typically installed on an Operating System (OS) and serves as a specialized software component that can be designed to monitor, detect, collect, archive, or take action. These activities and possible actions are defined by the upstream system controlling the Agent and its intended purpose. For instance, an Agent can include Endpoint Detection & Response (EDR) agents, backup/disaster recovery sensors, Application Performance Monitoring or profiling sensors, and similar software.
 *
 * OCSF Object: Agent
 */
export const Agent = z.strictObject({
  /** The name of the agent or sensor. For example: AWS SSM Agent. */
  name: z.string().optional(),
  /** Describes the various policies that may be applied or enforced by an agent or sensor. E.g., Conditional Access, prevention, auto-update, tamper protection, destination configuration, etc. */
  policies: z.array(Policy).optional(),
  /** The normalized caption of the type_id value for the agent or sensor. In the case of 'Other' or 'Unknown', it is defined by the event source. */
  type: z.string().optional(),
  /** The normalized representation of an agent or sensor. E.g., EDR, vulnerability management, APM, backup & recovery, etc. */
  type_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9)]).optional(),
  /** The UID of the agent or sensor, sometimes known as a Sensor ID or aid. */
  uid: z.string().optional(),
  /** An alternative or contextual identifier for the agent or sensor, such as a configuration, organization, or license UID. */
  uid_alt: z.string().optional(),
  /** The company or author who created the agent or sensor. For example: Crowdstrike. */
  vendor_name: z.string().optional(),
  /** The semantic version of the agent or sensor, e.g., 7.101.50.0. */
  version: z.string().optional(),
});

export type AgentType = z.infer<typeof Agent>;
