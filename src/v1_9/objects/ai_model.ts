import { z } from 'zod';

/**
 * The AI Model object describes the characteristics of an AI/ML model. Examples include language models like GPT-4, embedding models like text-embedding-ada-002, and computer vision models like CLIP.
 *
 * OCSF Object: AI Model
 */
export interface AiModelType {
  /** Human-readable model name. For example: gpt-4o, claude-3-sonnet, or text-embedding-ada-002. */
  name: string;
  /** The unique identifier of the AI model. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** AI service provider or organization name. For example: OpenAI, Anthropic, Google, or Internal. */
  ai_provider: string;
  /** Model version identifier. For example: 2024-05-13, v2.1.0, or beta. */
  version?: string;
}

type AiModelShape = {
  name: z.ZodString;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  ai_provider: z.ZodString;
  version: z.ZodOptional<z.ZodString>;
};

const AiModelSchema: z.ZodObject<AiModelShape, z.core.$strict> = z.strictObject({
  /** Human-readable model name. For example: gpt-4o, claude-3-sonnet, or text-embedding-ada-002. */
  name: z.string(),
  /** The unique identifier of the AI model. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** AI service provider or organization name. For example: OpenAI, Anthropic, Google, or Internal. */
  ai_provider: z.string(),
  /** Model version identifier. For example: 2024-05-13, v2.1.0, or beta. */
  version: z.string().optional(),
});

export const AiModel = AiModelSchema;

/** Value → label mappings for each enum field of AiModel. */
export const AiModelLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
