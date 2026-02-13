import { z } from 'zod';

import { KeyValueObject } from './key_value_object.js';
import { Agent } from './agent.js';
import { Group } from './group.js';
import { User } from './user.js';
import { Graph } from './graph.js';

/**
 * The Resource Details object describes details about resources that were affected by the activity/event.
 *
 * OCSF Object: Resource Details
 */
export const ResourceDetails: any = z.object({
  /** The name of the entity. See specific usage. */
  name: z.string().optional(),
  /** The unique identifier of the resource. */
  uid: z.string().optional(),
  /** The time when the resource was created. */
  created_time: z.number().int().optional(),
  /** Additional data describing the resource. */
  data: z.record(z.unknown()).optional(),
  /** The list of labels associated to the resource. */
  labels: z.array(z.string()).optional(),
  /** The time when the resource was last modified. */
  modified_time: z.number().int().optional(),
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags: z.array(KeyValueObject).optional(),
  /** The resource type as defined by the event source. */
  type: z.string().optional(),
  /** The alternative unique identifier of the resource. */
  uid_alt: z.string().optional(),
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list: z.array(Agent).optional(),
  /** The canonical cloud partition name to which the region is assigned (e.g. AWS Partitions: aws, aws-cn, aws-us-gov). */
  cloud_partition: z.string().optional(),
  /** The criticality of the resource as defined by the event source. */
  criticality: z.string().optional(),
  /** The name of the related resource group. */
  group: Group.optional(),
  /** The fully qualified name of the resource. */
  hostname: z.string().optional(),
  /** The IP address of the resource, in either IPv4 or IPv6 format. */
  ip: z.string().optional(),
  /** Indicates whether the device or resource has a backup enabled, such as an automated snapshot or a cloud backup. For example, this is indicated by the cloudBackupEnabled value within JAMF Pro mobile devices or the registration of an AWS ARN with the AWS Backup service. */
  is_backed_up: z.boolean().optional(),
  /** The namespace is useful when similar entities exist that you need to keep separate. */
  namespace: z.string().optional(),
  /** The identity of the service or user account that owns the resource. */
  owner: User.optional(),
  /** The cloud region of the resource. */
  region: z.string().optional(),
  /** A graph representation showing how this resource relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
  resource_relationship: Graph.optional(),
  /** The version of the resource. For example 1.2.3. */
  version: z.string().optional(),
  /** The specific availability zone within a cloud region where the resource is located. */
  zone: z.string().optional(),
}).passthrough();

export type ResourceDetailsType = z.infer<typeof ResourceDetails>;
