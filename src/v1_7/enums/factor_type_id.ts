/** Factor Type ID values. */
export const FactorTypeId = {
  UNKNOWN: 0,
  /** User receives and inputs a code sent to their mobile device via SMS text message. */
  SMS: 1,
  /** The user responds to a security question as part of a question-based authentication factor */
  SECURITY_QUESTION: 2,
  /** System calls the user's registered phone number and requires the user to answer and provide a response. */
  PHONE_CALL: 3,
  /** Devices that verify identity-based on user's physical identifiers, such as fingerprint scanners or retina scanners. */
  BIOMETRIC: 4,
  /** Push notification is sent to user's registered device and requires the user to acknowledge. */
  PUSH_NOTIFICATION: 5,
  /** Physical device that generates a code to be used for authentication. */
  HARDWARE_TOKEN: 6,
  /** Application generates a one-time password (OTP) for use in authentication. */
  OTP: 7,
  /** A code or link is sent to a user's registered email address. */
  EMAIL: 8,
  /** Typically involves a hardware token, which the user physically interacts with to authenticate. */
  U2F: 9,
  /** Web-based API that enables users to register devices as authentication factors. */
  WEBAUTHN: 10,
  /** The user enters a password that they have previously established. */
  PASSWORD: 11,
  OTHER: 99,
} as const;

export type FactorTypeId = (typeof FactorTypeId)[keyof typeof FactorTypeId];

/** Label mapping for FactorTypeId values. */
export const FactorTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "SMS",
  2: "Security Question",
  3: "Phone Call",
  4: "Biometric",
  5: "Push Notification",
  6: "Hardware Token",
  7: "OTP",
  8: "Email",
  9: "U2F",
  10: "WebAuthn",
  11: "Password",
  99: "Other",
};
