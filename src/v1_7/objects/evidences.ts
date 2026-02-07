import { z } from "zod";

import { Actor, type ActorType } from "./actor.js";
import { Api, type ApiType } from "./api.js";
import { Container, type ContainerType } from "./container.js";
import { Database, type DatabaseType } from "./database.js";
import { Databucket, type DatabucketType } from "./databucket.js";
import { Device, type DeviceType } from "./device.js";
import { DnsQuery, type DnsQueryType } from "./dns_query.js";
import { Email, type EmailType } from "./email.js";
import { File, type FileType } from "./file.js";
import { HttpRequest, type HttpRequestType } from "./http_request.js";
import { HttpResponse, type HttpResponseType } from "./http_response.js";
import { Ja4Fingerprint, type Ja4FingerprintType } from "./ja4_fingerprint.js";
import { Job, type JobType } from "./job.js";
import {
  NetworkConnectionInfo,
  type NetworkConnectionInfoType,
} from "./network_connection_info.js";
import { NetworkEndpoint, type NetworkEndpointType } from "./network_endpoint.js";
import { Process, type ProcessType } from "./process.js";
import { ResourceDetails, type ResourceDetailsType } from "./resource_details.js";
import { Script, type ScriptType } from "./script.js";
import { Tls, type TlsType } from "./tls.js";
import { Url, type UrlType } from "./url.js";
import { User, type UserType } from "./user.js";

/**
 * A collection of evidence artifacts associated to the activity/activities that triggered a security detection.
 *
 * OCSF Object: Evidence Artifacts
 */
export interface EvidencesType {
  /** The naming convention or type identifier of the evidence associated with the security detection. For example, the @odata.type from Microsoft Graph Alerts V2 or display_name from CrowdStrike Falcon Incident Behaviors. */
  name?: string | undefined;
  /** The unique identifier of the evidence associated with the security detection. For example, the activity_id from CrowdStrike Falcon Alerts or behavior_id from CrowdStrike Falcon Incident Behaviors. */
  uid?: string | undefined;
  /** Describes details about the user/role/process that was the source of the activity that triggered the detection. */
  actor?: ActorType | undefined;
  /** Describes details about the API call associated to the activity that triggered the detection. */
  api?: ApiType | undefined;
  /** Describes details about the network connection associated to the activity that triggered the detection. */
  connection_info?: NetworkConnectionInfoType | undefined;
  /** Describes details about the container associated to the activity that triggered the detection. */
  container?: ContainerType | undefined;
  /** Additional evidence data that is not accounted for in the specific evidence attributes. Use only when absolutely necessary. */
  data?: Record<string, unknown> | undefined;
  /** Describes details about the database associated to the activity that triggered the detection. */
  database?: DatabaseType | undefined;
  /** Describes details about the databucket associated to the activity that triggered the detection. */
  databucket?: DatabucketType | undefined;
  /** An addressable device, computer system or host associated to the activity that triggered the detection. */
  device?: DeviceType | undefined;
  /** Describes details about the destination of the network activity that triggered the detection. */
  dst_endpoint?: NetworkEndpointType | undefined;
  /** The email object associated to the activity that triggered the detection. */
  email?: EmailType | undefined;
  /** Describes details about the file associated to the activity that triggered the detection. */
  file?: FileType | undefined;
  /** Describes details about the http request associated to the activity that triggered the detection. */
  http_request?: HttpRequestType | undefined;
  /** Describes details about the http response associated to the activity that triggered the detection. */
  http_response?: HttpResponseType | undefined;
  /** Describes details about the JA4+ fingerprints that triggered the detection. */
  ja4_fingerprint_list?: Ja4FingerprintType[] | undefined;
  /** Describes details about the scheduled job that was associated with the activity that triggered the detection. */
  job?: JobType | undefined;
  /** Describes details about the process associated to the activity that triggered the detection. */
  process?: ProcessType | undefined;
  /** Describes details about the DNS query associated to the activity that triggered the detection. */
  query?: DnsQueryType | undefined;
  /** Describes details about the cloud resources directly related to activity that triggered the detection. For resources impacted by the detection, use Affected Resources at the top-level of the finding. */
  resources?: ResourceDetailsType[] | undefined;
  /** Describes details about the script that was associated with the activity that triggered the detection. */
  script?: ScriptType | undefined;
  /** Describes details about the source of the network activity that triggered the detection. */
  src_endpoint?: NetworkEndpointType | undefined;
  /** Describes details about the Transport Layer Security (TLS) activity that triggered the detection. */
  tls?: TlsType | undefined;
  /** The URL object that pertains to the event or object associated to the activity that triggered the detection. */
  url?: UrlType | undefined;
  /** Describes details about the user that was the target or somehow else associated with the activity that triggered the detection. */
  user?: UserType | undefined;
  /** The normalized verdict of the evidence associated with the security detection. */
  verdict?: string | undefined;
  /** The normalized verdict (or status) ID of the evidence associated with the security detection. For example, Microsoft Graph Security Alerts contain a verdict enumeration for each type of evidence associated with the Alert. This is typically set by an automated investigation process or an analyst/investigator assigned to the finding. */
  verdict_id?: number | undefined;
  [key: string]: unknown;
}

export const Evidences: z.ZodType<EvidencesType> = z
  .object({
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
    data: z.record(z.unknown()).optional(),
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
    process: z.lazy(() => Process).optional(),
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
    user: z.lazy(() => User).optional(),
    /** The normalized verdict of the evidence associated with the security detection. */
    verdict: z.string().optional(),
    /** The normalized verdict (or status) ID of the evidence associated with the security detection. For example, Microsoft Graph Security Alerts contain a verdict enumeration for each type of evidence associated with the Alert. This is typically set by an automated investigation process or an analyst/investigator assigned to the finding. */
    verdict_id: z.number().int().optional(),
  })
  .passthrough() as any;
