import { z } from 'zod';

/**
 * The Feature object provides information about the software product feature that generated a specific event. It encompasses details related to the capabilities, components, user interface (UI) design, and performance upgrades associated with the feature.
 *
 * OCSF Object: Feature
 */
export interface FeatureType {
  /** The name of the feature. */
  name?: string;
  /** The unique identifier of the feature. */
  uid?: string;
  /** The version of the feature. */
  version?: string;
}

const FeatureSchema = z.strictObject({
  /** The name of the feature. */
  name: z.string().optional(),
  /** The unique identifier of the feature. */
  uid: z.string().optional(),
  /** The version of the feature. */
  version: z.string().optional(),
});

export const Feature = FeatureSchema;
