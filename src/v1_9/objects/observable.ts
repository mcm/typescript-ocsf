import { z } from 'zod';
import { ObservableTypeId, ObservableTypeIdLabels } from '../enums/observable_type_id.js';

import type { ReputationType } from './reputation.js';

/**
 * The observable object is a pivot element that contains related information found in many places in the event.
 *
 * OCSF Object: Observable
 */
export interface ObservableType {
  /** The unique identifier (metadata.uid) of the source OCSF event from which this observable was extracted. This field enables linking observables back to their originating event data when observables are stored in a separate location or system. */
  event_uid?: string;
  /** The full name of the observable attribute. The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. Array attributes may be represented in one of three ways. For example: resources.uid, resources[].uid, resources[0].uid. */
  name?: string;
  /** Contains the original and normalized reputation scores. */
  reputation?: ReputationType;
  /** The observable value type name. */
  type?: string;
  /** The observable value type identifier. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 44 | 45 | 47 | 48 | 49 | 50 | 99;
  /** The OCSF event type UID (type_uid) of the source event that this observable was extracted from. This field enables filtering and categorizing observables by their originating event type. For example: 300101 for Network Activity (class_uid 3001) with activity_id 1. */
  type_uid?: number;
  /** The value associated with the observable attribute. The meaning of the value depends on the observable type.If the name refers to a scalar attribute, then the value is the value of the attribute.If the name refers to an object attribute, then the value is not populated. */
  value?: string;
}

import { Reputation } from './reputation.js';

type ObservableShape = {
  event_uid: z.ZodOptional<z.ZodString>;
  name: z.ZodOptional<z.ZodString>;
  reputation: z.ZodOptional<typeof Reputation>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<9>, z.ZodLiteral<10>, z.ZodLiteral<11>, z.ZodLiteral<12>, z.ZodLiteral<13>, z.ZodLiteral<14>, z.ZodLiteral<15>, z.ZodLiteral<16>, z.ZodLiteral<17>, z.ZodLiteral<18>, z.ZodLiteral<19>, z.ZodLiteral<20>, z.ZodLiteral<21>, z.ZodLiteral<22>, z.ZodLiteral<23>, z.ZodLiteral<24>, z.ZodLiteral<25>, z.ZodLiteral<26>, z.ZodLiteral<27>, z.ZodLiteral<30>, z.ZodLiteral<31>, z.ZodLiteral<32>, z.ZodLiteral<33>, z.ZodLiteral<34>, z.ZodLiteral<35>, z.ZodLiteral<36>, z.ZodLiteral<37>, z.ZodLiteral<38>, z.ZodLiteral<39>, z.ZodLiteral<40>, z.ZodLiteral<41>, z.ZodLiteral<42>, z.ZodLiteral<44>, z.ZodLiteral<45>, z.ZodLiteral<47>, z.ZodLiteral<48>, z.ZodLiteral<49>, z.ZodLiteral<50>, z.ZodLiteral<99>]>;
  type_uid: z.ZodOptional<z.ZodNumber>;
  value: z.ZodOptional<z.ZodString>;
};

const ObservableSchema: z.ZodObject<ObservableShape, z.core.$strict> = z.strictObject({
  /** The unique identifier (metadata.uid) of the source OCSF event from which this observable was extracted. This field enables linking observables back to their originating event data when observables are stored in a separate location or system. */
  event_uid: z.string().optional(),
  /** The full name of the observable attribute. The name is a pointer/reference to an attribute within the OCSF event data. For example: file.name. Array attributes may be represented in one of three ways. For example: resources.uid, resources[].uid, resources[0].uid. */
  name: z.string().optional(),
  /** Contains the original and normalized reputation scores. */
  reputation: Reputation.optional(),
  /** The observable value type name. */
  type: z.string().optional(),
  /** The observable value type identifier. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10), z.literal(11), z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20), z.literal(21), z.literal(22), z.literal(23), z.literal(24), z.literal(25), z.literal(26), z.literal(27), z.literal(30), z.literal(31), z.literal(32), z.literal(33), z.literal(34), z.literal(35), z.literal(36), z.literal(37), z.literal(38), z.literal(39), z.literal(40), z.literal(41), z.literal(42), z.literal(44), z.literal(45), z.literal(47), z.literal(48), z.literal(49), z.literal(50), z.literal(99)]),
  /** The OCSF event type UID (type_uid) of the source event that this observable was extracted from. This field enables filtering and categorizing observables by their originating event type. For example: 300101 for Network Activity (class_uid 3001) with activity_id 1. */
  type_uid: z.number().int().optional(),
  /** The value associated with the observable attribute. The meaning of the value depends on the observable type.If the name refers to a scalar attribute, then the value is the value of the attribute.If the name refers to an object attribute, then the value is not populated. */
  value: z.string().optional(),
});

export const Observable = ObservableSchema;

/** Value → label mappings for each enum field of Observable. */
export const ObservableLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Hostname",
    2: "IP Address",
    3: "MAC Address",
    4: "User Name",
    5: "Email Address",
    6: "URL String",
    7: "File Name",
    8: "Hash",
    9: "Process Name",
    10: "Resource UID",
    11: "Port",
    12: "Subnet",
    13: "Command Line",
    14: "Country",
    15: "Process ID",
    16: "HTTP User-Agent",
    17: "CWE ID",
    18: "CVE ID",
    19: "User Credential ID",
    20: "Endpoint",
    21: "User",
    22: "Email",
    23: "Uniform Resource Locator",
    24: "File",
    25: "Process",
    26: "Geo Location",
    27: "Container",
    30: "Fingerprint",
    31: "User uid",
    32: "Group name",
    33: "Group uid",
    34: "Account name",
    35: "Account uid",
    36: "Script Content",
    37: "Serial Number",
    38: "Resource Details name",
    39: "Process Entity uid",
    40: "Subject",
    41: "Email Thread UID",
    42: "Message UID",
    44: "Advisory ID",
    45: "File Path",
    47: "Device uid",
    48: "Network Endpoint uid",
    49: "IAM Role name",
    50: "IAM Role uid",
    99: "Other",
  },
};
