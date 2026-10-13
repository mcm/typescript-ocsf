import { z } from 'zod';

/**
 * The Group object represents a collection or association of entities, such as users, policies, or devices. It serves as a logical grouping mechanism to organize and manage entities with similar characteristics or permissions within a system or organization, including but not limited to purposes of access control.
 *
 * OCSF Object: Group
 */
export interface GroupType {
  /** The group name. */
  name?: string;
  /** The unique identifier of the group. For example, for Windows events this is the security identifier (SID) of the group. Another example, pool id or desktop id that the device belongs to. */
  uid?: string;
  /** The group description. */
  desc?: string;
  /** The domain where the group is defined. For example: the LDAP or Active Directory domain. */
  domain?: string;
  /** The group privileges. */
  privileges?: string[];
  /** The type of the group. */
  type?: string;
  /** The alternate unique identifier. */
  uid_alt?: string;
}

type GroupShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  desc: z.ZodOptional<z.ZodString>;
  domain: z.ZodOptional<z.ZodString>;
  privileges: z.ZodOptional<z.ZodArray<z.ZodString>>;
  type: z.ZodOptional<z.ZodString>;
  uid_alt: z.ZodOptional<z.ZodString>;
};

const GroupSchema: z.ZodObject<GroupShape, z.core.$strict> = z.strictObject({
  /** The group name. */
  name: z.string().optional(),
  /** The unique identifier of the group. For example, for Windows events this is the security identifier (SID) of the group. Another example, pool id or desktop id that the device belongs to. */
  uid: z.string().optional(),
  /** The group description. */
  desc: z.string().optional(),
  /** The domain where the group is defined. For example: the LDAP or Active Directory domain. */
  domain: z.string().optional(),
  /** The group privileges. */
  privileges: z.array(z.string()).optional(),
  /** The type of the group. */
  type: z.string().optional(),
  /** The alternate unique identifier. */
  uid_alt: z.string().optional(),
});

export const Group = GroupSchema;

/** Value → label mappings for each enum field of Group. */
export const GroupLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
