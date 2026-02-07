/** SshActivity activity_id values. */
export const SshActivityActivityId = {
  UNKNOWN: 0,
  /** A new network connection was opened. */
  OPEN: 1,
  /** The network connection was closed. */
  CLOSE: 2,
  /** The network connection was abnormally terminated or closed by a middle device like firewalls. */
  RESET: 3,
  /** The network connection failed. For example a connection timeout or no route to host. */
  FAIL: 4,
  /** The network connection was refused. For example an attempt to connect to a server port which is not open. */
  REFUSE: 5,
  /** Network traffic report. */
  TRAFFIC: 6,
  /** A network endpoint began listening for new network connections. */
  LISTEN: 7,
  OTHER: 99,
} as const;

export type SshActivityActivityId =
  (typeof SshActivityActivityId)[keyof typeof SshActivityActivityId];

export const SshActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Open",
  2: "Close",
  3: "Reset",
  4: "Fail",
  5: "Refuse",
  6: "Traffic",
  7: "Listen",
  99: "Other",
};
