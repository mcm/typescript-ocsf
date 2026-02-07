import { z } from "zod";

import { Fingerprint, type FingerprintType } from "./fingerprint.js";

/**
 * The Software Component object describes characteristics of a software component within a software package.
 *
 * OCSF Object: Software Component
 */
export interface SoftwareComponentType {
  /** The author(s) who published the software component. */
  author?: string | undefined;
  /** Cryptographic hash to identify the binary instance of a software component. */
  hash?: FingerprintType | undefined;
  /** The software license applied to this component. */
  license?: string | undefined;
  /** The software component name. */
  name: string;
  /** The Package URL (PURL) to identify the software component. This is a URL that uniquely identifies the component, including the component's name, version, and type. The URL is used to locate and retrieve the component's metadata and content. */
  purl?: string | undefined;
  /** The package URL (PURL) of the component that this software component has a relationship with. */
  related_component?: string | undefined;
  /** The relationship between two software components, normalized to the caption of the relationship_id value. In the case of 'Other', it is defined by the source. */
  relationship?: string | undefined;
  /** The normalized identifier of the relationship between two software components. */
  relationship_id?: number | undefined;
  /** The type of software component, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
  type?: string | undefined;
  /** The type of software component. */
  type_id?: number | undefined;
  /** The software component version. */
  version: string;
  [key: string]: unknown;
}

export const SoftwareComponent: z.ZodType<SoftwareComponentType> = z
  .object({
    /** The author(s) who published the software component. */
    author: z.string().optional(),
    /** Cryptographic hash to identify the binary instance of a software component. */
    hash: Fingerprint.optional(),
    /** The software license applied to this component. */
    license: z.string().optional(),
    /** The software component name. */
    name: z.string(),
    /** The Package URL (PURL) to identify the software component. This is a URL that uniquely identifies the component, including the component's name, version, and type. The URL is used to locate and retrieve the component's metadata and content. */
    purl: z.string().optional(),
    /** The package URL (PURL) of the component that this software component has a relationship with. */
    related_component: z.string().optional(),
    /** The relationship between two software components, normalized to the caption of the relationship_id value. In the case of 'Other', it is defined by the source. */
    relationship: z.string().optional(),
    /** The normalized identifier of the relationship between two software components. */
    relationship_id: z.number().int().optional(),
    /** The type of software component, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the source. */
    type: z.string().optional(),
    /** The type of software component. */
    type_id: z.number().int().optional(),
    /** The software component version. */
    version: z.string(),
  })
  .passthrough() as any;
