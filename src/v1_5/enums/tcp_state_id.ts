/** TCP State ID values. */
export const TcpStateId = {
  /** The socket state is unknown. */
  UNKNOWN: 0,
  /** The socket has an established connection between a local application and a remote peer. */
  ESTABLISHED: 1,
  /** The socket is actively trying to establish a connection to a remote peer. */
  SYN_SENT: 2,
  /** The socket has passively received a connection request from a remote peer. */
  SYN_RECEIVED: 3,
  /** The socket connection has been closed by the local application, the remote peer has not yet acknowledged the close, and the system is waiting for it to close its half of the connection. */
  FIN_WAIT_1: 4,
  /** The socket connection has been closed by the local application, the remote peer has acknowledged the close, and the system is waiting for it to close its half of the connection. */
  FIN_WAIT_2: 5,
  /** The socket connection has been closed by the local application, the remote peer has closed its half of the connection, and the system is waiting to be sure that the remote peer received the last acknowledgement. */
  TIME_WAIT: 6,
  /** The socket is not in use. */
  CLOSED: 7,
  /** The socket connection has been closed by the remote peer, and the system is waiting for the local application to close its half of the connection. */
  CLOSE_WAIT: 8,
  /** The socket connection has been closed by the remote peer, the local application has closed its half of the connection, and the system is waiting for the remote peer to acknowledge the close. */
  LAST_ACK: 9,
  /** The socket is listening for incoming connections. */
  LISTEN: 10,
  /** The socket connection has been closed by the local application and the remote peer simultaneously, and the remote peer has not yet acknowledged the close attempt of the local application. */
  CLOSING: 11,
} as const;

export type TcpStateId = (typeof TcpStateId)[keyof typeof TcpStateId];

/** Label mapping for TcpStateId values. */
export const TcpStateIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "ESTABLISHED",
  2: "SYN-SENT",
  3: "SYN-RECEIVED",
  4: "FIN-WAIT-1",
  5: "FIN-WAIT-2",
  6: "TIME-WAIT",
  7: "CLOSED",
  8: "CLOSE-WAIT",
  9: "LAST-ACK",
  10: "LISTEN",
  11: "CLOSING",
};
