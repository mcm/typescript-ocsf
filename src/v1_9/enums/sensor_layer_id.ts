/** Sensor Layer ID values. */
export const SensorLayerId = {
  /** The sensor layer type is Unknown. */
  UNKNOWN: 0,
  /** The analyzed data is emitted by, or originates from a network, firewall, or IPS sensor. */
  NETWORK: 1,
  /** The analyzed data is emitted by, or originates from an endpoint device or agent running on an OS. */
  ENDPOINT: 2,
  /** The analyzed data is emitted by, or originates from an email gateway or email security system. */
  EMAIL: 3,
  /** The analyzed data is emitted by, or originates from an identity and access management (IAM) system or service. */
  IAM: 4,
  /** The analyzed data is emitted by, or originates from a proxy server (e.g., forward or reverse proxy, web gateway). */
  PROXY: 5,
  /** The analyzed data is emitted by, or originates from a cyber threat intelligence (CTI) system or by matching observables against a threat intelligence feed or report. */
  THREAT_INTEL: 6,
  /** The analyzed data is emitted by, or originates from an application (e.g., web application, SaaS platform, or custom business application). */
  APPLICATION: 7,
  /** The sensor layer type is not mapped. See the <code>sensor_layer</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type SensorLayerId = (typeof SensorLayerId)[keyof typeof SensorLayerId];

/** Label mapping for SensorLayerId values. */
export const SensorLayerIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Network",
  2: "Endpoint",
  3: "Email",
  4: "IAM",
  5: "Proxy",
  6: "Threat Intel",
  7: "Application",
  99: "Other",
};

/** Reverse mapping from label to SensorLayerId value. */
export const SensorLayerIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Network": 1,
  "Endpoint": 2,
  "Email": 3,
  "IAM": 4,
  "Proxy": 5,
  "Threat Intel": 6,
  "Application": 7,
  "Other": 99,
};
