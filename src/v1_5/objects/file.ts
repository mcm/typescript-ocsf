import { z } from "zod";

import { DigitalSignature, type DigitalSignatureType } from "./digital_signature.js";
import { EncryptionDetails, type EncryptionDetailsType } from "./encryption_details.js";
import { Fingerprint, type FingerprintType } from "./fingerprint.js";
import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";
import { OcsfObject, type OcsfObjectType } from "./object.js";
import { Product, type ProductType } from "./product.js";
import { Url, type UrlType } from "./url.js";
import { User, type UserType } from "./user.js";

/**
 * The File object represents the metadata associated with a file stored in a computer system. It encompasses information about the file itself, including its attributes, properties, and organizational details.
 *
 * OCSF Object: File
 */
export interface FileType {
  /** The name of the file. For example: svchost.exe */
  name: string;
  /** The unique identifier of the file as defined by the storage system, such the file system file ID. */
  uid?: string | undefined;
  /** The time when the file was last accessed. */
  accessed_time?: number | undefined;
  /** The name of the user who last accessed the object. */
  accessor?: UserType | undefined;
  /** The bitmask value that represents the file attributes. */
  attributes?: number | undefined;
  /** The name of the company that published the file. For example: Microsoft Corporation. */
  company_name?: string | undefined;
  /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
  confidentiality?: string | undefined;
  /** The normalized identifier of the file content confidentiality indicator. */
  confidentiality_id?: number | undefined;
  /** The time when the file was created. */
  created_time?: number | undefined;
  /** The user that created the file. */
  creator?: UserType | undefined;
  /** The description of the file, as returned by file system. For example: the description as returned by the Unix file command or the Windows file type. */
  desc?: string | undefined;
  /** The drive type, normalized to the caption of the drive_type_id value. In the case of Other, it is defined by the source. */
  drive_type?: string | undefined;
  /** Identifies the type of a disk drive, i.e. fixed, removable, etc. */
  drive_type_id?: number | undefined;
  /** The encryption details of the file. Should be populated if the file is encrypted. */
  encryption_details?: EncryptionDetailsType | undefined;
  /** The extension of the file, excluding the leading dot. For example: exe from svchost.exe, or gz from export.tar.gz. */
  ext?: string | undefined;
  /** An array of hash attributes. */
  hashes?: FingerprintType[] | undefined;
  /** The name of the file as identified within the file itself. This contrasts with the name by which the file is known on disk. Where available, the internal name is widely used by security practitioners and detection content because the on-disk file name is not reliable. On the Windows OS, most PE files contain a VERSIONINFO resource from which the internal name can be obtained. On macOS, binaries can optionally embed a copy of the application's Info.plist file which in turn contains the name of the executable. */
  internal_name?: string | undefined;
  /** Indicates if the file was deleted from the filesystem. */
  is_deleted?: boolean | undefined;
  /** Indicates if the file is encrypted. */
  is_encrypted?: boolean | undefined;
  /** Indicates if the file is publicly accessible. For example in an object's public access in AWS S3 */
  is_public?: boolean | undefined;
  /** The indication of whether the object is part of the operating system. */
  is_system?: boolean | undefined;
  /** The Multipurpose Internet Mail Extensions (MIME) type of the file, if applicable. */
  mime_type?: string | undefined;
  /** The time when the file was last modified. */
  modified_time?: number | undefined;
  /** The user that last modified the file. */
  modifier?: UserType | undefined;
  /** The user that owns the file/object. */
  owner?: UserType | undefined;
  /** The parent folder in which the file resides. For example: c:\windows\system32 */
  parent_folder?: string | undefined;
  /** The full path to the file. For example: c:\windows\system32\svchost.exe. */
  path?: string | undefined;
  /** The product that created or installed the file. */
  product?: ProductType | undefined;
  /** The object security descriptor. */
  security_descriptor?: string | undefined;
  /** The digital signature of the file. */
  signature?: DigitalSignatureType | undefined;
  /** The size of data, in bytes. */
  size?: number | undefined;
  /** The storage class of the file. For example in AWS S3: STANDARD, STANDARD_IA, GLACIER. */
  storage_class?: string | undefined;
  /** The list of tags; {key:value} pairs associated to the file. */
  tags?: KeyValueObjectType[] | undefined;
  /** The file type. */
  type?: string | undefined;
  /** The file type ID. */
  type_id: number;
  /** The URL of the file, when applicable. */
  url?: UrlType | undefined;
  /** The file URI, such as those reporting by static analysis tools. E.g., file:///C:/dev/sarif/sarif-tutorials/samples/Introduction/simple-example.js */
  uri?: string | undefined;
  /** The volume on the storage device where the file is located. */
  volume?: string | undefined;
  /** The file version. For example: 8.0.7601.17514. */
  version?: string | undefined;
  /** An unordered collection of zero or more name/value pairs where each pair represents a file or folder extended attribute.For example: Windows alternate data stream attributes (ADS stream name, ADS size, etc.), user-defined or application-defined attributes, ACL, owner, primary group, etc. Examples from DCS: ads_nameads_sizedaclownerprimary_grouplink_name - name of the link associated to the file.hard_link_count - the number of links that are associated to the file. */
  xattributes?: OcsfObjectType | undefined;
  [key: string]: unknown;
}

