import { z } from 'zod';

import type { UserType } from './user.js';
import type { EncryptionDetailsType } from './encryption_details.js';
import type { FingerprintType } from './fingerprint.js';
import type { ProductType } from './product.js';
import type { DigitalSignatureType } from './digital_signature.js';
import type { KeyValueObjectType } from './key_value_object.js';
import type { UrlType } from './url.js';

/**
 * The File object represents the metadata associated with a file stored in a computer system. It encompasses information about the file itself, including its attributes, properties, and organizational details.
 *
 * OCSF Object: File
 */
export interface FileType {
  /** The name of the file. For example: svchost.exe */
  name: string;
  /** The unique identifier of the file as defined by the storage system, such the file system file ID. */
  uid?: string;
  /** The time when the file was last accessed. */
  accessed_time?: number;
  /** The name of the user who last accessed the object. */
  accessor?: UserType;
  /** The bitmask value that represents the file attributes. */
  attributes?: number;
  /** The name of the company that published the file. For example: Microsoft Corporation. */
  company_name?: string;
  /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
  confidentiality?: string;
  /** The normalized identifier of the file content confidentiality indicator. */
  confidentiality_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The time when the file was created. */
  created_time?: number;
  /** The user that created the file. */
  creator?: UserType;
  /** The description of the file, as returned by file system. For example: the description as returned by the Unix file command or the Windows file type. */
  desc?: string;
  /** The drive type, normalized to the caption of the drive_type_id value. In the case of Other, it is defined by the source. */
  drive_type?: string;
  /** Identifies the type of a disk drive, i.e. fixed, removable, etc. */
  drive_type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 99;
  /** The encryption details of the file. Should be populated if the file is encrypted. */
  encryption_details?: EncryptionDetailsType;
  /** The extension of the file, excluding the leading dot. For example: exe from svchost.exe, or gz from export.tar.gz. */
  ext?: string;
  /** An array of hash attributes. */
  hashes?: FingerprintType[];
  /** The name of the file as identified within the file itself. This contrasts with the name by which the file is known on disk. Where available, the internal name is widely used by security practitioners and detection content because the on-disk file name is not reliable. On the Windows OS, most PE files contain a VERSIONINFO resource from which the internal name can be obtained. On macOS, binaries can optionally embed a copy of the application's Info.plist file which in turn contains the name of the executable. */
  internal_name?: string;
  /** Indicates if the file was deleted from the filesystem. */
  is_deleted?: boolean;
  /** Indicates if the file is encrypted. */
  is_encrypted?: boolean;
  /** Indicates if the file is publicly accessible. For example in an object's public access in AWS S3 */
  is_public?: boolean;
  /** The indication of whether the object is part of the operating system. */
  is_system?: boolean;
  /** The Multipurpose Internet Mail Extensions (MIME) type of the file, if applicable. */
  mime_type?: string;
  /** The time when the file was last modified. */
  modified_time?: number;
  /** The user that last modified the file. */
  modifier?: UserType;
  /** The user that owns the file/object. */
  owner?: UserType;
  /** The parent folder in which the file resides. For example: c:\windows\system32 */
  parent_folder?: string;
  /** The full path to the file. For example: c:\windows\system32\svchost.exe. */
  path?: string;
  /** The product that created or installed the file. */
  product?: ProductType;
  /** The object security descriptor. */
  security_descriptor?: string;
  /** The digital signature of the file. */
  signature?: DigitalSignatureType;
  /** The size of data, in bytes. */
  size?: number;
  /** The storage class of the file. For example in AWS S3: STANDARD, STANDARD_IA, GLACIER. */
  storage_class?: string;
  /** The list of tags; {key:value} pairs associated to the file. */
  tags?: KeyValueObjectType[];
  /** The file type. */
  type?: string;
  /** The file type ID. */
  type_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The URL of the file, when applicable. */
  url?: UrlType;
  /** The file URI, such as those reporting by static analysis tools. E.g., file:///C:/dev/sarif/sarif-tutorials/samples/Introduction/simple-example.js */
  uri?: string;
  /** The volume on the storage device where the file is located. */
  volume?: string;
  /** The file version. For example: 8.0.7601.17514. */
  version?: string;
  /** An unordered collection of zero or more name/value pairs where each pair represents a file or folder extended attribute.For example: Windows alternate data stream attributes (ADS stream name, ADS size, etc.), user-defined or application-defined attributes, ACL, owner, primary group, etc. Examples from DCS: ads_nameads_sizedaclownerprimary_grouplink_name - name of the link associated to the file.hard_link_count - the number of links that are associated to the file. */
  xattributes?: Record<string, unknown>;
}

