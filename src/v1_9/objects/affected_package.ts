import { z } from 'zod';

import type { FingerprintType } from './fingerprint.js';
import type { RemediationType } from './remediation.js';

/**
 * The Affected Package object describes details about a software package identified as affected by a vulnerability/vulnerabilities.
 *
 * OCSF Object: Affected Software Package
 */
export interface AffectedPackageType {
  /** Architecture is a shorthand name describing the type of computer hardware the packaged software is meant to run on. */
  architecture?: string;
  /** The Common Platform Enumeration (CPE) name. For example: cpe:/a:apple:safari:16.2. */
  cpe_name?: string;
  /** The software package epoch. Epoch is a way to define weighted dependencies based on version numbers. */
  epoch?: number;
  /** Cryptographic hash to identify the binary instance of a software component. This can include any component such file, package, or library. */
  hash?: FingerprintType;
  /** The software license applied to this package. */
  license?: string;
  /** The URL pointing to the license applied on package or software. This is typically a LICENSE.md file within a repository. */
  license_url?: string;
  /** The software package name. */
  name: string;
  /** The software packager manager utilized to manage a package on a system, e.g. npm, yum, dpkg etc. */
  package_manager?: string;
  /** The URL of the package or library at the package manager, or the specific URL or URI of an internal package manager link such as AWS CodeArtifact or Artifactory. */
  package_manager_url?: string;
  /** A purl is a URL string used to identify and locate a software package in a mostly universal and uniform way across programming languages, package managers, packaging conventions, tools, APIs and databases. */
  purl?: string;
  /** Release is the number of times a version of the software has been packaged. */
  release?: string;
  /** The link to the specific library or package such as within GitHub, this is different from the link to the package manager where the library or package is hosted. */
  src_url?: string;
  /** The type of software package, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type?: string;
  /** The type of software package. */
  type_id?: 0 | 1 | 2 | 99;
  /** A unique identifier for the package or library reported by the source tool. E.g., the libId within the sbom field of an OX Security Issue or the SPDX components.*.bom-ref. */
  uid?: string;
  /** The name of the vendor who published the software package. */
  vendor_name?: string;
  /** The software package version. */
  version: string;
  /** The software package version in which a reported vulnerability was patched/fixed. */
  fixed_in_version?: string;
  /** The installation path of the affected package. */
  path?: string;
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation?: RemediationType;
}

import { Fingerprint } from './fingerprint.js';
import { Remediation } from './remediation.js';

type AffectedPackageShape = {
  architecture: z.ZodOptional<z.ZodString>;
  cpe_name: z.ZodOptional<z.ZodString>;
  epoch: z.ZodOptional<z.ZodNumber>;
  hash: z.ZodOptional<typeof Fingerprint>;
  license: z.ZodOptional<z.ZodString>;
  license_url: z.ZodOptional<z.ZodString>;
  name: z.ZodString;
  package_manager: z.ZodOptional<z.ZodString>;
  package_manager_url: z.ZodOptional<z.ZodString>;
  purl: z.ZodOptional<z.ZodString>;
  release: z.ZodOptional<z.ZodString>;
  src_url: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>>;
  uid: z.ZodOptional<z.ZodString>;
  vendor_name: z.ZodOptional<z.ZodString>;
  version: z.ZodString;
  fixed_in_version: z.ZodOptional<z.ZodString>;
  path: z.ZodOptional<z.ZodString>;
  remediation: z.ZodOptional<typeof Remediation>;
};

const AffectedPackageSchema: z.ZodObject<AffectedPackageShape, z.core.$strict> = z.strictObject({
  /** Architecture is a shorthand name describing the type of computer hardware the packaged software is meant to run on. */
  architecture: z.string().optional(),
  /** The Common Platform Enumeration (CPE) name. For example: cpe:/a:apple:safari:16.2. */
  cpe_name: z.string().optional(),
  /** The software package epoch. Epoch is a way to define weighted dependencies based on version numbers. */
  epoch: z.number().int().optional(),
  /** Cryptographic hash to identify the binary instance of a software component. This can include any component such file, package, or library. */
  hash: Fingerprint.optional(),
  /** The software license applied to this package. */
  license: z.string().optional(),
  /** The URL pointing to the license applied on package or software. This is typically a LICENSE.md file within a repository. */
  license_url: z.string().optional(),
  /** The software package name. */
  name: z.string(),
  /** The software packager manager utilized to manage a package on a system, e.g. npm, yum, dpkg etc. */
  package_manager: z.string().optional(),
  /** The URL of the package or library at the package manager, or the specific URL or URI of an internal package manager link such as AWS CodeArtifact or Artifactory. */
  package_manager_url: z.string().optional(),
  /** A purl is a URL string used to identify and locate a software package in a mostly universal and uniform way across programming languages, package managers, packaging conventions, tools, APIs and databases. */
  purl: z.string().optional(),
  /** Release is the number of times a version of the software has been packaged. */
  release: z.string().optional(),
  /** The link to the specific library or package such as within GitHub, this is different from the link to the package manager where the library or package is hosted. */
  src_url: z.string().optional(),
  /** The type of software package, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type: z.string().optional(),
  /** The type of software package. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
  /** A unique identifier for the package or library reported by the source tool. E.g., the libId within the sbom field of an OX Security Issue or the SPDX components.*.bom-ref. */
  uid: z.string().optional(),
  /** The name of the vendor who published the software package. */
  vendor_name: z.string().optional(),
  /** The software package version. */
  version: z.string(),
  /** The software package version in which a reported vulnerability was patched/fixed. */
  fixed_in_version: z.string().optional(),
  /** The installation path of the affected package. */
  path: z.string().optional(),
  /** Describes the recommended remediation steps to address identified issue(s). */
  remediation: Remediation.optional(),
});

export const AffectedPackage = AffectedPackageSchema;

/** Value → label mappings for each enum field of AffectedPackage. */
export const AffectedPackageLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Application",
    2: "Operating System",
    99: "Other",
  },
};
