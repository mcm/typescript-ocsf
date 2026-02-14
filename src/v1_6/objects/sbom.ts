import { z } from 'zod';

import type { PackageType } from './package.js';
import type { ProductType } from './product.js';
import type { SoftwareComponentType } from './software_component.js';

/**
 * The Software Bill of Materials object describes characteristics of a generated SBOM.
 *
 * OCSF Object: Software Bill of Materials
 */
export interface SbomType {
  /** The time when the SBOM was created. */
  created_time?: number;
  /** The software package or library that is being discovered or inventoried by an SBOM. */
  package: PackageType;
  /** Details about the upstream product that generated the SBOM e.g. cdxgen or Syft. */
  product?: ProductType;
  /** The list of software components used in the software package. */
  software_components: SoftwareComponentType[];
  /** The type of SBOM, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type?: string;
  /** The type of SBOM. */
  type_id?: 1 | 2 | 3;
  /** A unique identifier for the SBOM or the SBOM generation by a source tool, such as the SPDX metadata.component.bom-ref. */
  uid?: string;
  /** The specification (spec) version of the particular SBOM, e.g., 1.6. */
  version?: string;
}

import { Package } from './package.js';
import { Product } from './product.js';
import { SoftwareComponent } from './software_component.js';

const SbomSchema = z.strictObject({
  /** The time when the SBOM was created. */
  created_time: z.number().int().optional(),
  /** The software package or library that is being discovered or inventoried by an SBOM. */
  package: Package,
  /** Details about the upstream product that generated the SBOM e.g. cdxgen or Syft. */
  product: Product.optional(),
  /** The list of software components used in the software package. */
  software_components: z.array(SoftwareComponent),
  /** The type of SBOM, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type: z.string().optional(),
  /** The type of SBOM. */
  type_id: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  /** A unique identifier for the SBOM or the SBOM generation by a source tool, such as the SPDX metadata.component.bom-ref. */
  uid: z.string().optional(),
  /** The specification (spec) version of the particular SBOM, e.g., 1.6. */
  version: z.string().optional(),
});

export const Sbom = SbomSchema;
