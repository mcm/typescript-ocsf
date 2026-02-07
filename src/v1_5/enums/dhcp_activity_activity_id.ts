/** DhcpActivity activity_id values. */
export const DhcpActivityActivityId = {
  UNKNOWN: 0,
  /** DHCPDISCOVER */
  DISCOVER: 1,
  /** DHCPOFFER */
  OFFER: 2,
  /** DHCPREQUEST */
  REQUEST: 3,
  /** DHCPDECLINE */
  DECLINE: 4,
  /** DHCPACK: The server accepts the request by sending the client a DHCP Acknowledgment message. */
  ACK: 5,
  /** DHCPNAK */
  NAK: 6,
  /** DHCPRELEASE: A DHCP client sends a DHCPRELEASE packet to the server to release the IP address and cancel any remaining lease. */
  RELEASE: 7,
  /** DHCPINFORM */
  INFORM: 8,
  /** DHCPEXPIRE: A DHCP lease expired. */
  EXPIRE: 9,
  OTHER: 99,
} as const;

export type DhcpActivityActivityId =
  (typeof DhcpActivityActivityId)[keyof typeof DhcpActivityActivityId];

export const DhcpActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Discover",
  2: "Offer",
  3: "Request",
  4: "Decline",
  5: "Ack",
  6: "Nak",
  7: "Release",
  8: "Inform",
  9: "Expire",
  99: "Other",
};
