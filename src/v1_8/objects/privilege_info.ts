import { z } from 'zod';

/**
 * The Privilege Info object describes information about a specific privilege, action, or permission. It captures the privilege name, type, usage status, and when it was last used.
 *
 * OCSF Object: Privilege Info
 */
export interface PrivilegeInfoType {
  /** Indicates whether the privilege is unused within the analysis timeframe. */
  is_unused?: boolean;
  /** The most recent time this privilege was used. */
  last_used_time?: number;
  /** The name of the privilege, action, or permission. Examples: GetObject, CreateStoreImageTask (AWS); Microsoft.Storage/storageAccounts/read (Azure); storage.objects.get (GCP). */
  name: string;
  /** The type or category of the privilege, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The normalized type of the privilege. */
  type_id?: 0 | 1 | 2 | 3 | 99;
}

type PrivilegeInfoShape = {
  is_unused: z.ZodOptional<z.ZodBoolean>;
  last_used_time: z.ZodOptional<z.ZodNumber>;
  name: z.ZodString;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
};

const PrivilegeInfoSchema: z.ZodObject<PrivilegeInfoShape, z.core.$strict> = z.strictObject({
  /** Indicates whether the privilege is unused within the analysis timeframe. */
  is_unused: z.boolean().optional(),
  /** The most recent time this privilege was used. */
  last_used_time: z.number().int().optional(),
  /** The name of the privilege, action, or permission. Examples: GetObject, CreateStoreImageTask (AWS); Microsoft.Storage/storageAccounts/read (Azure); storage.objects.get (GCP). */
  name: z.string(),
  /** The type or category of the privilege, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The normalized type of the privilege. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
});

export const PrivilegeInfo = PrivilegeInfoSchema;

/** Value → label mappings for each enum field of PrivilegeInfo. */
export const PrivilegeInfoLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Read",
    2: "Write",
    3: "Execute",
    99: "Other",
  },
};
