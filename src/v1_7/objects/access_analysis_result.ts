import { z } from "zod";

import { AdditionalRestriction, type AdditionalRestrictionType } from "./additional_restriction.js";
import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";
import { User, type UserType } from "./user.js";

/**
 * The Access Analysis Result object describes access relationships and pathways between identities, resources, focusing on who can access what and through which mechanisms. This evaluates access levels (read/write/admin), access types (direct, cross-account, public, federated), and the conditions under which access is granted. Use this for resource-centric security assessments such as external access discovery, public exposure analysis, etc.
 *
 * OCSF Object: Access Analysis Result
 */
export interface AccessAnalysisResultType {
  /** The generalized access level or permission scope granted to the identity through the analyzed policy configuration. Common examples include Read, Write, List, Delete, Admin, or custom permission levels. */
  access_level?: string | undefined;
  /** The type or category of access being granted to the identity. This describes the nature of the access relationship, such as cross-account access, public access, federated access, or third-party integration access. Examples include 'Cross-Account', 'Public', 'Federated', 'Service-to-Service', etc. */
  access_type?: string | undefined;
  /** The identities that are granted access through the analyzed policy configuration. This identifies the specific entity that can exercise the permissions and helps assess the access relationship and potential security implications. Examples include user accounts, service principals, roles, account identifiers, or system identities. */
  accessors: UserType[];
  /** Details about supplementary restrictions and guardrails that may limit the granted access, applied through additional policy types such as Resource Control Policies (RCPs) and Service Control Policies (SCPs) in AWS, or other policy constraints. */
  additional_restrictions?: AdditionalRestrictionType[] | undefined;
  /** The condition keys and their values that constrain when and how the granted access can be exercised. These conditions define the circumstances under which the access relationship is valid and the privileges can be used. Examples: IP address restrictions like 'aws:SourceIp:192.0.2.0/24', time-based constraints like 'aws:RequestedRegion:us-east-1', MFA requirements like 'aws:MultiFactorAuthPresent:true', or custom conditions based on resource tags and request context. */
  condition_keys?: KeyValueObjectType[] | undefined;
  /** The specific privileges, actions, or permissions that are granted through the analyzed access relationship. This includes the actual operations that the accessor can perform on the target resource. Examples: AWS actions like 'sts:AssumeRole', 's3:GetObject', 'ec2:DescribeInstances'; Azure actions like 'Microsoft.Storage/storageAccounts/read'; or GCP permissions like 'storage.objects.get'. */
  granted_privileges?: string[] | undefined;
  [key: string]: unknown;
}

export const AccessAnalysisResult: z.ZodType<AccessAnalysisResultType> = z
  .object({
    /** The generalized access level or permission scope granted to the identity through the analyzed policy configuration. Common examples include Read, Write, List, Delete, Admin, or custom permission levels. */
    access_level: z.string().optional(),
    /** The type or category of access being granted to the identity. This describes the nature of the access relationship, such as cross-account access, public access, federated access, or third-party integration access. Examples include 'Cross-Account', 'Public', 'Federated', 'Service-to-Service', etc. */
    access_type: z.string().optional(),
    /** The identities that are granted access through the analyzed policy configuration. This identifies the specific entity that can exercise the permissions and helps assess the access relationship and potential security implications. Examples include user accounts, service principals, roles, account identifiers, or system identities. */
    accessors: z.array(z.lazy(() => User)),
    /** Details about supplementary restrictions and guardrails that may limit the granted access, applied through additional policy types such as Resource Control Policies (RCPs) and Service Control Policies (SCPs) in AWS, or other policy constraints. */
    additional_restrictions: z.array(AdditionalRestriction).optional(),
    /** The condition keys and their values that constrain when and how the granted access can be exercised. These conditions define the circumstances under which the access relationship is valid and the privileges can be used. Examples: IP address restrictions like 'aws:SourceIp:192.0.2.0/24', time-based constraints like 'aws:RequestedRegion:us-east-1', MFA requirements like 'aws:MultiFactorAuthPresent:true', or custom conditions based on resource tags and request context. */
    condition_keys: z.array(KeyValueObject).optional(),
    /** The specific privileges, actions, or permissions that are granted through the analyzed access relationship. This includes the actual operations that the accessor can perform on the target resource. Examples: AWS actions like 'sts:AssumeRole', 's3:GetObject', 'ec2:DescribeInstances'; Azure actions like 'Microsoft.Storage/storageAccounts/read'; or GCP permissions like 'storage.objects.get'. */
    granted_privileges: z.array(z.string()).optional(),
  })
  .passthrough() as any;
