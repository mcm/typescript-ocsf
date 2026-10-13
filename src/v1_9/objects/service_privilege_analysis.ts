import { z } from 'zod';

import type { PrivilegeAttackInfoType } from './privilege_attack_info.js';

/**
 * The Service Privilege Analysis object describes privilege analysis results for a single cloud service or resource namespace. It provides metrics on privilege usage, counts by type, and mappings to potential attack techniques.
 *
 * OCSF Object: Service Privilege Analysis
 */
export interface ServicePrivilegeAnalysisType {
  /** Indicates whether all privileges within this service are unused. */
  all_privileges_unused?: boolean;
  /** The total count of privileges analyzed within this service. */
  analyzed_privileges_count?: number;
  /** The count of execute-type privileges within this service. */
  execute_count?: number;
  /** The most recent time any privilege in this service was used. */
  last_used_time?: number;
  /** The service or namespace identifier. Examples: s3, ec2 (AWS); Microsoft.Storage (Azure); storage (GCP). */
  name: string;
  /** The list of privilege-to-attack mappings for this service. */
  privilege_attack_info_list?: PrivilegeAttackInfoType[];
  /** The count of read-type privileges within this service. */
  read_count?: number;
  /** The count of unused privileges within this service. */
  unused_privileges_count?: number;
  /** The count of write-type privileges within this service. */
  write_count?: number;
}

import { PrivilegeAttackInfo } from './privilege_attack_info.js';

type ServicePrivilegeAnalysisShape = {
  all_privileges_unused: z.ZodOptional<z.ZodBoolean>;
  analyzed_privileges_count: z.ZodOptional<z.ZodNumber>;
  execute_count: z.ZodOptional<z.ZodNumber>;
  last_used_time: z.ZodOptional<z.ZodNumber>;
  name: z.ZodString;
  privilege_attack_info_list: z.ZodOptional<z.ZodArray<typeof PrivilegeAttackInfo>>;
  read_count: z.ZodOptional<z.ZodNumber>;
  unused_privileges_count: z.ZodOptional<z.ZodNumber>;
  write_count: z.ZodOptional<z.ZodNumber>;
};

const ServicePrivilegeAnalysisSchema: z.ZodObject<ServicePrivilegeAnalysisShape, z.core.$strict> = z.strictObject({
  /** Indicates whether all privileges within this service are unused. */
  all_privileges_unused: z.boolean().optional(),
  /** The total count of privileges analyzed within this service. */
  analyzed_privileges_count: z.number().int().optional(),
  /** The count of execute-type privileges within this service. */
  execute_count: z.number().int().optional(),
  /** The most recent time any privilege in this service was used. */
  last_used_time: z.number().int().optional(),
  /** The service or namespace identifier. Examples: s3, ec2 (AWS); Microsoft.Storage (Azure); storage (GCP). */
  name: z.string(),
  /** The list of privilege-to-attack mappings for this service. */
  privilege_attack_info_list: z.array(PrivilegeAttackInfo).optional(),
  /** The count of read-type privileges within this service. */
  read_count: z.number().int().optional(),
  /** The count of unused privileges within this service. */
  unused_privileges_count: z.number().int().optional(),
  /** The count of write-type privileges within this service. */
  write_count: z.number().int().optional(),
});

export const ServicePrivilegeAnalysis = ServicePrivilegeAnalysisSchema;

/** Value → label mappings for each enum field of ServicePrivilegeAnalysis. */
export const ServicePrivilegeAnalysisLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
