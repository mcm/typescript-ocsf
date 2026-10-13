import { z } from 'zod';

import type { AccountType } from './account.js';
import type { OrganizationType } from './organization.js';

/**
 * The Cloud object contains information about a cloud or Software-as-a-Service account or similar construct, such as AWS Account ID, regions, organizations, folders, compartments, tenants, etc.
 *
 * OCSF Object: Cloud
 */
export interface CloudType {
  /** The account object describes details about the account that was the source or target of the activity. */
  account?: AccountType;
  /** The canonical cloud partition name to which the region is assigned (e.g. AWS Partitions: aws, aws-cn, aws-us-gov). */
  cloud_partition?: string;
  /** Organization and org unit relevant to the event or object. */
  org?: OrganizationType;
  /** The unique identifier of a Cloud project. */
  project_uid?: string;
  /** The unique name of the Cloud services provider, such as AWS, MS Azure, GCP, etc. */
  provider: string;
  /** The name of the cloud region, as defined by the cloud provider. */
  region?: string;
  /** The availability zone in the cloud region, as defined by the cloud provider. */
  zone?: string;
}

import { Account } from './account.js';
import { Organization } from './organization.js';

type CloudShape = {
  account: z.ZodOptional<typeof Account>;
  cloud_partition: z.ZodOptional<z.ZodString>;
  org: z.ZodOptional<typeof Organization>;
  project_uid: z.ZodOptional<z.ZodString>;
  provider: z.ZodString;
  region: z.ZodOptional<z.ZodString>;
  zone: z.ZodOptional<z.ZodString>;
};

const CloudSchema: z.ZodObject<CloudShape, z.core.$strict> = z.strictObject({
  /** The account object describes details about the account that was the source or target of the activity. */
  account: Account.optional(),
  /** The canonical cloud partition name to which the region is assigned (e.g. AWS Partitions: aws, aws-cn, aws-us-gov). */
  cloud_partition: z.string().optional(),
  /** Organization and org unit relevant to the event or object. */
  org: Organization.optional(),
  /** The unique identifier of a Cloud project. */
  project_uid: z.string().optional(),
  /** The unique name of the Cloud services provider, such as AWS, MS Azure, GCP, etc. */
  provider: z.string(),
  /** The name of the cloud region, as defined by the cloud provider. */
  region: z.string().optional(),
  /** The availability zone in the cloud region, as defined by the cloud provider. */
  zone: z.string().optional(),
});

export const Cloud = CloudSchema;

/** Value → label mappings for each enum field of Cloud. */
export const CloudLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
