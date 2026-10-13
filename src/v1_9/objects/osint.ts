import { z } from 'zod';

import type { DnsAnswerType } from './dns_answer.js';
import type { AttackType } from './attack.js';
import type { AutonomousSystemType } from './autonomous_system.js';
import type { CampaignType } from './campaign.js';
import type { UserType } from './user.js';
import type { EmailType } from './email.js';
import type { EmailAuthType } from './email_auth.js';
import type { FileType } from './file.js';
import type { KillChainPhaseType } from './kill_chain_phase.js';
import type { LocationType } from './location.js';
import type { MalwareType } from './malware.js';
import type { AnalyticType } from './analytic.js';
import type { ReputationType } from './reputation.js';
import type { ScriptType } from './script.js';
import type { DigitalSignatureType } from './digital_signature.js';
import type { ThreatActorType } from './threat_actor.js';
import type { VulnerabilityType } from './vulnerability.js';
import type { WhoisType } from './whois.js';

/**
 * The OSINT (Open Source Intelligence) object contains details related to an indicator such as the indicator itself, related indicators, geolocation, registrar information, subdomains, analyst commentary, and other contextual information. This information can be used to further enrich a detection or finding by providing decisioning support to other analysts and engineers.
 *
 * OCSF Object: OSINT
 */
export interface OsintType {
  /** Any pertinent DNS answers information related to an indicator or OSINT analysis. */
  answers?: DnsAnswerType[];
  /** MITRE ATT&CK Tactics, Techniques, and/or Procedures (TTPs) pertinent to an indicator or OSINT analysis. */
  attacks?: AttackType[];
  /** Any pertinent autonomous system information related to an indicator or OSINT analysis. */
  autonomous_system?: AutonomousSystemType;
  /** The campaign object describes details about the campaign that was the source of the activity. */
  campaign?: CampaignType;
  /** Categorizes the threat indicator based on its functional or operational role. */
  category?: string;
  /** Analyst commentary or source commentary about an indicator or OSINT analysis. */
  comment?: string;
  /** The confidence of an indicator or analysis, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source or analyst. */
  confidence?: string;
  /** The normalized identifier of the confidence level, reflecting the accuracy or pertinence of the OSINT indicator or analysis. A low confidence indicates that the collected information lacked sufficient detail or accuracy to fully qualify the indicator as malicious. When the value is 99 (Other), the confidence attribute must contain the source-specific label. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The timestamp when the indicator was initially created or identified. */
  created_time?: number;
  /** The identifier of the user, system, or organization that contributed the indicator. */
  creator?: UserType;
  /** A detailed explanation of the indicator, including its context, purpose, and relevance. */
  desc?: string;
  /** The specific detection pattern or signature associated with the indicator. */
  detection_pattern?: string;
  /** The detection pattern type, normalized to the caption of the detection_pattern_type_id value. In the case of 'Other', it is defined by the event source. */
  detection_pattern_type?: string;
  /** Specifies the type of detection pattern used to identify the associated threat indicator. */
  detection_pattern_type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** Any email information pertinent to an indicator or OSINT analysis. */
  email?: EmailType;
  /** Any email authentication information pertinent to an indicator or OSINT analysis. */
  email_auth?: EmailAuthType;
  /** The expiration date of the indicator, after which it is no longer considered reliable. */
  expiration_time?: number;
  /** A unique identifier assigned by an external system for cross-referencing. */
  external_uid?: string;
  /** Any pertinent file information related to an indicator or OSINT analysis. */
  file?: FileType;
  /** A grouping of adversarial behaviors and resources believed to be associated with specific threat actors or campaigns. Intrusion sets often encompass multiple campaigns and are used to organize related activities under a common label. */
  intrusion_sets?: string[];
  /** Lockheed Martin Kill Chain Phases pertinent to an indicator or OSINT analysis. */
  kill_chain?: KillChainPhaseType[];
  /** Tags or keywords associated with the indicator to enhance searchability. */
  labels?: string[];
  /** Any pertinent geolocation information related to an indicator or OSINT analysis. */
  location?: LocationType;
  /** A list of Malware objects, describing details about the identified malware. */
  malware?: MalwareType[];
  /** The timestamp of the last modification or update to the indicator. */
  modified_time?: number;
  /** The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. */
  name?: string;
  /** Provides a reference to an external source of information related to the CTI being represented. This may include a URL, a document, or some other type of reference that provides additional context or information about the CTI. */
  references?: string[];
  /** Any analytics related to an indicator or OSINT analysis. */
  related_analytics?: AnalyticType[];
  /** Related reputational analysis from third-party engines and analysts for a given indicator or OSINT analysis. */
  reputation?: ReputationType;
  /** A numerical representation of the threat indicator’s risk level. */
  risk_score?: number;
  /** Any pertinent script information related to an indicator or OSINT analysis. */
  script?: ScriptType;
  /** Represents the severity level of the threat indicator, typically reflecting its potential impact or damage. */
  severity?: string;
  /** The normalized severity level of the threat indicator, typically reflecting its potential impact or damage. */
  severity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** Any digital signatures or hashes related to an indicator or OSINT analysis. */
  signatures?: DigitalSignatureType[];
  /** The source URL of an indicator or OSINT analysis, e.g., a URL back to a TIP, report, or otherwise. */
  src_url?: string;
  /** Any pertinent subdomain information - such as those generated by a Domain Generation Algorithm - related to an indicator or OSINT analysis. */
  subdomains?: string[];
  /** A CIDR or network block related to an indicator or OSINT analysis. */
  subnet?: string;
  /** A threat actor is an individual or group that conducts malicious cyber activities, often with financial, political, or ideological motives. */
  threat_actor?: ThreatActorType;
  /** The Traffic Light Protocol (TLP) was created to facilitate greater sharing of potentially sensitive information and more effective collaboration. TLP provides a simple and intuitive schema for indicating with whom potentially sensitive information can be shared. */
  tlp?: string;
  /** The OSINT indicator type. */
  type?: string;
  /** The OSINT indicator type ID. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 99;
  /** The unique identifier for the OSINT object. */
  uid?: string;
  /** The timestamp indicating when the associated indicator or intelligence was added to the system or repository. */
  uploaded_time?: number;
  /** The actual indicator value in scope, e.g., a SHA-256 hash hexdigest or a domain name. */
  value: string;
  /** The vendor name of a tool which generates intelligence or provides indicators. */
  vendor_name?: string;
  /** Any vulnerabilities related to an indicator or OSINT analysis. */
  vulnerabilities?: VulnerabilityType[];
  /** Any pertinent WHOIS information related to an indicator or OSINT analysis. */
  whois?: WhoisType;
}

