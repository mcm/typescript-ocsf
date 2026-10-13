/** DroneFlightsActivity auth_protocol_id values. */
export const DroneFlightsActivityAuthProtocolId = {
  /** The authentication type is unknown. */
  UNKNOWN: 0,
  NONE: 1,
  UAS_ID_SIGNATURE: 2,
  OPERATOR_ID_SIGNATURE: 3,
  MESSAGE_SET_SIGNATURE: 4,
  AUTHENTICATION_PROVIDED_BY_NETWORK_REMOTE_ID: 5,
  SPECIFIC_AUTHENTICATION_METHOD: 6,
  RESERVED: 7,
  PRIVATE_USER: 8,
  /** The authentication type is not mapped. See the <code>auth_protocol</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DroneFlightsActivityAuthProtocolId = (typeof DroneFlightsActivityAuthProtocolId)[keyof typeof DroneFlightsActivityAuthProtocolId];

export const DroneFlightsActivityAuthProtocolIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "None",
  2: "UAS ID Signature",
  3: "Operator ID Signature",
  4: "Message Set Signature",
  5: "Authentication Provided by Network Remote ID",
  6: "Specific Authentication Method",
  7: "Reserved",
  8: "Private User",
  99: "Other",
};

export const DroneFlightsActivityAuthProtocolIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "None": 1,
  "UAS ID Signature": 2,
  "Operator ID Signature": 3,
  "Message Set Signature": 4,
  "Authentication Provided by Network Remote ID": 5,
  "Specific Authentication Method": 6,
  "Reserved": 7,
  "Private User": 8,
  "Other": 99,
};