export const File: z.ZodType<FileType> = z
  .object({
    /** The name of the file. For example: svchost.exe */
    name: z.string(),
    /** The unique identifier of the file as defined by the storage system, such the file system file ID. */
    uid: z.string().optional(),
    /** The time when the file was last accessed. */
    accessed_time: z.number().int().optional(),
    /** The name of the user who last accessed the object. */
    accessor: z.lazy(() => User).optional(),
    /** The bitmask value that represents the file attributes. */
    attributes: z.number().int().optional(),
    /** The name of the company that published the file. For example: Microsoft Corporation. */
    company_name: z.string().optional(),
    /** The file content confidentiality, normalized to the confidentiality_id value. In the case of 'Other', it is defined by the event source. */
    confidentiality: z.string().optional(),
    /** The normalized identifier of the file content confidentiality indicator. */
    confidentiality_id: z.number().int().optional(),
    /** The time when the file was created. */
    created_time: z.number().int().optional(),
    /** The user that created the file. */
    creator: z.lazy(() => User).optional(),
    /** The description of the file, as returned by file system. For example: the description as returned by the Unix file command or the Windows file type. */
    desc: z.string().optional(),
    /** The drive type, normalized to the caption of the drive_type_id value. In the case of Other, it is defined by the source. */
    drive_type: z.string().optional(),
    /** Identifies the type of a disk drive, i.e. fixed, removable, etc. */
    drive_type_id: z.number().int().optional(),
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
    modifier: z.lazy(() => User).optional(),
    /** The user that owns the file/object. */
    owner: z.lazy(() => User).optional(),
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
    type_id: z.number().int(),
    /** The URL of the file, when applicable. */
    url: Url.optional(),
    /** The file URI, such as those reporting by static analysis tools. E.g., file:///C:/dev/sarif/sarif-tutorials/samples/Introduction/simple-example.js */
    uri: z.string().optional(),
    /** The volume on the storage device where the file is located. */
    volume: z.string().optional(),
    /** The file version. For example: 8.0.7601.17514. */
    version: z.string().optional(),
    /** An unordered collection of zero or more name/value pairs where each pair represents a file or folder extended attribute.For example: Windows alternate data stream attributes (ADS stream name, ADS size, etc.), user-defined or application-defined attributes, ACL, owner, primary group, etc. Examples from DCS: ads_nameads_sizedaclownerprimary_grouplink_name - name of the link associated to the file.hard_link_count - the number of links that are associated to the file. */
    xattributes: OcsfObject.optional(),
  })
  .passthrough() as any;
