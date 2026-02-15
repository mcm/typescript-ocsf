import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FileType } from '../objects/file.js';

/**
 * Email File Activity events report files within emails.
 *
 * OCSF Class UID: 4011
 * Category: Email File Activity
 * @see https://schema.ocsf.io/1.5.0/classes/email_file_activity
 */
export interface EmailFileActivityType {
  /** The normalized identifier of the activity that triggered the event. */
  activity_id: 0 | 1 | 2 | 3 | 99;
  /** The event activity name, as defined by the activity_id. */
  activity_name?: string;
  /** The event category name, as defined by category_uid value. */
  category_name?: string;
  /** The category unique identifier of the event. */
  category_uid: number;
  /** The event class name, as defined by class_uid value. */
  class_name?: string;
  /** The unique identifier of a class. A class describes the attributes available in an event. */
  class_uid: number;
  /** The number of times that events in the same logical group occurred during the event Start Time to End Time period. */
  count?: number;
  /** The event duration or aggregate time, the amount of time the event covers from start_time to end_time in milliseconds. */
  duration?: number;
  /** The end time of a time period, or the time of the most recent event included in the aggregate event. */
  end_time?: number;
  /** The additional information from an external data source, which is associated with the event or a finding. For example add location information for the IP address in the DNS answers:[{"name": "answers.ip", "value": "92.24.47.250", "type": "location", "data": {"city": "Socotra", "continent": "Asia", "coordinates": [-25.4153, 17.0743], "country": "YE", "desc": "Yemen"}}] */
  enrichments?: EnrichmentType[];
  /** The description of the event/finding, as defined by the source. */
  message?: string;
  /** The metadata associated with the event or a finding. */
  metadata: MetadataType;
  /** The observables associated with the event or a finding. */
  observables?: ObservableType[];
  /** The raw event/finding data as received from the source. */
  raw_data?: string;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
  start_time?: number;
  /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string;
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code?: string;
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail?: string;
  /** The normalized identifier of the event status. */
  status_id?: 0 | 1 | 2 | 99;
  /** The normalized event occurrence time or the finding creation time. */
  time: number;
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset?: number;
  /** The event/finding type name, as defined by the type_uid. */
  type_name?: string;
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: number;
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped?: Record<string, unknown>;
  /** The unique identifier of the email, used to correlate related email alert and activity events. */
  email_uid: string;
  /** The email file attachment. */
  file: FileType;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { File } from '../objects/file.js';

const ACTIVITY_ID_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Send",
  2: "Receive",
  3: "Scan",
  99: "Other",
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

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ACTIVITY_ID_LABELS },
  { idField: "severity_id", labelField: "severity", labels: SEVERITY_ID_LABELS },
  { idField: "status_id", labelField: "status", labels: STATUS_ID_LABELS },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 4,
  classUid: 4011,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

const EmailFileActivitySchema = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]),
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
  enrichments: z.array(Enrichment).optional(),
  /** The description of the event/finding, as defined by the source. */
  message: z.string().optional(),
  /** The metadata associated with the event or a finding. */
  metadata: Metadata,
  /** The observables associated with the event or a finding. */
  observables: z.array(Observable).optional(),
  /** The raw event/finding data as received from the source. */
  raw_data: z.string().optional(),
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size: z.number().int().optional(),
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
  /** The start time of a time period, or the time of the least recent event included in the aggregate event. */
  start_time: z.number().int().optional(),
  /** The event status, normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status: z.string().optional(),
  /** The event status code, as reported by the event source.For example, in a Windows Failed Authentication event, this would be the value of 'Failure Code', e.g. 0x18. */
  status_code: z.string().optional(),
  /** The status detail contains additional information about the event/finding outcome. */
  status_detail: z.string().optional(),
  /** The normalized identifier of the event status. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
  /** The normalized event occurrence time or the finding creation time. */
  time: z.number().int(),
  /** The number of minutes that the reported event time is ahead or behind UTC, in the range -1,080 to +1,080. */
  timezone_offset: z.number().int().optional(),
  /** The event/finding type name, as defined by the type_uid. */
  type_name: z.string().optional(),
  /** The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. */
  type_uid: z.number().int(),
  /** The attributes that are not mapped to the event schema. The names and values of those attributes are specific to the event source. */
  unmapped: z.record(z.string(), z.unknown()).optional(),
  /** The unique identifier of the email, used to correlate related email alert and activity events. */
  email_uid: z.string(),
  /** The email file attachment. */
  file: File,
});

export const EmailFileActivity = {
  parse: (data: unknown): EmailFileActivityType => EmailFileActivitySchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: EmailFileActivityType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return EmailFileActivitySchema.safeParse(preprocessed);
    } catch (error) {
      // Preprocessing error - convert to Zod error format
      return {
        success: false,
        error: new z.ZodError([{
          code: "custom",
          path: [],
          message: error instanceof Error ? error.message : "Preprocessing failed",
        }]),
      };
    }
  },

  schema: EmailFileActivitySchema,
};
