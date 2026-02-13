import { z } from 'zod';

/**
 * The Organization object describes characteristics of an organization or company and its division if any. Additionally, it also describes cloud and Software-as-a-Service (SaaS) logical hierarchies such as AWS Organizations, Google Cloud Organizations, Oracle Cloud Tenancies, and similar constructs.
 *
 * OCSF Object: Organization
 */
export const Organization: any = z.object({
  /** The name of the organization, Oracle Cloud Tenancy, Google Cloud Organization, or AWS Organization. For example, Widget, Inc. or the AWS Organization name . */
  name: z.string().optional(),
  /** The unique identifier of the organization, Oracle Cloud Tenancy, Google Cloud Organization, or AWS Organization. For example, an AWS Org ID or Oracle Cloud Domain ID . */
  uid: z.string().optional(),
  /** The name of an organizational unit, Google Cloud Folder, or AWS Org Unit. For example, the GCP Project Name , or Dev_Prod_OU . */
  ou_name: z.string().optional(),
  /** The unique identifier of an organizational unit, Google Cloud Folder, or AWS Org Unit. For example, an Oracle Cloud Tenancy ID , AWS OU ID , or GCP Folder ID . */
  ou_uid: z.string().optional(),
}).passthrough();

export type OrganizationType = z.infer<typeof Organization>;
