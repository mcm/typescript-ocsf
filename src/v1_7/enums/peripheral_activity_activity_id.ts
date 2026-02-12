/** PeripheralActivity activity_id values. */
export const PeripheralActivityActivityId = {
  UNKNOWN: 0,
  /** A peripheral device was connected to the system. */
  CONNECT: 1,
  /** A peripheral device was disconnected from the system. */
  DISCONNECT: 2,
  /** A peripheral device was enabled on the system. */
  ENABLE: 3,
  /** A peripheral device was disabled on the system. */
  DISABLE: 4,
  /** A peripheral device was ejected from the system. This is typically used for removable media devices. Note: For <code>Mount</code> and <code>Unmount</code> events, see the <a target='_blank' href='file_activity'>File System Activity</a> event class. */
  EJECT: 5,
  OTHER: 99,
} as const;

export type PeripheralActivityActivityId = (typeof PeripheralActivityActivityId)[keyof typeof PeripheralActivityActivityId];

export const PeripheralActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Connect",
  2: "Disconnect",
  3: "Enable",
  4: "Disable",
  5: "Eject",
  99: "Other",
};
