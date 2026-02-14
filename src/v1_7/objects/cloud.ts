import { z } from 'zod';

import type { AccountType } from './account.js';
import type { OrganizationType } from './organization.js';

/**
 * The Cloud object describes the cloud computing environment where an event or finding originated. It provides comprehensive context about the cloud infrastructure, including the cloud service provider, account or subscription details, organizational structure, geographic regions, availability zones, and logical partitions.
 *
 * OCSF Object: Cloud
 */
export interface CloudType {
  /** The Account object containing details about the cloud account, subscription, or billing unit where the event or finding was created. This object includes properties such as the account name, unique identifier, type, labels, and tags.Examples:AWS: Account object with name, uid (Account ID), type, and other account propertiesAzure: Subscription object with name, uid (Subscription ID), type, and subscription metadataGCP: Project object with name, uid (Project ID), type, and project attributesOracle Cloud: Compartment object with name, uid (Tenancy OCID), type, and compartment details */
  account?: AccountType;
  /** The logical grouping or isolated segment within a cloud provider's infrastructure where the event or finding was created, often used for compliance, governance, or regional separation.Examples:AWS: Partition where the event occurred (aws, aws-cn, aws-us-gov)Azure: Cloud environment where the event occurred (AzureCloud, AzureUSGovernment, AzureChinaCloud) */
  cloud_partition?: string;
  /** The Organization object containing details about the organizational unit or management structure that governs the account, subscription, or project where the event or finding was created. This object includes properties such as the organization name, unique identifier, type, and other organizational metadata.Examples:AWS: Organization object with name, uid (Organization ID), type, and other organizational propertiesAzure: Management Group object with name, uid (Management Group ID), type, and management group metadataGCP: Organization object with name, uid (Organization ID), type, and organizational attributesOracle Cloud: Tenancy object with name, uid (Tenancy OCID), type, and tenancy details */
  org?: OrganizationType;
  /** The unique identifier of a Cloud project. */
  project_uid?: string;
  /** The unique name of the Cloud services provider where the event or finding was created, such as AWS, MS Azure, GCP, etc. */
  provider: string;
  /** The cloud region where the event or finding was created, as defined by the cloud provider.Examples:AWS: Region where the event occurred (us-east-1, eu-west-1)Azure: Region where the event occurred (East US, West Europe)GCP: Region where the event occurred (us-central1, europe-west1)Oracle Cloud: Region where the event occurred (us-ashburn-1, uk-london-1) */
  region?: string;
  /** The availability zone in the cloud region where the event or finding was created, as defined by the cloud provider.Examples:AWS: Availability zone where the event occurred (us-east-1a, us-east-1b)Azure: Availability zone where the event occurred (1, 2, 3 within a region)GCP: Availability zone where the event occurred (us-central1-a, us-central1-b)Oracle Cloud: Availability zone where the event occurred (AD-1, AD-2, AD-3) */
  zone?: string;
}

import { Account } from './account.js';
import { Organization } from './organization.js';

const CloudSchema: z.ZodType<CloudType> = z.strictObject({
  /** The Account object containing details about the cloud account, subscription, or billing unit where the event or finding was created. This object includes properties such as the account name, unique identifier, type, labels, and tags.Examples:AWS: Account object with name, uid (Account ID), type, and other account propertiesAzure: Subscription object with name, uid (Subscription ID), type, and subscription metadataGCP: Project object with name, uid (Project ID), type, and project attributesOracle Cloud: Compartment object with name, uid (Tenancy OCID), type, and compartment details */
  account: Account.optional(),
  /** The logical grouping or isolated segment within a cloud provider's infrastructure where the event or finding was created, often used for compliance, governance, or regional separation.Examples:AWS: Partition where the event occurred (aws, aws-cn, aws-us-gov)Azure: Cloud environment where the event occurred (AzureCloud, AzureUSGovernment, AzureChinaCloud) */
  cloud_partition: z.string().optional(),
  /** The Organization object containing details about the organizational unit or management structure that governs the account, subscription, or project where the event or finding was created. This object includes properties such as the organization name, unique identifier, type, and other organizational metadata.Examples:AWS: Organization object with name, uid (Organization ID), type, and other organizational propertiesAzure: Management Group object with name, uid (Management Group ID), type, and management group metadataGCP: Organization object with name, uid (Organization ID), type, and organizational attributesOracle Cloud: Tenancy object with name, uid (Tenancy OCID), type, and tenancy details */
  org: Organization.optional(),
  /** The unique identifier of a Cloud project. */
  project_uid: z.string().optional(),
  /** The unique name of the Cloud services provider where the event or finding was created, such as AWS, MS Azure, GCP, etc. */
  provider: z.string(),
  /** The cloud region where the event or finding was created, as defined by the cloud provider.Examples:AWS: Region where the event occurred (us-east-1, eu-west-1)Azure: Region where the event occurred (East US, West Europe)GCP: Region where the event occurred (us-central1, europe-west1)Oracle Cloud: Region where the event occurred (us-ashburn-1, uk-london-1) */
  region: z.string().optional(),
  /** The availability zone in the cloud region where the event or finding was created, as defined by the cloud provider.Examples:AWS: Availability zone where the event occurred (us-east-1a, us-east-1b)Azure: Availability zone where the event occurred (1, 2, 3 within a region)GCP: Availability zone where the event occurred (us-central1-a, us-central1-b)Oracle Cloud: Availability zone where the event occurred (AD-1, AD-2, AD-3) */
  zone: z.string().optional(),
});

export const Cloud = CloudSchema;
