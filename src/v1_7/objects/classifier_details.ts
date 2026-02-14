import { z } from 'zod';

/**
 * The Classifier Details object describes details about the classifier used for data classification.
 *
 * OCSF Object: Classifier Details
 */
export interface ClassifierDetailsType {
  /** The name of the classifier. */
  name?: string;
  /** The type of the classifier. */
  type: string;
  /** The unique identifier of the classifier. */
  uid?: string;
}

const ClassifierDetailsSchema = z.strictObject({
  /** The name of the classifier. */
  name: z.string().optional(),
  /** The type of the classifier. */
  type: z.string(),
  /** The unique identifier of the classifier. */
  uid: z.string().optional(),
});

export const ClassifierDetails = ClassifierDetailsSchema;
