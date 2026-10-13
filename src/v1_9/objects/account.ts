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
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** Indicates if the account is disabled. */
  is_disabled?: boolean;
  /** Indicates if the account is locked. For example, due to the amount of failed logins. */
  is_locked?: boolean;
  /** Indicates whether synchronization with an on-premises directory service is enabled. For example, Microsoft Entra Connect. */
  is_on_premises_sync_enabled?: boolean;
  /** The list of labels associated to the account. */
  labels?: string[];
  /** The list of tags; {key:value} pairs associated to the account. */
  tags?: KeyValueObjectType[];
  /** The account type, normalized to the caption of 'account_type_id'. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The normalized account type identifier. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 99;
}

import { KeyValueObject } from './key_value_object.js';

type AccountShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  is_disabled: z.ZodOptional<z.ZodBoolean>;
  is_locked: z.ZodOptional<z.ZodBoolean>;
  is_on_premises_sync_enabled: z.ZodOptional<z.ZodBoolean>;
  labels: z.ZodOptional<z.ZodArray<z.ZodString>>;
  tags: z.ZodOptional<z.ZodArray<typeof KeyValueObject>>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<15>, z.ZodLiteral<16>, z.ZodLiteral<17>, z.ZodLiteral<18>, z.ZodLiteral<19>, z.ZodLiteral<99>]>>;
};

const AccountSchema: z.ZodObject<AccountShape, z.core.$strict> = z.strictObject({
  /** The name of the account (e.g. GCP Project name , Linux Account name or AWS Account name). */
  name: z.string().optional(),
  /** The unique identifier of the account (e.g. AWS Account ID , OCID , GCP Project ID , Azure Subscription ID , Google Workspace Customer ID , or M365 Tenant UID). */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** Indicates if the account is disabled. */
  is_disabled: z.boolean().optional(),
  /** Indicates if the account is locked. For example, due to the amount of failed logins. */
  is_locked: z.boolean().optional(),
  /** Indicates whether synchronization with an on-premises directory service is enabled. For example, Microsoft Entra Connect. */
  is_on_premises_sync_enabled: z.boolean().optional(),
  /** The list of labels associated to the account. */
  labels: z.array(z.string()).optional(),
  /** The list of tags; {key:value} pairs associated to the account. */
  tags: z.array(KeyValueObject).optional(),
  /** The account type, normalized to the caption of 'account_type_id'. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The normalized account type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(99)]).optional(),
});

export const Account = AccountSchema;

/** Value → label mappings for each enum field of Account. */
export const AccountLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "LDAP Account",
    2: "Windows Account",
    3: "AWS IAM User",
    4: "AWS IAM Role",
    5: "GCP Account",
    6: "Azure AD Account",
    7: "Mac OS Account",
    8: "Apple Account",
    9: "Linux Account",
    10: "AWS Account",
    11: "GCP Project",
    12: "OCI Compartment",
    13: "Azure Subscription",
    14: "Salesforce Account",
    15: "Google Workspace",
    16: "Servicenow Instance",
    17: "M365 Tenant",
    18: "Email Account",
    19: "ActiveDirectory Account",
    99: "Other",
  },
};
