/** DNS Opcode ID values. */
export const OpcodeId = {
  /** Standard query */
  QUERY: 0,
  /** Inverse query, obsolete */
  INVERSE_QUERY: 1,
  /** Server status request */
  STATUS: 2,
  /** Reserved, not used */
  RESERVED: 3,
  /** Zone change notification */
  NOTIFY: 4,
  /** Dynamic DNS update */
  UPDATE: 5,
  /** DNS Stateful Operations (DSO) */
  DSO_MESSAGE: 6,
  /** The DNS Opcode is not defined by the RFC. See the <code>opcode</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type OpcodeId = (typeof OpcodeId)[keyof typeof OpcodeId];

/** Label mapping for OpcodeId values. */
export const OpcodeIdLabels: Record<number, string> = {
  0: "Query",
  1: "Inverse Query",
  2: "Status",
  3: "Reserved",
  4: "Notify",
  5: "Update",
  6: "DSO Message",
  99: "Other",
};
