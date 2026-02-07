import { z } from "zod";

import { Device, type DeviceType } from "./device.js";
import { Email, type EmailType } from "./email.js";
import { Group, type GroupType } from "./group.js";
import { Location, type LocationType } from "./location.js";
import { Organization, type OrganizationType } from "./organization.js";
import { Policy, type PolicyType } from "./policy.js";
import { User, type UserType } from "./user.js";

/**
 * The Managed Entity object describes the type and version of an entity, such as a user, device, or policy.  For types in the <code>type_id</code> enum list, an associated attribute should be populated.  If the type of entity is not in the <code>type_id</code> list, information can be put into the <code>data</code> attribute, <code>type_id</code> should be 'Other' and the <code>type</code> attribute should label the entity type.
 *
 * OCSF Object: Managed Entity
 */
export interface ManagedEntityType {
  /** The name of the managed entity. It should match the name of the specific entity object's name if populated, or the name of the managed entity if the type_id is 'Other'. */
  name?: string | undefined;
  /** The identifier of the managed entity. It should match the uid of the specific entity's object UID if populated, or the source specific ID if the type_id is 'Other'. */
  uid?: string | undefined;
  /** The managed entity content as a JSON object. */
  data?: Record<string, unknown> | undefined;
  /** An addressable device, computer system or host. */
  device?: DeviceType | undefined;
  /** The email object. */
  email?: EmailType | undefined;
  /** The group object associated with an entity such as user, policy, or rule. */
  group?: GroupType | undefined;
  /** The detailed geographical location usually associated with an IP address. */
  location?: LocationType | undefined;
  /** Organization and org unit relevant to the event or object. */
  org?: OrganizationType | undefined;
  /** Describes details of a managed policy. */
  policy?: PolicyType | undefined;
  /** The managed entity type. For example: Policy, User, Organization, Device. */
  type?: string | undefined;
  /** The type of the Managed Entity. It is recommended to also populate the type attribute with the associated label, or the source specific name if Other. */
  type_id?: number | undefined;
  /** The user that pertains to the event or object. */
  user?: UserType | undefined;
  /** The version of the managed entity. For example: 1.2.3. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const ManagedEntity: z.ZodType<ManagedEntityType> = z
  .object({
    /** The name of the managed entity. It should match the name of the specific entity object's name if populated, or the name of the managed entity if the type_id is 'Other'. */
    name: z.string().optional(),
    /** The identifier of the managed entity. It should match the uid of the specific entity's object UID if populated, or the source specific ID if the type_id is 'Other'. */
    uid: z.string().optional(),
    /** The managed entity content as a JSON object. */
    data: z.record(z.unknown()).optional(),
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
    type_id: z.number().int().optional(),
    /** The user that pertains to the event or object. */
    user: z.lazy(() => User).optional(),
    /** The version of the managed entity. For example: 1.2.3. */
    version: z.string().optional(),
  })
  .passthrough() as any;
