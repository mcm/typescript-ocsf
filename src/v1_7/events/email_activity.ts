import { z } from "zod";
import { type SiblingPair, reconcileSiblings } from "../../sibling.js";
import { type UidConfig, prefillUids } from "../../uid.js";

import { Email, type EmailType } from "../objects/email.js";
import { EmailAuth, type EmailAuthType } from "../objects/email_auth.js";
import { Enrichment, type EnrichmentType } from "../objects/enrichment.js";
import { Fingerprint, type FingerprintType } from "../objects/fingerprint.js";
import { Metadata, type MetadataType } from "../objects/metadata.js";
import { NetworkEndpoint, type NetworkEndpointType } from "../objects/network_endpoint.js";
import { OcsfObject, type OcsfObjectType } from "../objects/object.js";
import { Observable, type ObservableType } from "../objects/observable.js";

const ACTIVITY_ID_LABELS: Record<number, string> = {
  1: "Send",
  2: "Receive",
  3: "Scan",
  4: "Trace",
  5: "MTA Relay",
};

const SEVERITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Informational",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Critical",
  6: "Fatal",
  99: "Other",
};

const STATUS_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Success",
  2: "Failure",
  99: "Other",
};

const DIRECTION_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Inbound",
  2: "Outbound",
  3: "Internal",
  99: "Other",
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
  { idField: "direction_id", labelField: "direction", labels: DIRECTION_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 4,
  classUid: 4009,
};

/**
 * Email Activity events report SMTP protocol and email activities including those with embedded URLs and files. See the <code>Email</code> object for details.
 *
 * OCSF Class UID: 4009
 * Category: Email Activity
 * @see https://schema.ocsf.io/1.7.0/classes/email_activity
 */
export interface EmailActivityType {
  /** The normalized identifier of the activity that triggered the event. */
  activity_id: number;
  /** The event activity name, as defined by the activity_id. */
  activity_name?: string | undefined;
  /** The event category name, as defined by category_uid value. */
  category_name?: string | undefined;
  /** The category unique identifier of the event. */
  category_uid: number;
  /** The event class name, as defined by class_uid value. */
  class_name?: string | undefined;
  /** The unique identifier of a class. A class describes the attributes available in an event. */
  class_uid: number;
  /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
  count?: number | undefined;
  /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
  duration?: number | undefined;
  /** The end time of a time period, or the time of the most recent event included in the aggregate event. */
  end_time?: number | undefined;
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments?: EnrichmentType[] | undefined;
  /** The description of the event/finding, as defined by the source. */
  message?: string | undefined;
  /** The metadata associated with the event or a finding. */
  metadata: MetadataType;
  /** The observables associated with the event or a finding. */
  observables?: ObservableType[] | undefined;
  /** The raw event/finding data as received from the source. */
  raw_data?: string | undefined;
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash?: FingerprintType | undefined;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number | undefined;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string | undefined;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: number;
  /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
  start_time?: number | undefined;
  /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string | undefined;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string | undefined;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string | undefined;
  /** The normalized identifier of the event status. */
  status_id?: number | undefined;
  /** The normalized event occurrence time or the finding creation time. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset?: number | undefined;
  /** The event/finding type name, as defined by the type_uid. */
  type_name?: string | undefined;
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: number;
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped?: OcsfObjectType | undefined;
  /** The attempt number for attempting to deliver the email. */
  attempt?: number | undefined;
  /** The initial connection response that a messaging server receives after it connects to an email server. */
  banner?: string | undefined;
  /** The command issued by the initiator (client), such as SMTP HELO or EHLO. */
  command?: string | undefined;
  /** The direction of the email, as defined by the direction_id value. */
  direction?: string | undefined;
  /** The direction of the email relative to the scanning host or organization.Email scanned at an internet gateway might be characterized as inbound to the organization from the Internet, outbound from the organization to the Internet, or internal within the organization. Email scanned at a workstation might be characterized as inbound to, or outbound from the workstation. */
  direction_id: number;
  /** The responder (server) receiving the email. */
  dst_endpoint?: NetworkEndpointType | undefined;
  /** The email object. */
  email: EmailType;
  /** The SPF, DKIM and DMARC attributes of an email. */
  email_auth?: EmailAuthType | undefined;
  /** The sender address from the transmission envelope. This reflects the actual sending party and may differ from the 'From' header in the message. */
  from?: string | undefined;
  /** The identifier that tracks a message that travels through multiple points of a messaging service. */
  message_trace_uid?: string | undefined;
  /** The Protocol Name specifies the email communication protocol, such as SMTP, IMAP, or POP3. */
  protocol_name?: string | undefined;
  /** The value of the SMTP HELO or EHLO command sent by the initiator (client). */
  smtp_hello?: string | undefined;
  /** The initiator (client) sending the email. */
  src_endpoint?: NetworkEndpointType | undefined;
  /** The recipient address from the transmission envelope. This may differ from the 'To' header and represents where the message was actually delivered. */
  to?: string[] | undefined;
  [key: string]: unknown;
}

