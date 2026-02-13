import { z } from 'zod';

import { Fingerprint } from './fingerprint.js';

/**
 * The Software Package object describes details about a software package.
 *
 * OCSF Object: Software Package
 */
export const Package = z.strictObject({
  /** Architecture is a shorthand name describing the type of computer hardware the packaged software is meant to run on. */
  architecture: z.string().optional(),
  /** The Common Platform Enumeration (CPE) name as described by (NIST) For example: cpe:/a:apple:safari:16.2. */
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
  type_id: z.number().int().optional(),
  /** A unique identifier for the package or library reported by the source tool. E.g., the libId within the sbom field of an OX Security Issue or the SPDX components.*.bom-ref. */
  uid: z.string().optional(),
  /** The name of the vendor who published the software package. */
  vendor_name: z.string().optional(),
  /** The software package version. */
  version: z.string(),
});

export type PackageType = z.infer<typeof Package>;
