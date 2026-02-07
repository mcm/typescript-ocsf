import { z } from "zod";

import { Analytic, type AnalyticType } from "./analytic.js";
import { Attack, type AttackType } from "./attack.js";
import { AutonomousSystem, type AutonomousSystemType } from "./autonomous_system.js";
import { Campaign, type CampaignType } from "./campaign.js";
import { DigitalSignature, type DigitalSignatureType } from "./digital_signature.js";
import { DnsAnswer, type DnsAnswerType } from "./dns_answer.js";
import { Email, type EmailType } from "./email.js";
import { EmailAuth, type EmailAuthType } from "./email_auth.js";
import { File, type FileType } from "./file.js";
import { KillChainPhase, type KillChainPhaseType } from "./kill_chain_phase.js";
import { Location, type LocationType } from "./location.js";
import { Malware, type MalwareType } from "./malware.js";
import { Reputation, type ReputationType } from "./reputation.js";
import { Script, type ScriptType } from "./script.js";
import { ThreatActor, type ThreatActorType } from "./threat_actor.js";
import { User, type UserType } from "./user.js";
import { Vulnerability, type VulnerabilityType } from "./vulnerability.js";
import { Whois, type WhoisType } from "./whois.js";

/**
 * The OSINT (Open Source Intelligence) object contains details related to an indicator such as the indicator itself, related indicators, geolocation, registrar information, subdomains, analyst commentary, and other contextual information. This information can be used to further enrich a detection or finding by providing decisioning support to other analysts and engineers.
 *
 * OCSF Object: OSINT
 */
export interface OsintType {
  /** Any pertinent DNS answers information related to an indicator or OSINT analysis. */
  answers?: DnsAnswerType[] | undefined;
  /** MITRE ATT&CK Tactics, Techniques, and/or Procedures (TTPs) pertinent to an indicator or OSINT analysis. */
  attacks?: AttackType[] | undefined;
  /** Any pertinent autonomous system information related to an indicator or OSINT analysis. */
  autonomous_system?: AutonomousSystemType | undefined;
  /** Analyst commentary or source commentary about an indicator or OSINT analysis. */
  comment?: string | undefined;
  /** The confidence of an indicator being malicious and/or pertinent, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source or analyst. */
  confidence?: string | undefined;
  /** The normalized confidence refers to the accuracy of collected information related to the OSINT or how pertinent an indicator or analysis is to a specific event or finding. A low confidence means that the information collected or analysis conducted lacked detail or is not accurate enough to qualify an indicator as fully malicious. */
  confidence_id?: number | undefined;
  /** The campaign object describes details about the campaign that was the source of the activity. */
  campaign?: CampaignType | undefined;
  /** Categorizes the threat indicator based on its functional or operational role. */
  category?: string | undefined;
  /** The timestamp when the indicator was initially created or identified. */
  created_time?: number | undefined;
  /** The identifier of the user, system, or organization that contributed the indicator. */
  creator?: UserType | undefined;
  /** A detailed explanation of the indicator, including its context, purpose, and relevance. */
  desc?: string | undefined;
  /** Any email information pertinent to an indicator or OSINT analysis. */
  email?: EmailType | undefined;
  /** Any email authentication information pertinent to an indicator or OSINT analysis. */
  email_auth?: EmailAuthType | undefined;
  /** The expiration date of the indicator, after which it is no longer considered reliable. */
  expiration_time?: number | undefined;
  /** A unique identifier assigned by an external system for cross-referencing. */
  external_uid?: string | undefined;
  /** Any pertinent file information related to an indicator or OSINT analysis. */
  file?: FileType | undefined;
  /** The specific detection pattern or signature associated with the indicator. */
  detection_pattern?: string | undefined;
  /** The detection pattern type, normalized to the caption of the detection_pattern_type_id value. In the case of 'Other', it is defined by the event source. */
  detection_pattern_type?: string | undefined;
  /** Specifies the type of detection pattern used to identify the associated threat indicator. */
  detection_pattern_type_id?: number | undefined;
  /** A grouping of adversarial behaviors and resources believed to be associated with specific threat actors or campaigns. Intrusion sets often encompass multiple campaigns and are used to organize related activities under a common label. */
  intrusion_sets?: string[] | undefined;
  /** Lockheed Martin Kill Chain Phases pertinent to an indicator or OSINT analysis. */
  kill_chain?: KillChainPhaseType[] | undefined;
  /** Tags or keywords associated with the indicator to enhance searchability. */
  labels?: string[] | undefined;
  /** Any pertinent geolocation information related to an indicator or OSINT analysis. */
  location?: LocationType | undefined;
  /** A list of Malware objects, describing details about the identified malware. */
  malware?: MalwareType[] | undefined;
  /** The timestamp of the last modification or update to the indicator. */
  modified_time?: number | undefined;
  /** The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. */
  name?: string | undefined;
  /** Any analytics related to an indicator or OSINT analysis. */
  related_analytics?: AnalyticType[] | undefined;
  /** Related reputational analysis from third-party engines and analysts for a given indicator or OSINT analysis. */
  reputation?: ReputationType | undefined;
  /** A numerical representation of the threat indicator’s risk level. */
  risk_score?: number | undefined;
  /** Provides a reference to an external source of information related to the CTI being represented. This may include a URL, a document, or some other type of reference that provides additional context or information about the CTI. */
  references?: string[] | undefined;
  /** Any pertinent script information related to an indicator or OSINT analysis. */
  script?: ScriptType | undefined;
  /** Represents the severity level of the threat indicator, typically reflecting its potential impact or damage. */
  severity?: string | undefined;
  /** The normalized severity level of the threat indicator, typically reflecting its potential impact or damage. */
  severity_id?: number | undefined;
  /** Any digital signatures or hashes related to an indicator or OSINT analysis. */
  signatures?: DigitalSignatureType[] | undefined;
  /** The source URL of an indicator or OSINT analysis, e.g., a URL back to a TIP, report, or otherwise. */
  src_url?: string | undefined;
  /** Any pertinent subdomain information - such as those generated by a Domain Generation Algorithm - related to an indicator or OSINT analysis. */
  subdomains?: string[] | undefined;
  /** A CIDR or network block related to an indicator or OSINT analysis. */
  subnet?: string | undefined;
  /** A threat actor is an individual or group that conducts malicious cyber activities, often with financial, political, or ideological motives. */
  threat_actor?: ThreatActorType | undefined;
  /** The Traffic Light Protocol was created to facilitate greater sharing of potentially sensitive information and more effective collaboration. TLP provides a simple and intuitive schema for indicating with whom potentially sensitive information can be shared. */
  tlp?: string | undefined;
  /** The OSINT indicator type. */
  type?: string | undefined;
  /** The OSINT indicator type ID. */
  type_id: number;
  /** The unique identifier for the OSINT object. */
  uid?: string | undefined;
  /** The timestamp indicating when the associated indicator or intelligence was added to the system or repository. */
  uploaded_time?: number | undefined;
  /** The actual indicator value in scope, e.g., a SHA-256 hash hexdigest or a domain name. */
  value: string;
  /** The vendor name of a tool which generates intelligence or provides indicators. */
  vendor_name?: string | undefined;
  /** Any vulnerabilities related to an indicator or OSINT analysis. */
  vulnerabilities?: VulnerabilityType[] | undefined;
  /** Any pertinent WHOIS information related to an indicator or OSINT analysis. */
  whois?: WhoisType | undefined;
  [key: string]: unknown;
}

