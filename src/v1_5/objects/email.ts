import { z } from 'zod';

import { File } from './file.js';
import { HttpHeader } from './http_header.js';
import { Url } from './url.js';

/**
 * The Email object describes the email metadata such as sender, recipients, and direction, and can include embedded URLs and files.
 *
 * OCSF Object: Email
 */
export const Email = z.object({
  /** The machine-readable email header Cc values, as defined by RFC 5322. For example example.user@usersdomain.com. */
  cc: z.array(z.string()).optional(),
  /** The human-readable email header Cc Mailbox values. For example 'Example User <example.user@usersdomain.com>'. */
  cc_mailboxes: z.array(z.string()).optional(),
  /** The machine-readable Delivered-To email header field. For example example.user@usersdomain.com */
  delivered_to: z.string().optional(),
  /** The machine-readable Delivered-To email header values. For example example.user@usersdomain.com */
  delivered_to_list: z.array(z.string()).optional(),
  /** The files embedded or attached to the email. */
  files: z.array(File).optional(),
  /** The machine-readable email header From values, as defined by RFC 5322. For example example.user@usersdomain.com */
  from: z.string().optional(),
  /** The human-readable email header From Mailbox value. For example 'Example User <example.user@usersdomain.com>'. */
  from_mailbox: z.string().optional(),
  /** Additional HTTP headers of an HTTP request or response. */
  http_headers: z.array(HttpHeader).optional(),
  /** The indication of whether the email has been read. */
  is_read: z.boolean().optional(),
  /** The email header Message-ID value, as defined by RFC 5322. */
  message_uid: z.string().optional(),
  /** The email authentication header. */
  raw_header: z.string().optional(),
  /** The machine-readable email header Reply-To values, as defined by RFC 5322. For example example.user@usersdomain.com */
  reply_to: z.string().optional(),
  /** The human-readable email header Reply To Mailbox values. For example 'Example User <example.user@usersdomain.com>'. */
  reply_to_mailboxes: z.array(z.string()).optional(),
  /** The size in bytes of the email, including attachments. */
  size: z.number().int().optional(),
  /** The value of the SMTP MAIL FROM command. */
  smtp_from: z.string().optional(),
  /** The value of the SMTP envelope RCPT TO command. */
  smtp_to: z.array(z.string()).optional(),
  /** The email header Subject value, as defined by RFC 5322. */
  subject: z.string().optional(),
  /** The machine-readable email header To values, as defined by RFC 5322. For example example.user@usersdomain.com */
  to: z.array(z.string()).optional(),
  /** The human-readable email header To Mailbox values. For example 'Example User <example.user@usersdomain.com>'. */
  to_mailboxes: z.array(z.string()).optional(),
  /** The unique identifier of the email thread. */
  uid: z.string().optional(),
  /** The URLs embedded in the email. */
  urls: z.array(Url).optional(),
  /** The X-Originating-IP header identifying the emails originating IP address(es). */
  x_originating_ip: z.array(z.string()).optional(),
}).passthrough() as any;

export type EmailType = z.infer<typeof Email>;
