import { z } from "zod";

import { Authorization, type AuthorizationType } from "./authorization.js";
import { Idp, type IdpType } from "./idp.js";
import { Process, type ProcessType } from "./process.js";
import { Session, type SessionType } from "./session.js";
import { User, type UserType } from "./user.js";

/**
 * The Actor object contains details about the user, role, application, service, or process that initiated or performed a specific activity. Note that Actor is not the threat actor of a campaign but may be part of a campaign.
 *
 * OCSF Object: Actor
 */
export interface ActorType {
  /** The client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process if present. */
  app_name?: string | undefined;
  /** The unique identifier of the client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process.pid or process.uid if present. */
  app_uid?: string | undefined;
  /** Provides details about an authorization, such as authorization outcome, and any associated policies related to the activity/event. */
  authorizations?: AuthorizationType[] | undefined;
  /** This object describes details about the Identity Provider used. */
  idp?: IdpType | undefined;
  /** The name of the service that invoked the activity as described in the event. */
  invoked_by?: string | undefined;
  /** The process that initiated the activity. */
  process?: ProcessType | undefined;
  /** The user session from which the activity was initiated. */
  session?: SessionType | undefined;
  /** The user that initiated the activity or the user context from which the activity was initiated. */
  user?: UserType | undefined;
  [key: string]: unknown;
}

export const Actor: z.ZodType<ActorType> = z
  .object({
    /** The client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process if present. */
    app_name: z.string().optional(),
    /** The unique identifier of the client application or service that initiated the activity. This can be in conjunction with the user if present. Note that app_name is distinct from the process.pid or process.uid if present. */
    app_uid: z.string().optional(),
    /** Provides details about an authorization, such as authorization outcome, and any associated policies related to the activity/event. */
    authorizations: z.array(Authorization).optional(),
    /** This object describes details about the Identity Provider used. */
    idp: Idp.optional(),
    /** The name of the service that invoked the activity as described in the event. */
    invoked_by: z.string().optional(),
    /** The process that initiated the activity. */
    process: z.lazy(() => Process).optional(),
    /** The user session from which the activity was initiated. */
    session: Session.optional(),
    /** The user that initiated the activity or the user context from which the activity was initiated. */
    user: z.lazy(() => User).optional(),
  })
  .passthrough() as any;
