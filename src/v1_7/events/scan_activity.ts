import { z } from 'zod';
import { reconcileSiblings, type SiblingPair } from '../../sibling.js';
import { prefillUids, type UidConfig } from '../../uid.js';

import type { EnrichmentType } from '../objects/enrichment.js';
import type { MetadataType } from '../objects/metadata.js';
import type { ObservableType } from '../objects/observable.js';
import type { FingerprintType } from '../objects/fingerprint.js';
import type { PolicyType } from '../objects/policy.js';
import type { ScanType } from '../objects/scan.js';

import { ScanActivityActivityId } from '../enums/scan_activity_activity_id.js';
import { SeverityId } from '../enums/index.js';
import { StatusId } from '../enums/index.js';

/**
 * Scan events report the start, completion, and results of a scan job. The scan event includes the number of items that were scanned and the number of detections that were resolved.
 *
 * OCSF Class UID: 6007
 * Category: Scan Activity
 * @see https://schema.ocsf.io/1.7.0/classes/scan_activity
 */
export interface ScanActivityType {
  /** The normalized identifier of the activity that triggered the event. */
  activity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
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
  /** The duration of the scan */
  duration?: number;
  /** The end time of the scan job. */
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
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash?: FingerprintType;
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size?: number;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The start time of the scan job. */
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
  /** The command identifier that is associated with this scan event. This ID uniquely identifies the proactive scan command, e.g., if remotely initiated. */
  command_uid?: string;
  /** The number of detections. */
  num_detections?: number;
  /** The number of files scanned. */
  num_files?: number;
  /** The number of folders scanned. */
  num_folders?: number;
  /** The number of network items scanned. */
  num_network_items?: number;
  /** The number of processes scanned. */
  num_processes?: number;
  /** The number of registry items scanned. */
  num_registry_items?: number;
  /** The number of items that were resolved. */
  num_resolutions?: number;
  /** The number of skipped items. */
  num_skipped_items?: number;
  /** The number of trusted items. */
  num_trusted_items?: number;
  /** The policy associated with this Scan event; required if the scan was initiated by a policy. */
  policy?: PolicyType;
  /** The Scan object describes characteristics of the scan job. */
  scan: ScanType;
  /** The unique identifier of the schedule associated with a scan job. */
  schedule_uid?: string;
  /** The total number of items that were scanned; zero if no items were scanned. */
  total?: number;
}

import { Enrichment } from '../objects/enrichment.js';
import { Metadata } from '../objects/metadata.js';
import { Observable } from '../objects/observable.js';
import { Fingerprint } from '../objects/fingerprint.js';
import { Policy } from '../objects/policy.js';
import { Scan } from '../objects/scan.js';

/** Value → label mappings for each enum field of ScanActivity. */
export const ScanActivityLabels: Readonly<Record<"activity_id" | "severity_id" | "status_id", Readonly<Record<number, string>>>> = {
  activity_id: {
    0: "Unknown",
    1: "Started",
    2: "Completed",
    3: "Cancelled",
    4: "Duration Violation",
    5: "Pause Violation",
    6: "Error",
    7: "Paused",
    8: "Resumed",
    9: "Restarted",
    10: "Delayed",
    99: "Other",
  },
  severity_id: {
    0: "Unknown",
    1: "Informational",
    2: "Low",
    3: "Medium",
    4: "High",
    5: "Critical",
    6: "Fatal",
    99: "Other",
  },
  status_id: {
    0: "Unknown",
    1: "Success",
    2: "Failure",
    99: "Other",
  },
};

const SIBLING_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity_name", labels: ScanActivityLabels.activity_id },
  { idField: "severity_id", labelField: "severity", labels: ScanActivityLabels.severity_id },
  { idField: "status_id", labelField: "status", labels: ScanActivityLabels.status_id },
];

const UID_CONFIG: UidConfig = {
  categoryUid: 6,
  classUid: 6007,
};

function preprocess(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  let d = { ...data } as Record<string, unknown>;
  d = reconcileSiblings(d, SIBLING_PAIRS);
  d = prefillUids(d, UID_CONFIG);
  return d;
}

