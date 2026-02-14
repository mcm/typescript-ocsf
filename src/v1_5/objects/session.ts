import { z } from 'zod';

/**
 * The Session object describes details about an authenticated session. e.g. Session Creation Time, Session Issuer.
 *
 * OCSF Object: Session
 */
export interface SessionType {
  /** The number of identical sessions spawned from the same source IP, destination IP, application, and content/threat type seen over a period of time. */
  count?: number;
  /** The time when the session was created. */
  created_time?: number;
  /** The unique identifier of the user's credential. For example, AWS Access Key ID. */
  credential_uid?: string;
  /** The reason which triggered the session expiration. */
  expiration_reason?: string;
  /** The session expiration time. */
  expiration_time?: number;
  /** Indicates whether Multi Factor Authentication was used during authentication. */
  is_mfa?: boolean;
  /** The indication of whether the session is remote. */
  is_remote?: boolean;
  /** The indication of whether the session is a VPN session. */
  is_vpn?: boolean;
  /** The identifier of the session issuer. */
  issuer?: string;
  /** The Pseudo Terminal associated with the session. Ex: the tty or pts value. */
  terminal?: string;
  /** The unique identifier of the session. */
  uid?: string;
  /** The alternate unique identifier of the session. e.g. AWS ARN - arn:aws:sts::123344444444:assumed-role/Admin/example-session. */
  uid_alt?: string;
  /** The universally unique identifier of the session. */
  uuid?: string;
}

const SessionSchema = z.strictObject({
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
});

export const Session = SessionSchema;
