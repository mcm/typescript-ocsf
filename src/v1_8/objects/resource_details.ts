import { z } from 'zod';

import type { KeyValueObjectType } from './key_value_object.js';
import type { AgentType } from './agent.js';
import type { GroupType } from './group.js';
import type { UserType } from './user.js';
import type { GraphType } from './graph.js';

/**
 * The Resource Details object describes details about resources that were affected by the activity/event.
 *
 * OCSF Object: Resource Details
 */
export interface ResourceDetailsType {
  /** The name of the entity. See specific usage. */
  name?: string;
  /** The unique identifier of the resource. */
  uid?: string;
  /** The time when the resource was created. */
  created_time?: number;
  /** Additional data describing the resource. */
  data?: Record<string, unknown>;
  /** The list of labels associated to the resource. */
  labels?: string[];
  /** The time when the resource was last modified. */
  modified_time?: number;
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags?: KeyValueObjectType[];
  /** The resource type as defined by the event source. */
  type?: string;
  /** The alternative unique identifier of the resource. */
  uid_alt?: string;
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list?: AgentType[];
  /** The logical grouping or isolated segment within a cloud provider's infrastructure where the resource is located. Examples include AWS partitions (aws, aws-cn, aws-us-gov), Azure cloud environments (AzureCloud, AzureUSGovernment, AzureChinaCloud), or similar logical divisions in other cloud providers. */
  cloud_partition?: string;
  /** The criticality of the resource as defined by the event source. */
  criticality?: string;
  /** The name of the related resource group. */
  group?: GroupType;
  /** The fully qualified name of the resource. */
  hostname?: string;
  /** The IP address of the resource, in either IPv4 or IPv6 format. */
  ip?: string;
  /** Indicates whether the device or resource has a backup enabled, such as an automated snapshot or a cloud backup. For example, this is indicated by the cloudBackupEnabled value within JAMF Pro mobile devices or the registration of an AWS ARN with the AWS Backup service. */
  is_backed_up?: boolean;
  /** The namespace is useful when similar entities exist that you need to keep separate. */
  namespace?: string;
  /** The details of the entity that owns the resource. This object includes properties such as the owner's name, unique identifier, type, domain, and other relevant attributes that help identify the resource owner within the environment. */
  owner?: UserType;
  /** The cloud service provider that hosts or manages the resource. This field is typically used when the resource is managed by a different provider than the one generating the event or finding. Examples include AWS, Azure, GCP (Google Cloud Platform), Oracle Cloud, IBM Cloud, Alibaba Cloud, or other public, private, or hybrid cloud providers. */
  provider?: string;
  /** The cloud region where the resource is hosted, as defined by the cloud provider. This represents the physical or logical geographic area containing the infrastructure supporting the resource. Examples include AWS regions (us-east-1, eu-west-1), Azure regions (East US, West Europe), GCP regions (us-central1, europe-west1), or Oracle Cloud regions (us-ashburn-1, uk-london-1). */
  region?: string;
  /** A graph representation showing how this resource relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
  resource_relationship?: GraphType;
  /** The role of the resource in the context of the event or finding, normalized to the caption of the role_id value. In the case of 'Other', it is defined by the event source. */
  role?: string;
  /** The normalized identifier of the resource's role in the context of the event or finding. */
  role_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The version of the resource. For example 1.2.3. */
  version?: string;
  /** The availability zone within a cloud region where the resource is located. Examples include AWS availability zones (us-east-1a, us-east-1b), Azure availability zones (1, 2, 3 within a region), GCP zones (us-central1-a, us-central1-b), or Oracle Cloud availability domains (AD-1, AD-2, AD-3). */
  zone?: string;
}

import { KeyValueObject } from './key_value_object.js';
import { Agent } from './agent.js';
import { Group } from './group.js';
import { User } from './user.js';
import { Graph } from './graph.js';

type ResourceDetailsShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  created_time: z.ZodOptional<z.ZodNumber>;
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  labels: z.ZodOptional<z.ZodArray<z.ZodString>>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  tags: z.ZodOptional<z.ZodArray<typeof KeyValueObject>>;
  type: z.ZodOptional<z.ZodString>;
  uid_alt: z.ZodOptional<z.ZodString>;
  agent_list: z.ZodOptional<z.ZodArray<typeof Agent>>;
  cloud_partition: z.ZodOptional<z.ZodString>;
  criticality: z.ZodOptional<z.ZodString>;
  group: z.ZodOptional<typeof Group>;
  hostname: z.ZodOptional<z.ZodString>;
  ip: z.ZodOptional<z.ZodString>;
  is_backed_up: z.ZodOptional<z.ZodBoolean>;
  namespace: z.ZodOptional<z.ZodString>;
  owner: z.ZodOptional<typeof User>;
  provider: z.ZodOptional<z.ZodString>;
  region: z.ZodOptional<z.ZodString>;
  resource_relationship: z.ZodOptional<typeof Graph>;
  role: z.ZodOptional<z.ZodString>;
  role_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  version: z.ZodOptional<z.ZodString>;
  zone: z.ZodOptional<z.ZodString>;
};

const ResourceDetailsSchema: z.ZodObject<ResourceDetailsShape, z.core.$strict> = z.strictObject({
  /** The name of the entity. See specific usage. */
  name: z.string().optional(),
  /** The unique identifier of the resource. */
  uid: z.string().optional(),
  /** The time when the resource was created. */
  created_time: z.number().int().optional(),
  /** Additional data describing the resource. */
  data: z.record(z.string(), z.unknown()).optional(),
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
  /** The logical grouping or isolated segment within a cloud provider's infrastructure where the resource is located. Examples include AWS partitions (aws, aws-cn, aws-us-gov), Azure cloud environments (AzureCloud, AzureUSGovernment, AzureChinaCloud), or similar logical divisions in other cloud providers. */
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
  /** The details of the entity that owns the resource. This object includes properties such as the owner's name, unique identifier, type, domain, and other relevant attributes that help identify the resource owner within the environment. */
  owner: User.optional(),
  /** The cloud service provider that hosts or manages the resource. This field is typically used when the resource is managed by a different provider than the one generating the event or finding. Examples include AWS, Azure, GCP (Google Cloud Platform), Oracle Cloud, IBM Cloud, Alibaba Cloud, or other public, private, or hybrid cloud providers. */
  provider: z.string().optional(),
  /** The cloud region where the resource is hosted, as defined by the cloud provider. This represents the physical or logical geographic area containing the infrastructure supporting the resource. Examples include AWS regions (us-east-1, eu-west-1), Azure regions (East US, West Europe), GCP regions (us-central1, europe-west1), or Oracle Cloud regions (us-ashburn-1, uk-london-1). */
  region: z.string().optional(),
  /** A graph representation showing how this resource relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
  resource_relationship: Graph.optional(),
  /** The role of the resource in the context of the event or finding, normalized to the caption of the role_id value. In the case of 'Other', it is defined by the event source. */
  role: z.string().optional(),
  /** The normalized identifier of the resource's role in the context of the event or finding. */
  role_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The version of the resource. For example 1.2.3. */
  version: z.string().optional(),
  /** The availability zone within a cloud region where the resource is located. Examples include AWS availability zones (us-east-1a, us-east-1b), Azure availability zones (1, 2, 3 within a region), GCP zones (us-central1-a, us-central1-b), or Oracle Cloud availability domains (AD-1, AD-2, AD-3). */
  zone: z.string().optional(),
});

export const ResourceDetails = ResourceDetailsSchema;

/** Value → label mappings for each enum field of ResourceDetails. */
export const ResourceDetailsLabels: Readonly<Record<"role_id", Readonly<Record<number, string>>>> = {
  role_id: {
    0: "Unknown",
    1: "Target",
    2: "Actor",
    3: "Affected",
    4: "Related",
    99: "Other",
  },
};
