import { z } from 'zod';

import { Package } from './package.js';
import { Product } from './product.js';
import { SoftwareComponent } from './software_component.js';

/**
 * The Software Bill of Materials object describes characteristics of a generated SBOM.
 *
 * OCSF Object: Software Bill of Materials
 */
export const Sbom = z.object({
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
  type_id: z.number().int().optional(),
  /** A unique identifier for the SBOM or the SBOM generation by a source tool, such as the SPDX metadata.component.bom-ref. */
  uid: z.string().optional(),
  /** The specification (spec) version of the particular SBOM, e.g., 1.6. */
  version: z.string().optional(),
}).passthrough() as any;

export type SbomType = z.infer<typeof Sbom>;
