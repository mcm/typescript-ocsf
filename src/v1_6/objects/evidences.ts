import { z } from 'zod';

import type { ActorType } from './actor.js';
import type { ApiType } from './api.js';
import type { NetworkConnectionInfoType } from './network_connection_info.js';
import type { ContainerType } from './container.js';
import type { DatabaseType } from './database.js';
import type { DatabucketType } from './databucket.js';
import type { DeviceType } from './device.js';
import type { NetworkEndpointType } from './network_endpoint.js';
import type { EmailType } from './email.js';
import type { FileType } from './file.js';
import type { HttpRequestType } from './http_request.js';
import type { HttpResponseType } from './http_response.js';
import type { Ja4FingerprintType } from './ja4_fingerprint.js';
import type { JobType } from './job.js';
import type { ProcessType } from './process.js';
import type { DnsQueryType } from './dns_query.js';
import type { ResourceDetailsType } from './resource_details.js';
import type { ScriptType } from './script.js';
import type { TlsType } from './tls.js';
import type { UrlType } from './url.js';
import type { UserType } from './user.js';

/**
 * A collection of evidence artifacts associated to the activity/activities that triggered a security detection.
 *
 * OCSF Object: Evidence Artifacts
 */
export interface EvidencesType {
  /** The naming convention or type identifier of the evidence associated with the security detection. For example, the @odata.type from Microsoft Graph Alerts V2 or display_name from CrowdStrike Falcon Incident Behaviors. */
  name?: string;
  /** The unique identifier of the evidence associated with the security detection. For example, the activity_id from CrowdStrike Falcon Alerts or behavior_id from CrowdStrike Falcon Incident Behaviors. */
  uid?: string;
  /** Describes details about the user/role/process that was the source of the activity that triggered the detection. */
  actor?: ActorType;
  /** Describes details about the API call associated to the activity that triggered the detection. */
  api?: ApiType;
  /** Describes details about the network connection associated to the activity that triggered the detection. */
  connection_info?: NetworkConnectionInfoType;
  /** Describes details about the container associated to the activity that triggered the detection. */
  container?: ContainerType;
  /** Additional evidence data that is not accounted for in the specific evidence attributes. Use only when absolutely necessary. */
  data?: Record<string, unknown>;
  /** Describes details about the database associated to the activity that triggered the detection. */
  database?: DatabaseType;
  /** Describes details about the databucket associated to the activity that triggered the detection. */
  databucket?: DatabucketType;
  /** An addressable device, computer system or host associated to the activity that triggered the detection. */
  device?: DeviceType;
  /** Describes details about the destination of the network activity that triggered the detection. */
  dst_endpoint?: NetworkEndpointType;
  /** The email object associated to the activity that triggered the detection. */
  email?: EmailType;
  /** Describes details about the file associated to the activity that triggered the detection. */
  file?: FileType;
  /** Describes details about the http request associated to the activity that triggered the detection. */
  http_request?: HttpRequestType;
  /** Describes details about the http response associated to the activity that triggered the detection. */
  http_response?: HttpResponseType;
  /** Describes details about the JA4+ fingerprints that triggered the detection. */
  ja4_fingerprint_list?: Ja4FingerprintType[];
  /** Describes details about the scheduled job that was associated with the activity that triggered the detection. */
  job?: JobType;
  /** Describes details about the process associated to the activity that triggered the detection. */
  process?: ProcessType;
  /** Describes details about the DNS query associated to the activity that triggered the detection. */
  query?: DnsQueryType;
  /** Describes details about the cloud resources directly related to activity that triggered the detection. For resources impacted by the detection, use Affected Resources at the top-level of the finding. */
  resources?: ResourceDetailsType[];
  /** Describes details about the script that was associated with the activity that triggered the detection. */
  script?: ScriptType;
  /** Describes details about the source of the network activity that triggered the detection. */
  src_endpoint?: NetworkEndpointType;
  /** Describes details about the Transport Layer Security (TLS) activity that triggered the detection. */
  tls?: TlsType;
  /** The URL object that pertains to the event or object associated to the activity that triggered the detection. */
  url?: UrlType;
  /** Describes details about the user that was the target or somehow else associated with the activity that triggered the detection. */
  user?: UserType;
  /** The normalized verdict of the evidence associated with the security detection. */
  verdict?: string;
  /** The normalized verdict (or status) ID of the evidence associated with the security detection. For example, Microsoft Graph Security Alerts contain a verdict enumeration for each type of evidence associated with the Alert. This is typically set by an automated investigation process or an analyst/investigator assigned to the finding. */
  verdict_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 99;
}

import { Actor } from './actor.js';
import { Api } from './api.js';
import { NetworkConnectionInfo } from './network_connection_info.js';
import { Container } from './container.js';
import { Database } from './database.js';
import { Databucket } from './databucket.js';
import { Device } from './device.js';
import { NetworkEndpoint } from './network_endpoint.js';
import { Email } from './email.js';
import { File } from './file.js';
import { HttpRequest } from './http_request.js';
import { HttpResponse } from './http_response.js';
import { Ja4Fingerprint } from './ja4_fingerprint.js';
import { Job } from './job.js';
import { Process } from './process.js';
import { DnsQuery } from './dns_query.js';
import { ResourceDetails } from './resource_details.js';
import { Script } from './script.js';
import { Tls } from './tls.js';
import { Url } from './url.js';
import { User } from './user.js';

type EvidencesShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  actor: z.ZodOptional<typeof Actor>;
  api: z.ZodOptional<typeof Api>;
  connection_info: z.ZodOptional<typeof NetworkConnectionInfo>;
  container: z.ZodOptional<typeof Container>;
  data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  database: z.ZodOptional<typeof Database>;
  databucket: z.ZodOptional<typeof Databucket>;
  device: z.ZodOptional<typeof Device>;
  dst_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  email: z.ZodOptional<typeof Email>;
  file: z.ZodOptional<typeof File>;
  http_request: z.ZodOptional<typeof HttpRequest>;
  http_response: z.ZodOptional<typeof HttpResponse>;
  ja4_fingerprint_list: z.ZodOptional<z.ZodArray<typeof Ja4Fingerprint>>;
  job: z.ZodOptional<typeof Job>;
  process: z.ZodOptional<typeof Process>;
  query: z.ZodOptional<typeof DnsQuery>;
  resources: z.ZodOptional<z.ZodArray<typeof ResourceDetails>>;
  script: z.ZodOptional<typeof Script>;
  src_endpoint: z.ZodOptional<typeof NetworkEndpoint>;
  tls: z.ZodOptional<typeof Tls>;
  url: z.ZodOptional<typeof Url>;
  user: z.ZodOptional<typeof User>;
  verdict: z.ZodOptional<z.ZodString>;
  verdict_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<99>]>>;
};

const EvidencesSchema: z.ZodObject<EvidencesShape, z.core.$strict> = z.strictObject({
  /** The naming convention or type identifier of the evidence associated with the security detection. For example, the @odata.type from Microsoft Graph Alerts V2 or display_name from CrowdStrike Falcon Incident Behaviors. */
  name: z.string().optional(),
  /** The unique identifier of the evidence associated with the security detection. For example, the activity_id from CrowdStrike Falcon Alerts or behavior_id from CrowdStrike Falcon Incident Behaviors. */
  uid: z.string().optional(),
  /** Describes details about the user/role/process that was the source of the activity that triggered the detection. */
  actor: Actor.optional(),
  /** Describes details about the API call associated to the activity that triggered the detection. */
  api: Api.optional(),
  /** Describes details about the network connection associated to the activity that triggered the detection. */
  connection_info: NetworkConnectionInfo.optional(),
  /** Describes details about the container associated to the activity that triggered the detection. */
  container: Container.optional(),
  /** Additional evidence data that is not accounted for in the specific evidence attributes. Use only when absolutely necessary. */
  data: z.record(z.string(), z.unknown()).optional(),
  /** Describes details about the database associated to the activity that triggered the detection. */
  database: Database.optional(),
  /** Describes details about the databucket associated to the activity that triggered the detection. */
  databucket: Databucket.optional(),
  /** An addressable device, computer system or host associated to the activity that triggered the detection. */
  device: Device.optional(),
  /** Describes details about the destination of the network activity that triggered the detection. */
  dst_endpoint: NetworkEndpoint.optional(),
  /** The email object associated to the activity that triggered the detection. */
  email: Email.optional(),
  /** Describes details about the file associated to the activity that triggered the detection. */
  file: File.optional(),
  /** Describes details about the http request associated to the activity that triggered the detection. */
  http_request: HttpRequest.optional(),
  /** Describes details about the http response associated to the activity that triggered the detection. */
  http_response: HttpResponse.optional(),
  /** Describes details about the JA4+ fingerprints that triggered the detection. */
  ja4_fingerprint_list: z.array(Ja4Fingerprint).optional(),
  /** Describes details about the scheduled job that was associated with the activity that triggered the detection. */
  job: Job.optional(),
  /** Describes details about the process associated to the activity that triggered the detection. */
  process: Process.optional(),
  /** Describes details about the DNS query associated to the activity that triggered the detection. */
  query: DnsQuery.optional(),
  /** Describes details about the cloud resources directly related to activity that triggered the detection. For resources impacted by the detection, use Affected Resources at the top-level of the finding. */
  resources: z.array(ResourceDetails).optional(),
  /** Describes details about the script that was associated with the activity that triggered the detection. */
  script: Script.optional(),
  /** Describes details about the source of the network activity that triggered the detection. */
  src_endpoint: NetworkEndpoint.optional(),
  /** Describes details about the Transport Layer Security (TLS) activity that triggered the detection. */
  tls: Tls.optional(),
  /** The URL object that pertains to the event or object associated to the activity that triggered the detection. */
  url: Url.optional(),
  /** Describes details about the user that was the target or somehow else associated with the activity that triggered the detection. */
  user: User.optional(),
  /** The normalized verdict of the evidence associated with the security detection. */
  verdict: z.string().optional(),
  /** The normalized verdict (or status) ID of the evidence associated with the security detection. For example, Microsoft Graph Security Alerts contain a verdict enumeration for each type of evidence associated with the Alert. This is typically set by an automated investigation process or an analyst/investigator assigned to the finding. */
  verdict_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(99)]).optional(),
});

export const Evidences = EvidencesSchema;

/** Value → label mappings for each enum field of Evidences. */
export const EvidencesLabels: Readonly<Record<"verdict_id", Readonly<Record<number, string>>>> = {
  verdict_id: {
    0: "Unknown",
    1: "False Positive",
    2: "True Positive",
    3: "Disregard",
    4: "Suspicious",
    5: "Benign",
    6: "Test",
    7: "Insufficient Data",
    8: "Security Risk",
    9: "Managed Externally",
    10: "Duplicate",
    99: "Other",
  },
};