export const EmailActivity: z.ZodType<EmailActivityType> = z.preprocess(
  (data) => {
    if (typeof data !== "object" || data === null) return data;
    let d = { ...data } as Record<string, unknown>;
    d = reconcileSiblings(d, SIBLING_PAIRS);
    d = prefillUids(d, UID_CONFIG);
    return d;
  },
  z
    .object({
      /** The normalized identifier of the activity that triggered the event. */
      activity_id: z.number().int(),
      /** The event activity name, as defined by the activity_id. */
      activity_name: z.string().optional(),
      /** The event category name, as defined by category_uid value. */
      category_name: z.string().optional(),
      /** The category unique identifier of the event. */
      category_uid: z.number().int(),
      /** The event class name, as defined by class_uid value. */
      class_name: z.string().optional(),
      /** The unique identifier of a class. A class describes the attributes available in an event. */
      class_uid: z.number().int(),
      /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
      count: z.number().int().optional(),
      /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
      duration: z.number().int().optional(),
      /** The end time of a time period, or the time of the most recent event included in the aggregate event. */
      end_time: z.number().int().optional(),
      /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
      enrichments: z.array(z.lazy(() => Enrichment)).optional(),
      /** The description of the event/finding, as defined by the source. */
      message: z.string().optional(),
      /** The metadata associated with the event or a finding. */
      metadata: z.lazy(() => Metadata),
      /** The observables associated with the event or a finding. */
      observables: z.array(z.lazy(() => Observable)).optional(),
      /** The raw event/finding data as received from the source. */
      raw_data: z.string().optional(),
      /** The hash, which describes the content of the raw_data field. */
      raw_data_hash: z.lazy(() => Fingerprint).optional(),
      /** The size of the raw data which was transformed into an OCSF event, in bytes. */
      raw_data_size: z.number().int().optional(),
      /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
      severity: z.string().optional(),
      /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
      severity_id: z.number().int(),
      /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
      start_time: z.number().int().optional(),
      /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
      status: z.string().optional(),
      /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
      status_code: z.string().optional(),
      /** The status detail contains additional information about the event/finding outcome. */
      status_detail: z.string().optional(),
      /** The normalized identifier of the event status. */
      status_id: z.number().int().optional(),
      /** The normalized event occurrence time or the finding creation time. */
      time: z.number().int(),
      /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
      timezone_offset: z.number().int().optional(),
      /** The event/finding type name, as defined by the type_uid. */
      type_name: z.string().optional(),
      /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
      type_uid: z.number().int(),
      /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
      unmapped: z.lazy(() => OcsfObject).optional(),
      /** The attempt number for attempting to deliver the email. */
      attempt: z.number().int().optional(),
      /** The initial connection response that a messaging server receives after it connects to an email server. */
      banner: z.string().optional(),
      /** The command issued by the initiator (client), such as SMTP HELO or EHLO. */
      command: z.string().optional(),
      /** The direction of the email, as defined by the direction_id value. */
      direction: z.string().optional(),
      /** The direction of the email relative to the scanning host or organization.Email scanned at an internet gateway might be characterized as inbound to the organization from the Internet, outbound from the organization to the Internet, or internal within the organization. Email scanned at a workstation might be characterized as inbound to, or outbound from the workstation. */
      direction_id: z.number().int(),
      /** The responder (server) receiving the email. */
      dst_endpoint: z.lazy(() => NetworkEndpoint).optional(),
      /** The email object. */
      email: z.lazy(() => Email),
      /** The SPF, DKIM and DMARC attributes of an email. */
      email_auth: z.lazy(() => EmailAuth).optional(),
      /** The sender address from the transmission envelope. This reflects the actual sending party and may differ from the 'From' header in the message. */
      from: z.string().optional(),
      /** The identifier that tracks a message that travels through multiple points of a messaging service. */
      message_trace_uid: z.string().optional(),
      /** The Protocol Name specifies the email communication protocol, such as SMTP, IMAP, or POP3. */
      protocol_name: z.string().optional(),
      /** The value of the SMTP HELO or EHLO command sent by the initiator (client). */
      smtp_hello: z.string().optional(),
      /** The initiator (client) sending the email. */
      src_endpoint: z.lazy(() => NetworkEndpoint).optional(),
      /** The recipient address from the transmission envelope. This may differ from the 'To' header and represents where the message was actually delivered. */
      to: z.array(z.string()).optional(),
    })
    .passthrough(),
) as any;
