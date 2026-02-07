/** Detection System ID values. */
export const DetectionSystemId = {
  /** The type is not mapped. See the <code>detection_system</code> attribute, which contains a data source specific value. */
  UNKNOWN: 0,
  /** A dedicated agent or sensor installed on a device, either a dedicated data security tool or an Endpoint Detection & Response (EDR) tool that can detect sensitive data and/or enforce data security policies. E.g., Forcepoint DLP, Symantec DLP, Microsoft Defender for Endpoint (MDE). */
  ENDPOINT: 1,
  /** A Data Loss Prevention (DLP) gateway that is positioned in-line of an information store such as a network share, a database, or otherwise that can detect sensitive data and/or enforce data security policies. */
  DLP_GATEWAY: 2,
  /** A Mobile Device Management (MDM) or Enterprise Mobility Management (EMM) tool that can detect sensitive data and/or enforce data security policies on mobile devices (e.g., cellphones, tablets, End User Devices [EUDs]). */
  MOBILE_DEVICE_MANAGEMENT: 3,
  /** A tool that actively identifies and classifies sensitive data in digital media and information stores in accordance with a policy or automated functionality. E.g, Amazon Macie, Microsoft Purview. */
  DATA_DISCOVERY_CLASSIFICATION: 4,
  /** A Secure Web Gateway (SWG) is any tool that can detect sensitive data and/or enforce data security policies at a network-edge such as within a proxy or firewall service. */
  SECURE_WEB_GATEWAY: 5,
  /** A Secure Email Gateway (SEG) is any tool that can detect sensitive data and/or enforce data security policies within email systems. E.g., Microsoft Defender for Office, Google Workspaces. */
  SECURE_EMAIL_GATEWAY: 6,
  /** A Digital Rights Management (DRM) or a dedicated Information Rights Management (IRM) are tools which can detect sensitive data and/or enforce data security policies on digital media via policy or user access rights. */
  DIGITAL_RIGHTS_MANAGEMENT: 7,
  /** A Cloud Access Security Broker (CASB) that can detect sensitive data and/or enforce data security policies in-line to cloud systems such as the public cloud or Software-as-a-Service (SaaS) tool. E.g., Forcepoint CASB, SkyHigh Security. */
  CLOUD_ACCESS_SECURITY_BROKER: 8,
  /** A Database Activity Monitoring (DAM) tool that can detect sensitive data and/or enforce data security policies as part of a dedicated database or warehouse monitoring solution. */
  DATABASE_ACTIVITY_MONITORING: 9,
  /** A built in Data Loss Prevention (DLP) or other data security capability within a tool or platform such as an Enterprise Resource Planning (ERP) or Customer Relations Management (CRM) tool that can detect sensitive data and/or enforce data security policies. */
  APPLICATION_LEVEL_DLP: 10,
  /** Any Developer Security tool such as an Infrastructure-as-Code (IAC) security scanner, Secrets Detection, or Secure Software Development Lifecycle (SSDLC) tool that can detect sensitive data and/or enforce data security policies. E.g., TruffleHog, GitGuardian, Git-Secrets. */
  DEVELOPER_SECURITY: 11,
  /** A Data Security Posture Management (DSPM) tool is a continuous monitoring and data discovery solution that can detect sensitive data and/or enforce data security policies for local and cloud environments. E.g., Cyera, Sentra, IBM Polar Security. */
  DATA_SECURITY_POSTURE_MANAGEMENT: 12,
  /** Any other type of detection system or a multi-variate system made up of several other systems. */
  OTHER: 99,
} as const;

export type DetectionSystemId = (typeof DetectionSystemId)[keyof typeof DetectionSystemId];

/** Label mapping for DetectionSystemId values. */
export const DetectionSystemIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Endpoint",
  2: "DLP Gateway",
  3: "Mobile Device Management",
  4: "Data Discovery & Classification",
  5: "Secure Web Gateway",
  6: "Secure Email Gateway",
  7: "Digital Rights Management",
  8: "Cloud Access Security Broker",
  9: "Database Activity Monitoring",
  10: "Application-Level DLP",
  11: "Developer Security",
  12: "Data Security Posture Management",
  99: "Other",
};
