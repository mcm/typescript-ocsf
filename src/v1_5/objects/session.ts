import { z } from "zod";

/**
 * The Session object describes details about an authenticated session. e.g. Session Creation Time, Session Issuer.
 *
 * OCSF Object: Session
 */
export interface SessionType {
  /** The number of identical sessions spawned from the same source IP, destination IP, application, and content/threat type seen over a period of time. */
  count?: number | undefined;
  /** The time when the session was created. */
  created_time?: number | undefined;
  /** The unique identifier of the user's credential. For example, AWS Access Key ID. */
  credential_uid?: string | undefined;
  /** The reason which triggered the session expiration. */
  expiration_reason?: string | undefined;
  /** The session expiration time. */
  expiration_time?: number | undefined;
  /** Indicates whether Multi Factor Authentication was used during authentication. */
  is_mfa?: boolean | undefined;
  /** The indication of whether the session is remote. */
  is_remote?: boolean | undefined;
  /** The indication of whether the session is a VPN session. */
  is_vpn?: boolean | undefined;
  /** The identifier of the session issuer. */
  issuer?: string | undefined;
  /** The Pseudo Terminal associated with the session. Ex: the tty or pts value. */
  terminal?: string | undefined;
  /** The unique identifier of the session. */
  uid?: string | undefined;
  /** The alternate unique identifier of the session. e.g. AWS ARN - arn:aws:sts::123344444444:assumed-role/Admin/example-session. */
  uid_alt?: string | undefined;
  /** The universally unique identifier of the session. */
  uuid?: string | undefined;
  [key: string]: unknown;
}

export const Session: z.ZodType<SessionType> = z
  .object({
    /** The number of identical sessions spawned from the same source IP, destination IP, application, and content/threat type seen over a period of time. */
    count: z.number().int().optional(),
    /** The time when the session was created. */
    created_time: z.number().int().optional(),
    /** The unique identifier of the user's credential. For example, AWS Access Key ID. */
    credential_uid: z.string().optional(),
    /** The reason which triggered the session expiration. */
    expiration_reason: z.string().optional(),
    /** The session expiration time. */
    expiration_time: z.number().int().optional(),
    /** Indicates whether Multi Factor Authentication was used during authentication. */
    is_mfa: z.boolean().optional(),
    /** The indication of whether the session is remote. */
    is_remote: z.boolean().optional(),
    /** The indication of whether the session is a VPN session. */
    is_vpn: z.boolean().optional(),
    /** The identifier of the session issuer. */
    issuer: z.string().optional(),
    /** The Pseudo Terminal associated with the session. Ex: the tty or pts value. */
    terminal: z.string().optional(),
    /** The unique identifier of the session. */
    uid: z.string().optional(),
    /** The alternate unique identifier of the session. e.g. AWS ARN - arn:aws:sts::123344444444:assumed-role/Admin/example-session. */
    uid_alt: z.string().optional(),
    /** The universally unique identifier of the session. */
    uuid: z.string().optional(),
  })
  .passthrough() as any;
