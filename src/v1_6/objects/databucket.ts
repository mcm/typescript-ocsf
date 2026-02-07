import { z } from "zod";

import { Agent, type AgentType } from "./agent.js";
import { EncryptionDetails, type EncryptionDetailsType } from "./encryption_details.js";
import { File, type FileType } from "./file.js";
import { Graph, type GraphType } from "./graph.js";
import { Group, type GroupType } from "./group.js";
import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";
import { User, type UserType } from "./user.js";

/**
 * The databucket object is a basic container that holds data, typically organized through the use of data partitions.
 *
 * OCSF Object: Databucket
 */
export interface DatabucketType {
  /** The databucket name. */
  name?: string | undefined;
  /** The unique identifier of the databucket. */
  uid?: string | undefined;
  /** The time when the databucket was known to have been created. */
  created_time?: number | undefined;
  /** Additional data describing the resource. */
  data?: Record<string, unknown> | undefined;
  /** The list of labels associated to the resource. */
  labels?: string[] | undefined;
  /** The most recent time when any changes, updates, or modifications were made within the databucket. */
  modified_time?: number | undefined;
  /** The list of tags; {key:value} pairs associated to the resource. */
  tags?: KeyValueObjectType[] | undefined;
  /** The databucket type. */
  type?: string | undefined;
  /** The alternative unique identifier of the resource. */
  uid_alt?: string | undefined;
  /** A list of agent objects associated with a device, endpoint, or resource. */
  agent_list?: AgentType[] | undefined;
  /** The canonical cloud partition name to which the region is assigned (e.g. AWS Partitions: aws, aws-cn, aws-us-gov). */
  cloud_partition?: string | undefined;
  /** The criticality of the databucket as defined by the event source. */
  criticality?: string | undefined;
  /** The description of the databucket. */
  desc?: string | undefined;
  /** The encryption details of the databucket. Should be populated if the databucket is encrypted. */
  encryption_details?: EncryptionDetailsType | undefined;
  /** Details about the file/object within a databucket. */
  file?: FileType | undefined;
  /** The name of the related resource group. */
  group?: GroupType | undefined;
  /** The group names to which the databucket belongs. */
  groups?: GroupType[] | undefined;
  /** The fully qualified hostname of the databucket. */
  hostname?: string | undefined;
  /** The IP address of the resource, in either IPv4 or IPv6 format. */
  ip?: string | undefined;
  /** Indicates whether the device or resource has a backup enabled, such as an automated snapshot or a cloud backup. For example, this is indicated by the cloudBackupEnabled value within JAMF Pro mobile devices or the registration of an AWS ARN with the AWS Backup service. */
  is_backed_up?: boolean | undefined;
  /** Indicates if the databucket is encrypted. */
  is_encrypted?: boolean | undefined;
  /** Indicates if the databucket is publicly accessible. */
  is_public?: boolean | undefined;
  /** The namespace is useful when similar entities exist that you need to keep separate. */
  namespace?: string | undefined;
  /** The identity of the service or user account that owns the databucket. */
  owner?: UserType | undefined;
  /** The cloud region of the databucket. */
  region?: string | undefined;
  /** A graph representation showing how this databucket relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
  resource_relationship?: GraphType | undefined;
  /** The size of the databucket in bytes. */
  size?: number | undefined;
  /** The normalized identifier of the databucket type. */
  type_id: number;
  /** The version of the resource. For example 1.2.3. */
  version?: string | undefined;
  /** The specific availability zone within a cloud region where the databucket is located. */
  zone?: string | undefined;
  [key: string]: unknown;
}

export const Databucket: z.ZodType<DatabucketType> = z
  .object({
    /** The databucket name. */
    name: z.string().optional(),
    /** The unique identifier of the databucket. */
    uid: z.string().optional(),
    /** The time when the databucket was known to have been created. */
    created_time: z.number().int().optional(),
    /** Additional data describing the resource. */
    data: z.record(z.unknown()).optional(),
    /** The list of labels associated to the resource. */
    labels: z.array(z.string()).optional(),
    /** The most recent time when any changes, updates, or modifications were made within the databucket. */
    modified_time: z.number().int().optional(),
    /** The list of tags; {key:value} pairs associated to the resource. */
    tags: z.array(KeyValueObject).optional(),
    /** The databucket type. */
    type: z.string().optional(),
    /** The alternative unique identifier of the resource. */
    uid_alt: z.string().optional(),
    /** A list of agent objects associated with a device, endpoint, or resource. */
    agent_list: z.array(Agent).optional(),
    /** The canonical cloud partition name to which the region is assigned (e.g. AWS Partitions: aws, aws-cn, aws-us-gov). */
    cloud_partition: z.string().optional(),
    /** The criticality of the databucket as defined by the event source. */
    criticality: z.string().optional(),
    /** The description of the databucket. */
    desc: z.string().optional(),
    /** The encryption details of the databucket. Should be populated if the databucket is encrypted. */
    encryption_details: EncryptionDetails.optional(),
    /** Details about the file/object within a databucket. */
    file: File.optional(),
    /** The name of the related resource group. */
    group: Group.optional(),
    /** The group names to which the databucket belongs. */
    groups: z.array(Group).optional(),
    /** The fully qualified hostname of the databucket. */
    hostname: z.string().optional(),
    /** The IP address of the resource, in either IPv4 or IPv6 format. */
    ip: z.string().optional(),
    /** Indicates whether the device or resource has a backup enabled, such as an automated snapshot or a cloud backup. For example, this is indicated by the cloudBackupEnabled value within JAMF Pro mobile devices or the registration of an AWS ARN with the AWS Backup service. */
    is_backed_up: z.boolean().optional(),
    /** Indicates if the databucket is encrypted. */
    is_encrypted: z.boolean().optional(),
    /** Indicates if the databucket is publicly accessible. */
    is_public: z.boolean().optional(),
    /** The namespace is useful when similar entities exist that you need to keep separate. */
    namespace: z.string().optional(),
    /** The identity of the service or user account that owns the databucket. */
    owner: z.lazy(() => User).optional(),
    /** The cloud region of the databucket. */
    region: z.string().optional(),
    /** A graph representation showing how this databucket relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
    resource_relationship: Graph.optional(),
    /** The size of the databucket in bytes. */
    size: z.number().int().optional(),
    /** The normalized identifier of the databucket type. */
    type_id: z.number().int(),
    /** The version of the resource. For example 1.2.3. */
    version: z.string().optional(),
    /** The specific availability zone within a cloud region where the databucket is located. */
    zone: z.string().optional(),
  })
  .passthrough() as any;
