import { z } from 'zod';

import type { AiModelType } from './ai_model.js';
import type { FileType } from './file.js';

/**
 * An autonomous AI agent that performs tasks under delegated authority. Distinguished from the OCSF agent object (which describes security sensors such as EDR and DLP tools) and from human principals. An AI agent has a stable logical identity across runs and a restart-sensitive instance identity. The agent owns its model; the ai_model attribute captures which model was backing the agent at the time of action.
 *
 * OCSF Object: AI Agent
 */
export interface AiAgentType {
  /** Human-readable name for the agent. For example: Q4 Analysis Agent or Model Tester Agent. */
  name?: string;
  /** The stable logical identifier for the agent, assigned by the agent's authoritative source (e.g., its control plane, registry, or issuing identity provider). Persists across restarts and instances. Producers populate this from whatever identity they observe: for a runtime that owns the agent, this is its issued ID; for a gateway or proxy, it is typically derived from the agent's credential. Multiple producers logging the same agent should converge on the same uid when they share an authoritative source. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The AI model backing this agent at the time of the recorded event. An agent's model may change across instances or versions; this captures the model in use for the specific logged activity or delegation. */
  ai_model?: AiModelType;
  /** A document that defines an AI agent's durable role, responsibilities, constraints, and operating boundaries. When available, populate hashes on the file for content integrity and signatures for provenance. Integrity of the event that reports this agent is provided separately by the record_integrity profile. */
  charter?: FileType;
  /** Identifier for a specific running instance or session of the agent, distinct from the stable logical uid. An instance is a single materialization of the agent: a conversation, session, or run. It may persist across restarts (a session that is suspended and later resumed keeps the same instance_uid) and may span multiple cooperating runtime components, so several events can share one instance_uid. Enables attribution of actions to a particular instance of the agent rather than to the agent generally. */
  instance_uid?: string;
  /** The agent framework, normalized to the caption of the type_id value. */
  type?: string;
  /** The normalized identifier for the agent framework. Different agent frameworks have different identity, tool-call, and delegation semantics, so recording the framework enables cross-framework normalization. Communication protocols (e.g., MCP, A2A) are a property of individual operations rather than the agent itself, and are surfaced on the relevant operation rather than here. */
  type_id?: 0 | 1 | 2 | 3 | 4 | 99;
  /** The version of the agent: the agent's own code or configuration revision (e.g., 1.4.2), distinct from the version of the model backing it (carried on ai_model.version). Enables correlation of behavioral changes with charter or configuration revisions across agent versions. */
  version?: string;
}

import { AiModel } from './ai_model.js';
import { File } from './file.js';

type AiAgentShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  ai_model: z.ZodOptional<typeof AiModel>;
  charter: z.ZodOptional<typeof File>;
  instance_uid: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>>;
  version: z.ZodOptional<z.ZodString>;
};

const AiAgentSchema: z.ZodObject<AiAgentShape, z.core.$strict> = z.strictObject({
  /** Human-readable name for the agent. For example: Q4 Analysis Agent or Model Tester Agent. */
  name: z.string().optional(),
  /** The stable logical identifier for the agent, assigned by the agent's authoritative source (e.g., its control plane, registry, or issuing identity provider). Persists across restarts and instances. Producers populate this from whatever identity they observe: for a runtime that owns the agent, this is its issued ID; for a gateway or proxy, it is typically derived from the agent's credential. Multiple producers logging the same agent should converge on the same uid when they share an authoritative source. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The AI model backing this agent at the time of the recorded event. An agent's model may change across instances or versions; this captures the model in use for the specific logged activity or delegation. */
  ai_model: AiModel.optional(),
  /** A document that defines an AI agent's durable role, responsibilities, constraints, and operating boundaries. When available, populate hashes on the file for content integrity and signatures for provenance. Integrity of the event that reports this agent is provided separately by the record_integrity profile. */
  charter: File.optional(),
  /** Identifier for a specific running instance or session of the agent, distinct from the stable logical uid. An instance is a single materialization of the agent: a conversation, session, or run. It may persist across restarts (a session that is suspended and later resumed keeps the same instance_uid) and may span multiple cooperating runtime components, so several events can share one instance_uid. Enables attribution of actions to a particular instance of the agent rather than to the agent generally. */
  instance_uid: z.string().optional(),
  /** The agent framework, normalized to the caption of the type_id value. */
  type: z.string().optional(),
  /** The normalized identifier for the agent framework. Different agent frameworks have different identity, tool-call, and delegation semantics, so recording the framework enables cross-framework normalization. Communication protocols (e.g., MCP, A2A) are a property of individual operations rather than the agent itself, and are surfaced on the relevant operation rather than here. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]).optional(),
  /** The version of the agent: the agent's own code or configuration revision (e.g., 1.4.2), distinct from the version of the model backing it (carried on ai_model.version). Enables correlation of behavioral changes with charter or configuration revisions across agent versions. */
  version: z.string().optional(),
});

export const AiAgent = AiAgentSchema;

/** Value → label mappings for each enum field of AiAgent. */
export const AiAgentLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "Native",
    2: "LangChain",
    3: "AutoGen",
    4: "CrewAI",
    99: "Other",
  },
};
