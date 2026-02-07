/** Query Type ID values. */
export const QueryTypeId = {
  /** The query type was unknown or not specified. */
  UNKNOWN: 0,
  /** A query about kernel resources including system calls, shared mutex, or other kernel components. */
  KERNEL: 1,
  /** A query about file attributes, metadata, content, hash values, or properties. */
  FILE: 2,
  /** A query about folder attributes, metadata, content, or structure. */
  FOLDER: 3,
  /** A query about group membership, privileges, domain, or group properties. */
  ADMIN_GROUP: 4,
  /** A query about scheduled jobs, their command lines, run states, or execution times. */
  JOB: 5,
  /** A query about loaded modules, their base addresses, load types, or function entry points. */
  MODULE: 6,
  /** A query about active network connections, boundaries, protocols, or TCP states. */
  NETWORK_CONNECTION: 7,
  /** A query about physical or virtual network interfaces, their IP/MAC addresses, or types. */
  NETWORK_INTERFACES: 8,
  /** A query about attached peripheral devices, their classes, models, or vendor information. */
  PERIPHERAL_DEVICE: 9,
  /** A query about running processes, command lines, ancestry, loaded modules, or execution context. */
  PROCESS: 10,
  /** A query about system services, their names, versions, labels, or properties. */
  SERVICE: 11,
  /** A query about authenticated user or service sessions, their creation times, or issuer details. */
  SESSION: 12,
  /** A query about user accounts, their properties, credentials, or domain information. */
  USER: 13,
  /** A query about multiple users belonging to an administrative group. */
  USERS: 14,
  /** A query about startup configuration items, their run modes, start types, or current states. */
  STARTUP_ITEM: 15,
  /** A Windows-specific query about registry keys, their paths, security descriptors, or modification times. */
  REGISTRY_KEY: 16,
  /** A Windows-specific query about registry values, their data types, content, or names. */
  REGISTRY_VALUE: 17,
  /** A Windows-specific query about prefetch files, their run counts, last execution times, or existence. */
  PREFETCH: 18,
  /** The query type was not mapped to a standard category. See the query_type attribute for source-specific value. */
  OTHER: 99,
} as const;

export type QueryTypeId = (typeof QueryTypeId)[keyof typeof QueryTypeId];

/** Label mapping for QueryTypeId values. */
export const QueryTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Kernel",
  2: "File",
  3: "Folder",
  4: "Admin Group",
  5: "Job",
  6: "Module",
  7: "Network Connection",
  8: "Network Interfaces",
  9: "Peripheral Device",
  10: "Process",
  11: "Service",
  12: "Session",
  13: "User",
  14: "Users",
  15: "Startup Item",
  16: "Registry Key",
  17: "Registry Value",
  18: "Prefetch",
  99: "Other",
};