type ScanActivityShape = {
  activity_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<99>]>>;
  activity_name: z.ZodOptional<z.ZodString>;
  category_name: z.ZodOptional<z.ZodString>;
  category_uid: z.ZodNumber;
  class_name: z.ZodOptional<z.ZodString>;
  class_uid: z.ZodNumber;
  count: z.ZodOptional<z.ZodNumber>;
  duration: z.ZodOptional<z.ZodNumber>;
  end_time: z.ZodOptional<z.ZodNumber>;
  enrichments: z.ZodOptional<z.ZodArray<typeof Enrichment>>;
  message: z.ZodOptional<z.ZodString>;
  metadata: typeof Metadata;
  observables: z.ZodOptional<z.ZodArray<typeof Observable>>;
  raw_data: z.ZodOptional<z.ZodString>;
  raw_data_hash: z.ZodOptional<typeof Fingerprint>;
  raw_data_size: z.ZodOptional<z.ZodNumber>;
  severity: z.ZodOptional<z.ZodString>;
  severity_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>;
  start_time: z.ZodOptional<z.ZodNumber>;
  status: z.ZodOptional<z.ZodString>;
  status_code: z.ZodOptional<z.ZodString>;
  status_detail: z.ZodOptional<z.ZodString>;
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>>;
  time: z.ZodNumber;
  timezone_offset: z.ZodOptional<z.ZodNumber>;
  type_name: z.ZodOptional<z.ZodString>;
  type_uid: z.ZodNumber;
  unmapped: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  command_uid: z.ZodOptional<z.ZodString>;
  num_detections: z.ZodOptional<z.ZodNumber>;
  num_files: z.ZodOptional<z.ZodNumber>;
  num_folders: z.ZodOptional<z.ZodNumber>;
  num_network_items: z.ZodOptional<z.ZodNumber>;
  num_processes: z.ZodOptional<z.ZodNumber>;
  num_registry_items: z.ZodOptional<z.ZodNumber>;
  num_resolutions: z.ZodOptional<z.ZodNumber>;
  num_skipped_items: z.ZodOptional<z.ZodNumber>;
  num_trusted_items: z.ZodOptional<z.ZodNumber>;
  policy: z.ZodOptional<typeof Policy>;
  scan: typeof Scan;
  schedule_uid: z.ZodOptional<z.ZodString>;
  total: z.ZodOptional<z.ZodNumber>;
};

const ScanActivitySchema: z.ZodObject<ScanActivityShape, z.core.$strict> = z.strictObject({
  /** The normalized identifier of the activity that triggered the event. */
  activity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]).optional(),
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
  /** The duration of the scan */
  duration: z.number().int().optional(),
  /** The end time of the scan job. */
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
  /** The hash, which describes the content of the raw_data field. */
  raw_data_hash: Fingerprint.optional(),
  /** The size of the raw data which was transformed into an OCSF event, in bytes. */
  raw_data_size: z.number().int().optional(),
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]),
  /** The start time of the scan job. */
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
  /** The command identifier that is associated with this scan event. This ID uniquely identifies the proactive scan command, e.g., if remotely initiated. */
  command_uid: z.string().optional(),
  /** The number of detections. */
  num_detections: z.number().int().optional(),
  /** The number of files scanned. */
  num_files: z.number().int().optional(),
  /** The number of folders scanned. */
  num_folders: z.number().int().optional(),
  /** The number of network items scanned. */
  num_network_items: z.number().int().optional(),
  /** The number of processes scanned. */
  num_processes: z.number().int().optional(),
  /** The number of registry items scanned. */
  num_registry_items: z.number().int().optional(),
  /** The number of items that were resolved. */
  num_resolutions: z.number().int().optional(),
  /** The number of skipped items. */
  num_skipped_items: z.number().int().optional(),
  /** The number of trusted items. */
  num_trusted_items: z.number().int().optional(),
  /** The policy associated with this Scan event; required if the scan was initiated by a policy. */
  policy: Policy.optional(),
  /** The Scan object describes characteristics of the scan job. */
  scan: Scan,
  /** The unique identifier of the schedule associated with a scan job. */
  schedule_uid: z.string().optional(),
  /** The total number of items that were scanned; zero if no items were scanned. */
  total: z.number().int().optional(),
});

export const ScanActivity = {
  parse: (data: unknown): ScanActivityType => ScanActivitySchema.parse(preprocess(data)),

  safeParse: (data: unknown): { success: true; data: ScanActivityType } | { success: false; error: z.ZodError } => {
    try {
      const preprocessed = preprocess(data);
      return ScanActivitySchema.safeParse(preprocessed);
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

  schema: ScanActivitySchema,

  // Value → label maps for every enum field
  labels: ScanActivityLabels,

  // Static enum references for convenience
  ActivityId: ScanActivityActivityId,
  SeverityId: SeverityId,
  StatusId: StatusId,
} as const;