import { DnsAnswer } from './dns_answer.js';
import { Attack } from './attack.js';
import { AutonomousSystem } from './autonomous_system.js';
import { Campaign } from './campaign.js';
import { User } from './user.js';
import { Email } from './email.js';
import { EmailAuth } from './email_auth.js';
import { File } from './file.js';
import { KillChainPhase } from './kill_chain_phase.js';
import { Location } from './location.js';
import { Malware } from './malware.js';
import { Analytic } from './analytic.js';
import { Reputation } from './reputation.js';
import { Script } from './script.js';
import { DigitalSignature } from './digital_signature.js';
import { ThreatActor } from './threat_actor.js';
import { Vulnerability } from './vulnerability.js';
import { Whois } from './whois.js';

type OsintShape = {
  answers: z.ZodOptional<z.ZodArray<typeof DnsAnswer>>;
  attacks: z.ZodOptional<z.ZodArray<typeof Attack>>;
  autonomous_system: z.ZodOptional<typeof AutonomousSystem>;
  campaign: z.ZodOptional<typeof Campaign>;
  category: z.ZodOptional<z.ZodString>;
  comment: z.ZodOptional<z.ZodString>;
  confidence: z.ZodOptional<z.ZodString>;
  confidence_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  created_time: z.ZodOptional<z.ZodNumber>;
  creator: z.ZodOptional<typeof User>;
  desc: z.ZodOptional<z.ZodString>;
  detection_pattern: z.ZodOptional<z.ZodString>;
  detection_pattern_type: z.ZodOptional<z.ZodString>;
  detection_pattern_type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  email: z.ZodOptional<typeof Email>;
  email_auth: z.ZodOptional<typeof EmailAuth>;
  expiration_time: z.ZodOptional<z.ZodNumber>;
  external_uid: z.ZodOptional<z.ZodString>;
  file: z.ZodOptional<typeof File>;
  intrusion_sets: z.ZodOptional<z.ZodArray<z.ZodString>>;
  kill_chain: z.ZodOptional<z.ZodArray<typeof KillChainPhase>>;
  labels: z.ZodOptional<z.ZodArray<z.ZodString>>;
  location: z.ZodOptional<typeof Location>;
  malware: z.ZodOptional<z.ZodArray<typeof Malware>>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  name: z.ZodOptional<z.ZodString>;
  references: z.ZodOptional<z.ZodArray<z.ZodString>>;
  related_analytics: z.ZodOptional<z.ZodArray<typeof Analytic>>;
  reputation: z.ZodOptional<typeof Reputation>;
  risk_score: z.ZodOptional<z.ZodNumber>;
  script: z.ZodOptional<typeof Script>;
  severity: z.ZodOptional<z.ZodString>;
  severity_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  signatures: z.ZodOptional<z.ZodArray<typeof DigitalSignature>>;
  src_url: z.ZodOptional<z.ZodString>;
  subdomains: z.ZodOptional<z.ZodArray<z.ZodString>>;
  subnet: z.ZodOptional<z.ZodString>;
  threat_actor: z.ZodOptional<typeof ThreatActor>;
  tlp: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<99>]>;
  uid: z.ZodOptional<z.ZodString>;
  uploaded_time: z.ZodOptional<z.ZodNumber>;
  value: z.ZodString;
  vendor_name: z.ZodOptional<z.ZodString>;
  vulnerabilities: z.ZodOptional<z.ZodArray<typeof Vulnerability>>;
  whois: z.ZodOptional<typeof Whois>;
};

