import { z } from 'zod';

import { Group } from './group.js';
import { User } from './user.js';
import { Graph } from './graph.js';
import { Sbom } from './sbom.js';
import { KeyValueObject } from './key_value_object.js';
import { Url } from './url.js';

/**
 * An Application describes the details for an inventoried application as reported by an Application Security tool or other Developer-centric tooling. Applications can be defined as Kubernetes resources, Containerized resources, or application hosting-specific cloud sources such as AWS Elastic BeanStalk, AWS Lightsail, or Azure Logic Apps.
 *
 * OCSF Object: Application
 */
export const Application = z.object({
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
  owner: User.optional(),
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
}).passthrough() as any;

export type ApplicationType = z.infer<typeof Application>;
