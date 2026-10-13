import { z } from 'zod';

import type { PolicyType } from './policy.js';

/**
 * An Agent (also known as a Sensor) is typically installed on an Operating System (OS) and serves as a specialized software component that can be designed to monitor, detect, collect, archive, or take action. These activities and possible actions are defined by the upstream system controlling the Agent and its intended purpose. For instance, an Agent can include Endpoint Detection & Response (EDR) agents, backup/disaster recovery sensors, Application Performance Monitoring or profiling sensors, and similar software.
 *
 * OCSF Object: Agent
 */
export interface AgentType {
  /** The name of the agent or sensor. For example: AWS SSM Agent. */
  name?: string;
  /** Describes the various policies that may be applied or enforced by an agent or sensor. E.g., Conditional Access, prevention, auto-update, tamper protection, destination configuration, etc. */
  policies?: PolicyType[];
  /** The normalized caption of the type_id value for the agent or sensor. In the case of 'Other' or 'Unknown', it is defined by the event source. */
  type?: string;
  /** The normalized representation of an agent or sensor. E.g., EDR, vulnerability management, APM, backup & recovery, etc. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;
  /** The UID of the agent or sensor, sometimes known as a Sensor ID or aid. */
  uid?: string;
  /** An alternative or contextual identifier for the agent or sensor, such as a configuration, organization, or license UID. */
  uid_alt?: string;
  /** The company or author who created the agent or sensor. For example: Crowdstrike. */
  vendor_name?: string;
  /** The semantic version of the agent or sensor, e.g., 7.101.50.0. */
  version?: string;
}

import { Policy } from './policy.js';

type AgentShape = {
  name: z.ZodOptional<z.ZodString>;
  policies: z.ZodOptional<z.ZodArray<typeof Policy>>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<99>]>>;
  uid: z.ZodOptional<z.ZodString>;
  uid_alt: z.ZodOptional<z.ZodString>;
  vendor_name: z.ZodOptional<z.ZodString>;
  version: z.ZodOptional<z.ZodString>;
};

const AgentSchema: z.ZodObject<AgentShape, z.core.$strict> = z.strictObject({
  /** The name of the agent or sensor. For example: AWS SSM Agent. */
  name: z.string().optional(),
  /** Describes the various policies that may be applied or enforced by an agent or sensor. E.g., Conditional Access, prevention, auto-update, tamper protection, destination configuration, etc. */
  policies: z.array(Policy).optional(),
  /** The normalized caption of the type_id value for the agent or sensor. In the case of 'Other' or 'Unknown', it is defined by the event source. */
  type: z.string().optional(),
  /** The normalized representation of an agent or sensor. E.g., EDR, vulnerability management, APM, backup & recovery, etc. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(99)]).optional(),
  /** The UID of the agent or sensor, sometimes known as a Sensor ID or aid. */
  uid: z.string().optional(),
  /** An alternative or contextual identifier for the agent or sensor, such as a configuration, organization, or license UID. */
  uid_alt: z.string().optional(),
  /** The company or author who created the agent or sensor. For example: Crowdstrike. */
  vendor_name: z.string().optional(),
  /** The semantic version of the agent or sensor, e.g., 7.101.50.0. */
  version: z.string().optional(),
});

export const Agent = AgentSchema;

/** Value → label mappings for each enum field of Agent. */
export const AgentLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Endpoint Detection and Response",
    2: "Data Loss Prevention",
    3: "Backup & Recovery",
    4: "Performance Monitoring & Observability",
    5: "Vulnerability Management",
    6: "Log Forwarding",
    7: "Mobile Device Management",
    8: "Configuration Management",
    9: "Remote Access",
    99: "Other",
  },
};
