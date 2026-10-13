import { z } from 'zod';

import type { ApplicationType } from './application.js';
import type { AuthorizationType } from './authorization.js';
import type { IamRoleType } from './iam_role.js';
import type { IdpType } from './idp.js';
import type { ProcessType } from './process.js';
import type { SessionType } from './session.js';
import type { UserType } from './user.js';

/**
 * The Actor object contains details about the user, role, application, service, or process that initiated or performed a specific activity. Note that Actor is not the threat actor of a campaign but may be part of a campaign. When the initiator of the activity is an autonomous AI agent, apply the <code>ai_operation</code> profile and populate <code>ai_operation.ai_agent</code> rather than describing the agent here.
 *
 * OCSF Object: Actor
 */
export interface ActorType {
  /** The client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process if present. */
  app_name?: string;
  /** The unique identifier of the client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process.pid or process.uid if present. */
  app_uid?: string;
  /** The client application or service that initiated the activity. This can be in conjunction with the user if present. Note that application is distinct from the process if present. */
  application?: ApplicationType;
  /** Provides details about an authorization, such as authorization outcome, and any associated policies related to the activity/event. */
  authorizations?: AuthorizationType[];
  /** The actor's role, or as an alternative to user or process when the role is serving as a security principal for the operation that initiated the activity. */
  iam_role?: IamRoleType;
  /** This object describes details about the Identity Provider used. */
  idp?: IdpType;
  /** The name of the service that invoked the activity as described in the event. */
  invoked_by?: string;
  /** The process that initiated the activity. */
  process?: ProcessType;
  /** The user session from which the activity was initiated. */
  session?: SessionType;
  /** The user that initiated the activity or the user context from which the activity was initiated. */
  user?: UserType;
}

import { Application } from './application.js';
import { Authorization } from './authorization.js';
import { IamRole } from './iam_role.js';
import { Idp } from './idp.js';
import { Process } from './process.js';
import { Session } from './session.js';
import { User } from './user.js';

type ActorShape = {
  app_name: z.ZodOptional<z.ZodString>;
  app_uid: z.ZodOptional<z.ZodString>;
  application: z.ZodOptional<typeof Application>;
  authorizations: z.ZodOptional<z.ZodArray<typeof Authorization>>;
  iam_role: z.ZodOptional<typeof IamRole>;
  idp: z.ZodOptional<typeof Idp>;
  invoked_by: z.ZodOptional<z.ZodString>;
  process: z.ZodOptional<typeof Process>;
  session: z.ZodOptional<typeof Session>;
  user: z.ZodOptional<typeof User>;
};

const ActorSchema: z.ZodObject<ActorShape, z.core.$strict> = z.strictObject({
  /** The client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process if present. */
  app_name: z.string().optional(),
  /** The unique identifier of the client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process.pid or process.uid if present. */
  app_uid: z.string().optional(),
  /** The client application or service that initiated the activity. This can be in conjunction with the user if present. Note that application is distinct from the process if present. */
  application: Application.optional(),
  /** Provides details about an authorization, such as authorization outcome, and any associated policies related to the activity/event. */
  authorizations: z.array(Authorization).optional(),
  /** The actor's role, or as an alternative to user or process when the role is serving as a security principal for the operation that initiated the activity. */
  iam_role: IamRole.optional(),
  /** This object describes details about the Identity Provider used. */
  idp: Idp.optional(),
  /** The name of the service that invoked the activity as described in the event. */
  invoked_by: z.string().optional(),
  /** The process that initiated the activity. */
  process: Process.optional(),
  /** The user session from which the activity was initiated. */
  session: Session.optional(),
  /** The user that initiated the activity or the user context from which the activity was initiated. */
  user: User.optional(),
});

export const Actor = ActorSchema;

/** Value → label mappings for each enum field of Actor. */
export const ActorLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
