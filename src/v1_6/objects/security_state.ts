import { z } from 'zod';

/**
 * The Security State object describes the security related state of a managed entity.
 *
 * OCSF Object: Security State
 */
export interface SecurityStateType {
  /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
  state?: string;
  /** The security state of the managed entity. */
  state_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 99;
}

const SecurityStateSchema = z.strictObject({
  /** The security state, normalized to the caption of the state_id value. In the case of 'Other', it is defined by the source. */
  state: z.string().optional(),
  /** The security state of the managed entity. */
  state_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(22), z.literal(23), z.literal(99)]).optional(),
});

export const SecurityState = SecurityStateSchema;

/** Value → label mappings for each enum field of SecurityState. */
export const SecurityStateLabels: Readonly<Record<"state_id", Readonly<Record<number, string>>>> = {
  state_id: {
    0: "Unknown",
    1: "Missing or outdated content",
    2: "Policy mismatch",
    3: "In network quarantine",
    4: "Protection off",
    5: "Protection malfunction",
    6: "Protection not licensed",
    7: "Unremediated threat",
    8: "Suspicious reputation",
    9: "Reboot pending",
    10: "Content is locked",
    11: "Not installed",
    12: "Writable system partition",
    13: "SafetyNet failure",
    14: "Failed boot verify",
    15: "Modified execution environment",
    16: "SELinux disabled",
    17: "Elevated privilege shell",
    18: "iOS file system altered",
    19: "Open remote access",
    20: "OTA updates disabled",
    21: "Rooted",
    22: "Android partition modified",
    23: "Compliance failure",
    99: "Other",
  },
};