import { User } from './user.js';
import { EncryptionDetails } from './encryption_details.js';
import { Fingerprint } from './fingerprint.js';
import { Product } from './product.js';
import { DigitalSignature } from './digital_signature.js';
import { KeyValueObject } from './key_value_object.js';
import { Url } from './url.js';

type FileShape = {
  name: z.ZodString;
  uid: z.ZodOptional<z.ZodString>;
  accessed_time: z.ZodOptional<z.ZodNumber>;
  accessor: z.ZodOptional<typeof User>;
  attributes: z.ZodOptional<z.ZodNumber>;
  company_name: z.ZodOptional<z.ZodString>;
  confidentiality: z.ZodOptional<z.ZodString>;
  confidentiality_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  created_time: z.ZodOptional<z.ZodNumber>;
  creator: z.ZodOptional<typeof User>;
  desc: z.ZodOptional<z.ZodString>;
  drive_type: z.ZodOptional<z.ZodString>;
  drive_type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<99>]>>;
  encryption_details: z.ZodOptional<typeof EncryptionDetails>;
  ext: z.ZodOptional<z.ZodString>;
  hashes: z.ZodOptional<z.ZodArray<typeof Fingerprint>>;
  internal_name: z.ZodOptional<z.ZodString>;
  is_deleted: z.ZodOptional<z.ZodBoolean>;
  is_encrypted: z.ZodOptional<z.ZodBoolean>;
  is_public: z.ZodOptional<z.ZodBoolean>;
  is_system: z.ZodOptional<z.ZodBoolean>;
  mime_type: z.ZodOptional<z.ZodString>;
  modified_time: z.ZodOptional<z.ZodNumber>;
  modifier: z.ZodOptional<typeof User>;
  owner: z.ZodOptional<typeof User>;
  parent_folder: z.ZodOptional<z.ZodString>;
  path: z.ZodOptional<z.ZodString>;
  product: z.ZodOptional<typeof Product>;
  security_descriptor: z.ZodOptional<z.ZodString>;
  signature: z.ZodOptional<typeof DigitalSignature>;
  size: z.ZodOptional<z.ZodNumber>;
  storage_class: z.ZodOptional<z.ZodString>;
  tags: z.ZodOptional<z.ZodArray<typeof KeyValueObject>>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<99>]>;
  url: z.ZodOptional<typeof Url>;
  uri: z.ZodOptional<z.ZodString>;
  volume: z.ZodOptional<z.ZodString>;
  version: z.ZodOptional<z.ZodString>;
  xattributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
};