const OsintSchema: z.ZodObject<OsintShape, z.core.$strict> = z.strictObject({
  /** Any pertinent DNS answers information related to an indicator or OSINT analysis. */
  answers: z.array(DnsAnswer).optional(),
  /** MITRE ATT&CK Tactics, Techniques, and/or Procedures (TTPs) pertinent to an indicator or OSINT analysis. */
  attacks: z.array(Attack).optional(),
  /** Any pertinent autonomous system information related to an indicator or OSINT analysis. */
  autonomous_system: AutonomousSystem.optional(),
  /** The campaign object describes details about the campaign that was the source of the activity. */
  campaign: Campaign.optional(),
  /** Categorizes the threat indicator based on its functional or operational role. */
  category: z.string().optional(),
  /** Analyst commentary or source commentary about an indicator or OSINT analysis. */
  comment: z.string().optional(),
  /** The confidence of an indicator or analysis, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source or analyst. */
  confidence: z.string().optional(),
  /** The normalized identifier of the confidence level, reflecting the accuracy or pertinence of the OSINT indicator or analysis. A low confidence indicates that the collected information lacked sufficient detail or accuracy to fully qualify the indicator as malicious. When the value is 99 (Other), the confidence attribute must contain the source-specific label. */
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The timestamp when the indicator was initially created or identified. */
  created_time: z.number().int().optional(),
  /** The identifier of the user, system, or organization that contributed the indicator. */
  creator: User.optional(),
  /** A detailed explanation of the indicator, including its context, purpose, and relevance. */
  desc: z.string().optional(),
  /** The specific detection pattern or signature associated with the indicator. */
  detection_pattern: z.string().optional(),
  /** The detection pattern type, normalized to the caption of the detection_pattern_type_id value. In the case of 'Other', it is defined by the event source. */
  detection_pattern_type: z.string().optional(),
  /** Specifies the type of detection pattern used to identify the associated threat indicator. */
  detection_pattern_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
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
  /** Provides a reference to an external source of information related to the CTI being represented. This may include a URL, a document, or some other type of reference that provides additional context or information about the CTI. */
  references: z.array(z.string()).optional(),
  /** Any analytics related to an indicator or OSINT analysis. */
  related_analytics: z.array(Analytic).optional(),
  /** Related reputational analysis from third-party engines and analysts for a given indicator or OSINT analysis. */
  reputation: Reputation.optional(),
  /** A numerical representation of the threat indicator’s risk level. */
  risk_score: z.number().int().optional(),
  /** Any pertinent script information related to an indicator or OSINT analysis. */
  script: Script.optional(),
  /** Represents the severity level of the threat indicator, typically reflecting its potential impact or damage. */
  severity: z.string().optional(),
  /** The normalized severity level of the threat indicator, typically reflecting its potential impact or damage. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
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
  /** The Traffic Light Protocol (TLP) was created to facilitate greater sharing of potentially sensitive information and more effective collaboration. TLP provides a simple and intuitive schema for indicating with whom potentially sensitive information can be shared. */
  tlp: z.string().optional(),
  /** The OSINT indicator type. */
  type: z.string().optional(),
  /** The OSINT indicator type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(99)]),
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
});

export const Osint = OsintSchema;

/** Value → label mappings for each enum field of Osint. */
export const OsintLabels: Readonly<Record<"confidence_id" | "detection_pattern_type_id" | "severity_id" | "type_id", Readonly<Record<number, string>>>> = {
  confidence_id: {
    0: "Unknown",
    1: "Low",
    2: "Medium",
    3: "High",
    99: "Other",
  },
  detection_pattern_type_id: {
    0: "Unknown",
    1: "STIX",
    2: "PCRE",
    3: "SIGMA",
    4: "Snort",
    5: "Suricata",
    6: "YARA",
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
  type_id: {
    0: "Unknown",
    1: "IP Address",
    2: "Domain",
    3: "Hostname",
    4: "Hash",
    5: "URL",
    6: "User Agent",
    7: "Digital Certificate",
    8: "Email",
    9: "Email Address",
    10: "Vulnerability",
    11: "File",
    12: "Registry Key",
    13: "Registry Value",
    14: "Command Line",
    99: "Other",
  },
};