export const Osint: z.ZodType<OsintType> = z
  .object({
    /** Any pertinent DNS answers information related to an indicator or OSINT analysis. */
    answers: z.array(DnsAnswer).optional(),
    /** MITRE ATT&CK Tactics, Techniques, and/or Procedures (TTPs) pertinent to an indicator or OSINT analysis. */
    attacks: z.array(Attack).optional(),
    /** Any pertinent autonomous system information related to an indicator or OSINT analysis. */
    autonomous_system: AutonomousSystem.optional(),
    /** Analyst commentary or source commentary about an indicator or OSINT analysis. */
    comment: z.string().optional(),
    /** The confidence of an indicator being malicious and/or pertinent, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source or analyst. */
    confidence: z.string().optional(),
    /** The normalized confidence refers to the accuracy of collected information related to the OSINT or how pertinent an indicator or analysis is to a specific event or finding. A low confidence means that the information collected or analysis conducted lacked detail or is not accurate enough to qualify an indicator as fully malicious. */
    confidence_id: z.number().int().optional(),
    /** The campaign object describes details about the campaign that was the source of the activity. */
    campaign: Campaign.optional(),
    /** Categorizes the threat indicator based on its functional or operational role. */
    category: z.string().optional(),
    /** The timestamp when the indicator was initially created or identified. */
    created_time: z.number().int().optional(),
    /** The identifier of the user, system, or organization that contributed the indicator. */
    creator: z.lazy(() => User).optional(),
    /** A detailed explanation of the indicator, including its context, purpose, and relevance. */
    desc: z.string().optional(),
    /** Any email information pertinent to an indicator or OSINT analysis. */
    email: Email.optional(),
    /** Any email authentication information pertinent to an indicator or OSINT analysis. */
    email_auth: EmailAuth.optional(),
    /** The expiration date of the indicator, after which it is no longer considered reliable. */
    expiration_time: z.number().int().optional(),
    /** A unique identifier assigned by an external system for cross-referencing. */
    external_uid: z.string().optional(),
    /** Any pertinent file information related to an indicator or OSINT analysis. */
    file: File.optional(),
    /** The specific detection pattern or signature associated with the indicator. */
    detection_pattern: z.string().optional(),
    /** The detection pattern type, normalized to the caption of the detection_pattern_type_id value. In the case of 'Other', it is defined by the event source. */
    detection_pattern_type: z.string().optional(),
    /** Specifies the type of detection pattern used to identify the associated threat indicator. */
    detection_pattern_type_id: z.number().int().optional(),
    /** A grouping of adversarial behaviors and resources believed to be associated with specific threat actors or campaigns. Intrusion sets often encompass multiple campaigns and are used to organize related activities under a common label. */
    intrusion_sets: z.array(z.string()).optional(),
    /** Lockheed Martin Kill Chain Phases pertinent to an indicator or OSINT analysis. */
    kill_chain: z.array(KillChainPhase).optional(),
    /** Tags or keywords associated with the indicator to enhance searchability. */
    labels: z.array(z.string()).optional(),
    /** Any pertinent geolocation information related to an indicator or OSINT analysis. */
    location: Location.optional(),
    /** A list of Malware objects, describing details about the identified malware. */
    malware: z.array(Malware).optional(),
    /** The timestamp of the last modification or update to the indicator. */
    modified_time: z.number().int().optional(),
    /** The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. */
    name: z.string().optional(),
    /** Any analytics related to an indicator or OSINT analysis. */
    related_analytics: z.array(z.lazy(() => Analytic)).optional(),
    /** Related reputational analysis from third-party engines and analysts for a given indicator or OSINT analysis. */
    reputation: Reputation.optional(),
    /** A numerical representation of the threat indicator’s risk level. */
    risk_score: z.number().int().optional(),
    /** Provides a reference to an external source of information related to the CTI being represented. This may include a URL, a document, or some other type of reference that provides additional context or information about the CTI. */
    references: z.array(z.string()).optional(),
    /** Any pertinent script information related to an indicator or OSINT analysis. */
    script: Script.optional(),
    /** Represents the severity level of the threat indicator, typically reflecting its potential impact or damage. */
    severity: z.string().optional(),
    /** The normalized severity level of the threat indicator, typically reflecting its potential impact or damage. */
    severity_id: z.number().int().optional(),
    /** Any digital signatures or hashes related to an indicator or OSINT analysis. */
    signatures: z.array(DigitalSignature).optional(),
    /** The source URL of an indicator or OSINT analysis, e.g., a URL back to a TIP, report, or otherwise. */
    src_url: z.string().optional(),
    /** Any pertinent subdomain information - such as those generated by a Domain Generation Algorithm - related to an indicator or OSINT analysis. */
    subdomains: z.array(z.string()).optional(),
    /** A CIDR or network block related to an indicator or OSINT analysis. */
    subnet: z.string().optional(),
    /** A threat actor is an individual or group that conducts malicious cyber activities, often with financial, political, or ideological motives. */
    threat_actor: ThreatActor.optional(),
    /** The Traffic Light Protocol was created to facilitate greater sharing of potentially sensitive information and more effective collaboration. TLP provides a simple and intuitive schema for indicating with whom potentially sensitive information can be shared. */
    tlp: z.string().optional(),
    /** The OSINT indicator type. */
    type: z.string().optional(),
    /** The OSINT indicator type ID. */
    type_id: z.number().int(),
    /** The unique identifier for the OSINT object. */
    uid: z.string().optional(),
    /** The timestamp indicating when the associated indicator or intelligence was added to the system or repository. */
    uploaded_time: z.number().int().optional(),
    /** The actual indicator value in scope, e.g., a SHA-256 hash hexdigest or a domain name. */
    value: z.string(),
    /** The vendor name of a tool which generates intelligence or provides indicators. */
    vendor_name: z.string().optional(),
    /** Any vulnerabilities related to an indicator or OSINT analysis. */
    vulnerabilities: z.array(Vulnerability).optional(),
    /** Any pertinent WHOIS information related to an indicator or OSINT analysis. */
    whois: Whois.optional(),
  })
  .passthrough() as any;
