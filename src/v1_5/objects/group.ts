import { z } from 'zod';

/**
 * The Group object represents a collection or association of entities, such as users, policies, or devices. It serves as a logical grouping mechanism to organize and manage entities with similar characteristics or permissions within a system or organization, including but not limited to purposes of access control.
 *
 * OCSF Object: Group
 */
export interface GroupType {
  /** The group name. */
  name?: string;
  /** The unique identifier of the group. For example, for Windows events this is the security identifier (SID) of the group. */
  uid?: string;
  /** The group description. */
  desc?: string;
  /** The domain where the group is defined. For example: the LDAP or Active Directory domain. */
  domain?: string;
  /** The group privileges. */
  privileges?: string[];
  /** The type of the group or account. */
  type?: string;
}

const GroupSchema: z.ZodType<GroupType> = z.strictObject({
  /** The group name. */
  name: z.string().optional(),
  /** The unique identifier of the group. For example, for Windows events this is the security identifier (SID) of the group. */
  uid: z.string().optional(),
  /** The group description. */
  desc: z.string().optional(),
  /** The domain where the group is defined. For example: the LDAP or Active Directory domain. */
  domain: z.string().optional(),
  /** The group privileges. */
  privileges: z.array(z.string()).optional(),
  /** The type of the group or account. */
  type: z.string().optional(),
});

export const Group = GroupSchema;
