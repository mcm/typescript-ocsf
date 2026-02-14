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
  /** Analyst commentary or source commentary about an indicator or OSINT analysis. */
  comment?: string;
  /** The confidence of an indicator being malicious and/or pertinent, normalized to the caption of the confidence_id value. In the case of 'Other', it is defined by the event source or analyst. */
  confidence?: string;
  /** The normalized confidence refers to the accuracy of collected information related to the OSINT or how pertinent an indicator or analysis is to a specific event or finding. A low confidence means that the information collected or analysis conducted lacked detail or is not accurate enough to qualify an indicator as fully malicious. */
  confidence_id?: 0 | 1 | 2 | 3 | 99;
  /** The campaign object describes details about the campaign that was the source of the activity. */
  campaign?: CampaignType;
  /** Categorizes the threat indicator based on its functional or operational role. */
  category?: string;
  /** The timestamp when the indicator was initially created or identified. */
  created_time?: number;
  /** The identifier of the user, system, or organization that contributed the indicator. */
  creator?: UserType;
  /** A detailed explanation of the indicator, including its context, purpose, and relevance. */
  desc?: string;
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
  /** The specific detection pattern or signature associated with the indicator. */
  detection_pattern?: string;
  /** The detection pattern type, normalized to the caption of the detection_pattern_type_id value. In the case of 'Other', it is defined by the event source. */
  detection_pattern_type?: string;
  /** Specifies the type of detection pattern used to identify the associated threat indicator. */
  detection_pattern_type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
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
  /** Any analytics related to an indicator or OSINT analysis. */
  related_analytics?: AnalyticType[];
  /** Related reputational analysis from third-party engines and analysts for a given indicator or OSINT analysis. */
  reputation?: ReputationType;
  /** A numerical representation of the threat indicator’s risk level. */
  risk_score?: number;
  /** Provides a reference to an external source of information related to the CTI being represented. This may include a URL, a document, or some other type of reference that provides additional context or information about the CTI. */
  references?: string[];
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
  /** The Traffic Light Protocol was created to facilitate greater sharing of potentially sensitive information and more effective collaboration. TLP provides a simple and intuitive schema for indicating with whom potentially sensitive information can be shared. */
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

const OsintSchema: z.ZodType<OsintType> = z.strictObject({
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
  confidence_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The campaign object describes details about the campaign that was the source of the activity. */
  campaign: Campaign.optional(),
  /** Categorizes the threat indicator based on its functional or operational role. */
  category: z.string().optional(),
  /** The timestamp when the indicator was initially created or identified. */
  created_time: z.number().int().optional(),
  /** The identifier of the user, system, or organization that contributed the indicator. */
  creator: User.optional(),
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
  detection_pattern_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
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
  related_analytics: z.array(Analytic).optional(),
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
  /** The Traffic Light Protocol was created to facilitate greater sharing of potentially sensitive information and more effective collaboration. TLP provides a simple and intuitive schema for indicating with whom potentially sensitive information can be shared. */
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
