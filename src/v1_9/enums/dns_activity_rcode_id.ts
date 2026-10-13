/** DnsActivity rcode_id values. */
export const DnsActivityRcodeId = {
  /** No Error. */
  NOERROR: 0,
  /** Format Error. */
  FORMERROR: 1,
  /** Server Failure. */
  SERVERROR: 2,
  /** Non-Existent Domain. */
  NXDOMAIN: 3,
  /** Not Implemented. */
  NOTIMP: 4,
  /** Query Refused. */
  REFUSED: 5,
  /** Name Exists when it should not. */
  YXDOMAIN: 6,
  /** RR Set Exists when it should not. */
  YXRRSET: 7,
  /** RR Set that should exist does not. */
  NXRRSET: 8,
  /** Not Authorized or Server Not Authoritative for zone. */
  NOTAUTH: 9,
  /** Name not contained in zone. */
  NOTZONE: 10,
  /** DSO-TYPE Not Implemented. */
  DSOTYPENI: 11,
  /** Bad EDNS OPT Version. Indicates that the client requested an EDNS version that the server does not support. */
  BADVERS: 16,
  /** Key not recognized. */
  BADKEY: 17,
  /** Signature out of time window. */
  BADTIME: 18,
  /** Bad TKEY Mode. */
  BADMODE: 19,
  /** Duplicate key name. */
  BADNAME: 20,
  /** Algorithm not supported. */
  BADALG: 21,
  /** Bad Truncation. */
  BADTRUNC: 22,
  /** Bad/missing Server Cookie. */
  BADCOOKIE: 23,
  /** The codes deemed to be unassigned by the RFC (unassigned codes: 12-15, 24-3840, 4096-65534). */
  UNASSIGNED: 24,
  /** The codes deemed to be reserved by the RFC (codes: 3841-4095, 65535). */
  RESERVED: 25,
  /** The dns response code is not defined by the RFC. */
  OTHER: 99,
} as const;

export type DnsActivityRcodeId = (typeof DnsActivityRcodeId)[keyof typeof DnsActivityRcodeId];

export const DnsActivityRcodeIdLabels: Record<number, string> = {
  0: "NoError",
  1: "FormError",
  2: "ServError",
  3: "NXDomain",
  4: "NotImp",
  5: "Refused",
  6: "YXDomain",
  7: "YXRRSet",
  8: "NXRRSet",
  9: "NotAuth",
  10: "NotZone",
  11: "DSOTYPENI",
  16: "BADVERS",
  17: "BADKEY",
  18: "BADTIME",
  19: "BADMODE",
  20: "BADNAME",
  21: "BADALG",
  22: "BADTRUNC",
  23: "BADCOOKIE",
  24: "Unassigned",
  25: "Reserved",
  99: "Other",
};

export const DnsActivityRcodeIdByLabel: Record<string, number> = {
  "NoError": 0,
  "FormError": 1,
  "ServError": 2,
  "NXDomain": 3,
  "NotImp": 4,
  "Refused": 5,
  "YXDomain": 6,
  "YXRRSet": 7,
  "NXRRSet": 8,
  "NotAuth": 9,
  "NotZone": 10,
  "DSOTYPENI": 11,
  "BADVERS": 16,
  "BADKEY": 17,
  "BADTIME": 18,
  "BADMODE": 19,
  "BADNAME": 20,
  "BADALG": 21,
  "BADTRUNC": 22,
  "BADCOOKIE": 23,
  "Unassigned": 24,
  "Reserved": 25,
  "Other": 99,
};