const FileSchema: z.ZodObject<FileShape, z.core.$strict> = z.strictObject({
  /** The name of the file. For example: svchost.exe */
  name: z.string(),
  /** The unique identifier of the file as defined by the storage system, such the file system file ID. */
  uid: z.string().optional(),
  /** The time when the file was last accessed. */
  accessed_time: z.number().int().optional(),
  /** The name of the user who last accessed the object. */
  accessor: User.optional(),
  /** The bitmask value that represents the file attributes. */
  attributes: z.number().int().optional(),
  /** The name of the company that published the file. For example: Microsoft Corporation. */
  company_name: z.string().optional(),
  /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
  confidentiality: z.string().optional(),
  /** The normalized identifier of the file content confidentiality indicator. */
  confidentiality_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The time when the file was created. */
  created_time: z.number().int().optional(),
  /** The user that created the file. */
  creator: User.optional(),
  /** The description of the file, as returned by file system. For example: the description as returned by the Unix file command or the Windows file type. */
  desc: z.string().optional(),
  /** The drive type, normalized to the caption of the drive_type_id value. In the case of Other, it is defined by the source. */
  drive_type: z.string().optional(),
  /** Identifies the type of a disk drive, i.e. fixed, removable, etc. */
  drive_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(99)]).optional(),
  /** The encryption details of the file. Should be populated if the file is encrypted. */
  encryption_details: EncryptionDetails.optional(),
  /** The extension of the file, excluding the leading dot. For example: exe from svchost.exe, or gz from export.tar.gz. */
  ext: z.string().optional(),
  /** An array of hash attributes. */
  hashes: z.array(Fingerprint).optional(),
  /** The name of the file as identified within the file itself. This contrasts with the name by which the file is known on disk. Where available, the internal name is widely used by security practitioners and detection content because the on-disk file name is not reliable. On the Windows OS, most PE files contain a VERSIONINFO resource from which the internal name can be obtained. On macOS, binaries can optionally embed a copy of the application's Info.plist file which in turn contains the name of the executable. */
  internal_name: z.string().optional(),
  /** Indicates if the file was deleted from the filesystem. */
  is_deleted: z.boolean().optional(),
  /** Indicates if the file is encrypted. */
  is_encrypted: z.boolean().optional(),
  /** Indicates if the file is publicly accessible. For example in an object's public access in AWS S3 */
  is_public: z.boolean().optional(),
  /** The indication of whether the object is part of the operating system. */
  is_system: z.boolean().optional(),
  /** The Multipurpose Internet Mail Extensions (MIME) type of the file, if applicable. */
  mime_type: z.string().optional(),
  /** The time when the file was last modified. */
  modified_time: z.number().int().optional(),
  /** The user that last modified the file. */
  modifier: User.optional(),
  /** The user that owns the file/object. */
  owner: User.optional(),
  /** The parent folder in which the file resides. For example: c:\windows\system32 */
  parent_folder: z.string().optional(),
  /** The full path to the file. For example: c:\windows\system32\svchost.exe. */
  path: z.string().optional(),
  /** The product that created or installed the file. */
  product: Product.optional(),
  /** The object security descriptor. */
  security_descriptor: z.string().optional(),
  /** The digital signature of the file. */
  signature: DigitalSignature.optional(),
  /** The size of data, in bytes. */
  size: z.number().int().optional(),
  /** The storage class of the file. For example in AWS S3: STANDARD, STANDARD_IA, GLACIER. */
  storage_class: z.string().optional(),
  /** The list of tags; {key:value} pairs associated to the file. */
  tags: z.array(KeyValueObject).optional(),
  /** The file type. */
  type: z.string().optional(),
  /** The file type ID. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
  /** The URL of the file, when applicable. */
  url: Url.optional(),
  /** The file URI, such as those reporting by static analysis tools. E.g., file:///C:/dev/sarif/sarif-tutorials/samples/Introduction/simple-example.js */
  uri: z.string().optional(),
  /** The volume on the storage device where the file is located. */
  volume: z.string().optional(),
  /** The file version. For example: 8.0.7601.17514. */
  version: z.string().optional(),
  /** An unordered collection of zero or more name/value pairs where each pair represents a file or folder extended attribute.For example: Windows alternate data stream attributes (ADS stream name, ADS size, etc.), user-defined or application-defined attributes, ACL, owner, primary group, etc. Examples from DCS: ads_nameads_sizedaclownerprimary_grouplink_name - name of the link associated to the file.hard_link_count - the number of links that are associated to the file. */
  xattributes: z.record(z.string(), z.unknown()).optional(),
});

export const File = FileSchema;

/** Value → label mappings for each enum field of File. */
export const FileLabels: Readonly<Record<"confidentiality_id" | "drive_type_id" | "type_id", Readonly<Record<number, string>>>> = {
  confidentiality_id: {
    0: "Unknown",
    1: "Not Confidential",
    2: "Confidential",
    3: "Secret",
    4: "Top Secret",
    5: "Private",
    6: "Restricted",
    99: "Other",
  },
  drive_type_id: {
    0: "Unknown",
    1: "Removable",
    2: "Fixed",
    3: "Remote",
    4: "CD-ROM",
    5: "RAM Disk",
    99: "Other",
  },
  type_id: {
    0: "Unknown",
    1: "Regular File",
    2: "Folder",
    3: "Character Device",
    4: "Block Device",
    5: "Local Socket",
    6: "Named Pipe",
    7: "Symbolic Link",
    99: "Other",
  },
};
