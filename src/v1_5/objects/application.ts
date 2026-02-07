import { z } from "zod";

import { Graph, type GraphType } from "./graph.js";
import { Group, type GroupType } from "./group.js";
import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";
import { Sbom, type SbomType } from "./sbom.js";
import { Url, type UrlType } from "./url.js";
import { User, type UserType } from "./user.js";

/**
 * An Application describes the details for an inventoried application as reported by an Application Security tool or other Developer-centric tooling. Applications can be defined as Kubernetes resources, Containerized resources, or application hosting-specific cloud sources such as AWS Elastic BeanStalk, AWS Lightsail, or Azure Logic Apps.
 *
 * OCSF Object: Application
 */
export interface ApplicationType {
  /** The criticality of the application as defined by the event source. */
  criticality?: string | undefined;
  /** Additional data describing the application. */
  data?: Record<string, unknown> | undefined;
  /** A description or commentary for an application, usually retrieved from an upstream system. */
  desc?: string | undefined;
  /** The name of the related application or associated resource group. */
  group?: GroupType | undefined;
  /** The fully qualified name of the application. */
  hostname?: string | undefined;
  /** The list of labels associated to the application. */
  labels?: string[] | undefined;
  /** The name of the application. */
  name?: string | undefined;
  /** The identity of the service or user account that owns the application. */
  owner?: UserType | undefined;
  /** The cloud region of the resource. */
  region?: string | undefined;
  /** A graph representation showing how this application relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
  resource_relationship?: GraphType | undefined;
  /** The risk level, normalized to the caption of the risk_level_id value. */
  risk_level?: string | undefined;
  /** The normalized risk level id. */
  risk_level_id?: number | undefined;
  /** The risk score as reported by the event source. */
  risk_score?: number | undefined;
  /** The Software Bill of Materials (SBOM) associated with the application */
  sbom?: SbomType | undefined;
  /** The list of tags; {key:value} pairs associated to the application. */
  tags?: KeyValueObjectType[] | undefined;
  /** The type of application as defined by the event source, e.g., GitHub, Azure Logic App, or Amazon Elastic BeanStalk. */
  type?: string | undefined;
  /** The unique identifier for the application. */
  uid?: string | undefined;
  /** An alternative or contextual identifier for the application, such as a configuration, organization, or license UID. */
  uid_alt?: string | undefined;
  /** The URL of the application. */
  url?: UrlType | undefined;
  /** The semantic version of the application, e.g., 1.7.4. */
  version?: string | undefined;
  [key: string]: unknown;
}

export const Application: z.ZodType<ApplicationType> = z
  .object({
    /** The criticality of the application as defined by the event source. */
    criticality: z.string().optional(),
    /** Additional data describing the application. */
    data: z.record(z.unknown()).optional(),
    /** A description or commentary for an application, usually retrieved from an upstream system. */
    desc: z.string().optional(),
    /** The name of the related application or associated resource group. */
    group: Group.optional(),
    /** The fully qualified name of the application. */
    hostname: z.string().optional(),
    /** The list of labels associated to the application. */
    labels: z.array(z.string()).optional(),
    /** The name of the application. */
    name: z.string().optional(),
    /** The identity of the service or user account that owns the application. */
    owner: z.lazy(() => User).optional(),
    /** The cloud region of the resource. */
    region: z.string().optional(),
    /** A graph representation showing how this application relates to and interacts with other entities in the environment. This can include parent/child relationships, dependencies, or other connections. */
    resource_relationship: Graph.optional(),
    /** The risk level, normalized to the caption of the risk_level_id value. */
    risk_level: z.string().optional(),
    /** The normalized risk level id. */
    risk_level_id: z.number().int().optional(),
    /** The risk score as reported by the event source. */
    risk_score: z.number().int().optional(),
    /** The Software Bill of Materials (SBOM) associated with the application */
    sbom: Sbom.optional(),
    /** The list of tags; {key:value} pairs associated to the application. */
    tags: z.array(KeyValueObject).optional(),
    /** The type of application as defined by the event source, e.g., GitHub, Azure Logic App, or Amazon Elastic BeanStalk. */
    type: z.string().optional(),
    /** The unique identifier for the application. */
    uid: z.string().optional(),
    /** An alternative or contextual identifier for the application, such as a configuration, organization, or license UID. */
    uid_alt: z.string().optional(),
    /** The URL of the application. */
    url: Url.optional(),
    /** The semantic version of the application, e.g., 1.7.4. */
    version: z.string().optional(),
  })
  .passthrough() as any;
