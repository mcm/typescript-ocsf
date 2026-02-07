/** Boundary ID values. */
export const BoundaryId = {
  /** The connection boundary is unknown. */
  UNKNOWN: 0,
  /** Local network traffic on the same endpoint. */
  LOCALHOST: 1,
  /** Internal network traffic between two endpoints inside network. */
  INTERNAL: 2,
  /** External network traffic between two endpoints on the Internet or outside the network. */
  EXTERNAL: 3,
  /** Through another resource in the same VPC */
  SAME_VPC: 4,
  /** Through an Internet gateway or a gateway VPC endpoint */
  INTERNET_VPC_GATEWAY: 5,
  /** Through a virtual private gateway */
  VIRTUAL_PRIVATE_GATEWAY: 6,
  /** Through an intra-region VPC peering connection */
  INTRA_REGION_VPC: 7,
  /** Through an inter-region VPC peering connection */
  INTER_REGION_VPC: 8,
  /** Through a local gateway */
  LOCAL_GATEWAY: 9,
  /** Through a gateway VPC endpoint (Nitro-based instances only) */
  GATEWAY_VPC: 10,
  /** Through an Internet gateway (Nitro-based instances only) */
  INTERNET_GATEWAY: 11,
  /** The boundary is not mapped. See the <code>boundary</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type BoundaryId = (typeof BoundaryId)[keyof typeof BoundaryId];

/** Label mapping for BoundaryId values. */
export const BoundaryIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Localhost",
  2: "Internal",
  3: "External",
  4: "Same VPC",
  5: "Internet/VPC Gateway",
  6: "Virtual Private Gateway",
  7: "Intra-region VPC",
  8: "Inter-region VPC",
  9: "Local Gateway",
  10: "Gateway VPC",
  11: "Internet Gateway",
  99: "Other",
};
