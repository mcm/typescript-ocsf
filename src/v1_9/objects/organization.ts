import { z } from 'zod';

/**
 * The Organization object describes characteristics of an organization or company and its division if any. Additionally, it also describes cloud and Software-as-a-Service (SaaS) logical hierarchies such as AWS Organizations, Google Cloud Organizations, Oracle Cloud Tenancies, and similar constructs.
 *
 * OCSF Object: Organization
 */
export interface OrganizationType {
  /** The name of the organization, Oracle Cloud Tenancy, Google Cloud Organization, or AWS Organization. For example, Widget, Inc. or the AWS Organization name . */
  name?: string;
  /** The unique identifier of the organization, Oracle Cloud Tenancy, Google Cloud Organization, or AWS Organization. For example, an AWS Org ID or Oracle Cloud Domain ID . */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The name of an organizational unit, Google Cloud Folder, or AWS Org Unit. For example, the GCP Project Name , or Dev_Prod_OU . */
  ou_name?: string;
  /** The unique identifier of an organizational unit, Google Cloud Folder, or AWS Org Unit. For example, an Oracle Cloud Tenancy ID , AWS OU ID , or GCP Folder ID . */
  ou_uid?: string;
}

type OrganizationShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  ou_name: z.ZodOptional<z.ZodString>;
  ou_uid: z.ZodOptional<z.ZodString>;
};

const OrganizationSchema: z.ZodObject<OrganizationShape, z.core.$strict> = z.strictObject({
  /** The name of the organization, Oracle Cloud Tenancy, Google Cloud Organization, or AWS Organization. For example, Widget, Inc. or the AWS Organization name . */
  name: z.string().optional(),
  /** The unique identifier of the organization, Oracle Cloud Tenancy, Google Cloud Organization, or AWS Organization. For example, an AWS Org ID or Oracle Cloud Domain ID . */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The name of an organizational unit, Google Cloud Folder, or AWS Org Unit. For example, the GCP Project Name , or Dev_Prod_OU . */
  ou_name: z.string().optional(),
  /** The unique identifier of an organizational unit, Google Cloud Folder, or AWS Org Unit. For example, an Oracle Cloud Tenancy ID , AWS OU ID , or GCP Folder ID . */
  ou_uid: z.string().optional(),
});

export const Organization = OrganizationSchema;

/** Value → label mappings for each enum field of Organization. */
export const OrganizationLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
