import { z } from 'zod';

import { KeyValueObject } from './key_value_object.js';

/**
 * The Account object contains details about the account that initiated or performed a specific activity within a system or application. Additionally, the Account object refers to logical Cloud and Software-as-a-Service (SaaS) based containers such as AWS Accounts, Azure Subscriptions, Oracle Cloud Compartments, Google Cloud Projects, and otherwise.
 *
 * OCSF Object: Account
 */
export const Account = z.strictObject({
  /** The name of the account (e.g. GCP Project name , Linux Account name or AWS Account name). */
  name: z.string().optional(),
  /** The unique identifier of the account (e.g. AWS Account ID , OCID , GCP Project ID , Azure Subscription ID , Google Workspace Customer ID , or M365 Tenant UID). */
  uid: z.string().optional(),
  /** The list of labels associated to the account. */
  labels: z.array(z.string()).optional(),
  /** The list of tags; {key:value} pairs associated to the account. */
  tags: z.array(KeyValueObject).optional(),
  /** The account type, normalized to the caption of 'account_type_id'. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The normalized account type identifier. */
  type_id: z.number().int().optional(),
});

export type AccountType = z.infer<typeof Account>;
