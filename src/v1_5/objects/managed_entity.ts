import { z } from 'zod';

import type { DeviceType } from './device.js';
import type { EmailType } from './email.js';
import type { GroupType } from './group.js';
import type { LocationType } from './location.js';
import type { OrganizationType } from './organization.js';
import type { PolicyType } from './policy.js';
import type { UserType } from './user.js';

/**
 * The Managed Entity object describes the type and version of an entity, such as a user, device, or policy.  For types in the <code>type_id</code> enum list, an associated attribute should be populated.  If the type of entity is not in the <code>type_id</code> list, information can be put into the <code>data</code> attribute, <code>type_id</code> should be 'Other' and the <code>type</code> attribute should label the entity type.
 *
 * OCSF Object: Managed Entity
 */
export interface ManagedEntityType {
  /** The name of the managed entity. It should match the name of the specific entity object's name if populated, or the name of the managed entity if the type_id is 'Other'. */
  name?: string;
  /** The identifier of the managed entity. It should match the uid of the specific entity's object UID if populated, or the source specific ID if the type_id is 'Other'. */
  uid?: string;
  /** The managed entity content as a JSON object. */
  data?: Record<string, unknown>;
  /** An addressable device, computer system or host. */
  device?: DeviceType;
  /** The email object. */
  email?: EmailType;
  /** The group object associated with an entity such as user, policy, or rule. */
  group?: GroupType;
  /** The detailed geographical location usually associated with an IP address. */
  location?: LocationType;
  /** Organization and org unit relevant to the event or object. */
  org?: OrganizationType;
  /** Describes details of a managed policy. */
  policy?: PolicyType;
  /** The managed entity type. For example: Policy, User, Organization, Device. */
  type?: string;
  /** The type of the Managed Entity. It is recommended to also populate the type attribute with the associated label, or the source specific name if Other. */
  type_id?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** The user that pertains to the event or object. */
  user?: UserType;
  /** The version of the managed entity. For example: 1.2.3. */
  version?: string;
}

import { Device } from './device.js';
import { Email } from './email.js';
import { Group } from './group.js';
import { Location } from './location.js';
import { Organization } from './organization.js';
import { Policy } from './policy.js';
import { User } from './user.js';

const ManagedEntitySchema: z.ZodType<ManagedEntityType> = z.strictObject({
  /** The name of the managed entity. It should match the name of the specific entity object's name if populated, or the name of the managed entity if the type_id is 'Other'. */
  name: z.string().optional(),
  /** The identifier of the managed entity. It should match the uid of the specific entity's object UID if populated, or the source specific ID if the type_id is 'Other'. */
  uid: z.string().optional(),
  /** The managed entity content as a JSON object. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** An addressable device, computer system or host. */
  device: Device.optional(),
  /** The email object. */
  email: Email.optional(),
  /** The group object associated with an entity such as user, policy, or rule. */
  group: Group.optional(),
  /** The detailed geographical location usually associated with an IP address. */
  location: Location.optional(),
  /** Organization and org unit relevant to the event or object. */
  org: Organization.optional(),
  /** Describes details of a managed policy. */
  policy: Policy.optional(),
  /** The managed entity type. For example: Policy, User, Organization, Device. */
  type: z.string().optional(),
  /** The type of the Managed Entity. It is recommended to also populate the type attribute with the associated label, or the source specific name if Other. */
  type_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7)]).optional(),
  /** The user that pertains to the event or object. */
  user: User.optional(),
  /** The version of the managed entity. For example: 1.2.3. */
  version: z.string().optional(),
});

export const ManagedEntity = ManagedEntitySchema;
