import { z } from 'zod';

import type { KeyValueObjectType } from './key_value_object.js';

/**
 * The Account object contains details about the account that initiated or performed a specific activity within a system or application. Additionally, the Account object refers to logical Cloud and Software-as-a-Service (SaaS) based containers such as AWS Accounts, Azure Subscriptions, Oracle Cloud Compartments, Google Cloud Projects, and otherwise.
 *
 * OCSF Object: Account
 */
export interface AccountType {
  /** The name of the account (e.g. GCP Project name , Linux Account name or AWS Account name). */
  name?: string;
  /** The unique identifier of the account (e.g. AWS Account ID , OCID , GCP Project ID , Azure Subscription ID , Google Workspace Customer ID , or M365 Tenant UID). */
  uid?: string;
  /** The list of labels associated to the account. */
  labels?: string[];
  /** The list of tags; {key:value} pairs associated to the account. */
  tags?: KeyValueObjectType[];
  /** The account type, normalized to the caption of 'account_type_id'. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The normalized account type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 99;
}

import { KeyValueObject } from './key_value_object.js';

const AccountSchema: z.ZodType<AccountType> = z.strictObject({
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
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(99)]).optional(),
});

export const Account = AccountSchema;
